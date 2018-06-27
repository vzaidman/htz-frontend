import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import Media from '../Media/Media';
import AlertsButton, { authorPropTypes, } from './AlertsButton';
import IconMail from '../Icon/icons/IconMail';
import IconAlert from '../Icon/icons/IconAlert';

function Alerts({ author, }) {
  return (
    <FelaComponent
      style={theme => ({
        extend: [
          theme.mq(
            { from: 's', },
            {
              display: 'block',
              width: '100%',
              textAlign: 'end',
              color: theme.color('tertiary'),
              fontWeight: 700,
              ...theme.type(-1),
            }
          ),
          theme.mq(
            { until: 's', },
            {
              textAlign: 'center',
              width: '5rem',
              ...theme.type(-2),
            }
          ),
        ],
      })}
      render={({
        className,
        theme: {
          alertsI18n: { mobileAlertsText, desktopAlertsText, },
        },
      }) => (
        <AlertsButton className={className} author={author}>
          <Media query={{ from: 's', }} matchOnServer>
            {matches =>
              (matches ? (
                <FelaComponent
                  style={{ display: 'flex', alignItems: 'center', }}
                >
                  <IconMail size={3} miscStyles={{ marginEnd: '1rem', }} />
                  {desktopAlertsText}
                </FelaComponent>
              ) : (
                <Fragment>
                  <div>
                    <IconAlert size={3} color={[ 'primary', '+1', ]} />
                  </div>
                  {mobileAlertsText}
                </Fragment>
              ))
            }
          </Media>
        </AlertsButton>
      )}
    />
  );
}

Alerts.propTypes = authorPropTypes;

export default Alerts;
