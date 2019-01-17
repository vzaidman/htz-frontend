import React from 'react';
import { FelaComponent, } from 'react-fela';
import AlertsButton, { alertButtonPropTypes, alertsButtonDefaultProps, } from './AlertsButton';
import IconMailAlert from '../Icon/icons/IconMailAlert';

const Alerts = React.forwardRef((props, ref) => {
  const { author, onToggle, } = props;
  return (
    <FelaComponent
      style={theme => ({
        color: theme.color('alerts', 'openButtonText'),
        fontWeight: 'bold',
        extend: [
          theme.type(-2, { fromBp: 'xl', }),
          theme.type(-1, { fromBp: 'l', untilBp: 'xl', }),
          theme.type(-2, { untilBp: 'l', }),
          theme.mq(
            { from: 's', },
            {
              width: '100%',
              textAlign: 'end',
            }
          ),
          theme.mq(
            { from: 's', until: 'l', },
            {
              display: 'inline',
            }
          ),
          theme.mq(
            { from: 'l', },
            {
              display: 'flex',
            }
          ),
          theme.mq(
            { until: 's', },
            {
              textAlign: 'center',
            }
          ),
        ],
      })}
      render={({
        className,
        theme,
        theme: {
          alertsI18n: { mobileAlertsText, desktopAlertsText, },
        },
      }) => (
        <React.Fragment>
          <AlertsButton
            className={className}
            author={author}
            onToggle={onToggle}
            forwardedRef={ref}
          >
            <IconMailAlert
              size={[ { until: 's', value: 3, }, { from: 's', value: 2.5, }, ]}
              miscStyles={{ marginEnd: '1rem', }}
            />
            <FelaComponent
              style={{
                extend: [ theme.mq({ until: 's', }, { display: 'none', }), ],
              }}
              render="span"
            >
              {desktopAlertsText}
            </FelaComponent>
            <FelaComponent
              style={{
                display: 'block',
                extend: [ theme.mq({ from: 's', }, { display: 'none', }), ],
              }}
              render="span"
            >
              {mobileAlertsText}
            </FelaComponent>
          </AlertsButton>
        </React.Fragment>
      )}
    />
  );
});

Alerts.propTypes = alertButtonPropTypes;
Alerts.defaultProps = alertsButtonDefaultProps;

export default Alerts;
