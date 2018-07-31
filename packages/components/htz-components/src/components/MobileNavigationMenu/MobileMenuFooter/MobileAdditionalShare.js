import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import ActionButtons from '../../ActionButtons/ActionButtons';

MobileBarActionButtons.propTypes = {
  elementUrl: PropTypes.string.isRequired,
};

export default function MobileBarActionButtons({ elementUrl, }) {
  return (
    <Fragment>
      <FelaComponent
        style={{
          display: 'flex',
          paddingTop: '2rem',
          justifyContent: 'center',
        }}
        render={({ className, }) => (
          <div className={className}>
            <FelaComponent
              style={theme => ({
                color: theme.color('neutral', '-10'),
                fontWeight: '700',
                extend: [ theme.type(-1), ],
              })}
              render={({ className, theme, }) => (
                <span className={className}>
                  {theme.mobileAdditionalShare.text}
                </span>
              )}
            />
          </div>
        )}
      />
      <FelaComponent
        style={{
          display: 'flex',
          paddingLeft: '15rem',
          paddingRight: '15rem',
          paddingTop: '2rem',
          paddingBottom: '3.6rem',
          justifyContent: 'space-between',
        }}
        render={({ className, theme, }) => (
          <div className={className}>
            <ActionButtons
              elementUrl={elementUrl}
              isFlat
              isRound
              boxModel={{ hp: 1, vp: 1, }}
              size={4}
              buttons={{
                name: 'facebookround',
                iconStyles: {
                  color: theme.color('facebook'),
                },
              }}
            />
            <ActionButtons
              elementUrl={elementUrl}
              isFlat
              isRound
              boxModel={{ hp: 1, vp: 1, }}
              size={4}
              buttons={{
                name: 'twitter',
                iconStyles: {
                  color: theme.color('twitter'),
                },
              }}
            />
          </div>
        )}
      />
      <FelaComponent
        style={{
          display: 'flex',
          paddingLeft: '6rem',
          paddingRight: '6rem',
          paddingTop: '3.6rem',
          paddingBottom: '3.6rem',
          justifyContent: 'space-between',
        }}
        render={({ className, theme, }) => (
          <div className={className}>
            <ActionButtons
              elementUrl={elementUrl}
              isFlat
              isRound
              boxModel={{ hp: 1, vp: 1, }}
              size={4}
              buttons={{
                name: 'whatsapp',
                iconStyles: {
                  color: theme.color('whatsapp'),
                },
              }}
            />
            <ActionButtons
              // isFlat
              isRound
              boxModel={{ hp: 1, vp: 1, }}
              size={4}
              buttons={{
                name: 'save',
                buttonStyles: isArticleSaved => ({
                  ...(isArticleSaved && {
                    color: theme.color('neutral', '-10'),
                    backgroundColor: theme.color('secondary'),
                  }),
                }),
              }}
            />
            <ActionButtons
              elementUrl={elementUrl}
              isFlat
              isRound
              boxModel={{ hp: 1, vp: 1, }}
              size={4}
              buttons={{
                name: 'googleplus',
                iconStyles: {
                  color: theme.color('gplus'),
                },
              }}
            />
          </div>
        )}
      />
      <FelaComponent
        style={{
          display: 'flex',
          paddingLeft: '15rem',
          paddingRight: '15rem',
          paddingTop: '3.6rem',
          paddingBottom: '4rem',
          justifyContent: 'space-between',
        }}
        render={({ className, theme, }) => (
          <div className={className}>
            <ActionButtons
              elementUrl={elementUrl}
              isFlat
              isRound
              boxModel={{ hp: 1, vp: 1, }}
              size={4}
              buttons={{
                name: 'messenger',
                iconStyles: {
                  color: theme.color('facebook', 'messenger'),
                },
              }}
            />
            <ActionButtons
              elementUrl={elementUrl}
              isFlat
              isRound
              boxModel={{ hp: 1, vp: 1, }}
              size={4}
              buttons={{
                name: 'mail',
                iconStyles: {
                  color: theme.color('primary'),
                },
              }}
            />
          </div>
        )}
      />
    </Fragment>
  );
}
