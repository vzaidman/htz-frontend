import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import HtzLink from '../HtzLink/HtzLink';
import IconHaaretzLogo from '../Icon/icons/IconHaaretzLogo';
import IconMarkerLogo from '../Icon/icons/IconMarkerLogo';

MastheadLogo.propTypes = {
  host: PropTypes.oneOf([ 'tm', 'htz', 'hdc', ]).isRequired,
};

export default function MastheadLogo({ host, }) {
  return (
    <FelaComponent
      style={theme => ({
        marginLeft: 'auto',
        marginRight: 'auto',
        extend: [
          theme.mq(
            { from: 's', },
            {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }
          ),
        ],
      })}
      render={({ className, }) => {
        if (host === 'tm') {
          return (
            <HtzLink href="http://www.themarker.com" className={className}>
              <IconMarkerLogo size={4} />
            </HtzLink>
          );
        }
 else if (host === 'hdc') {
          return (
            <HtzLink href="http://www.haaretz.com" className={className}>
              {/* change to haaretz.com logo */}
              <IconHaaretzLogo size={4} />
            </HtzLink>
          );
        }
        return (
          <HtzLink href="http://www.haaretz.co.il" className={className}>
            <IconHaaretzLogo size={4} />
          </HtzLink>
        );
      }}
    />
  );
}
