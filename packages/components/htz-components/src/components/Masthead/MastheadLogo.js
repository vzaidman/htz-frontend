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
              backgroundColor: theme.color('neutral', '-10'),
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }
          ),
        ],
      })}
      render={({ theme, className, }) => {
        const { tmUrl, htzUrl, hdcUrl, } = theme.mastheadLogoI18n;
        switch (host) {
          case 'tm':
            return (
              <HtzLink href={tmUrl} className={className}>
                <IconMarkerLogo size={4} />
              </HtzLink>
            );
          case 'hdc':
            return (
              <HtzLink href={hdcUrl} className={className}>
                {/* change to haaretz.com logo */}
                <IconHaaretzLogo size={4} />
              </HtzLink>
            );
          default:
            return (
              <HtzLink href={htzUrl} className={className}>
                <IconHaaretzLogo size={4} />
              </HtzLink>
            );
        }
      }}
    />
  );
}
