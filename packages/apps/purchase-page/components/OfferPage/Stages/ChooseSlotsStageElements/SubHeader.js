import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Astronaut from '../../../illustrations/Astronaut/Astronaut';
import Diver from '../../../illustrations/Diver/Diver';

SubHeader.propTypes = {
  isTheMarker: PropTypes.bool.isRequired,
};

SubHeader.defaultProps = {};

function SubHeader({ isTheMarker, }) {
  return (
    <FelaComponent
      style={theme => ({
        extend: [ theme.mq({ until: 'l', }, { marginBottom: '30rem', }), ],
      })}
    >
      <FelaComponent
        style={theme => ({
          top: 0,
          width: '100%',
          height: '42rem',
          position: 'absolute',
          zIndex: '-1',
          overflow: 'hidden',
          transformOrigin: 'top left',
          transform: 'skewY(-4deg)',
          extend: [
            theme.mq({ until: 'l', }, { height: '45rem', }),
            theme.mq({ from: 'xl', }, { height: '55rem', }),
          ],
        })}
      >
        <FelaComponent
          style={theme => ({
            background: isTheMarker
              ? 'linear-gradient(to bottom, #a9e5f3, #fbe7b4)'
              : 'linear-gradient(90deg, #FEE8AC, #FFF0D5)',
            width: '100%',
            height: '100% ',
            overflow: 'hidden',
            transformOrigin: 'top left',
            transform: 'skewY(4deg)',
            paddingTop: isTheMarker ? 0 : '5rem',
            extend: isTheMarker
              ? [
                  theme.mq({ from: 'xl', }, { paddingInlineStart: '28rem', }),
                  theme.mq(
                    { from: 'l', until: 'xl', },
                    { paddingInlineStart: '20rem', }
                  ),
                ]
              : [
                  theme.mq({ from: 'xl', }, { paddingInlineStart: '10rem', }),
                  theme.mq(
                    { from: 'l', until: 'xl', },
                    { paddingInlineStart: '1rem', }
                  ),
                ],
          })}
        >
          <FelaComponent
            style={theme => ({
              maxWidth: '200rem',
              marginInlineStart: 'auto',
              marginInlineEnd: 'auto',
              extend: isTheMarker
                ? [
                    theme.mq({ until: 'l', }, { textAlign: 'center', }),
                    theme.mq({ from: 's', until: 'l', }, { marginTop: '10rem', }),
                    theme.mq({ until: 's', }, { marginTop: '12rem', }),
                  ]
                : [
                    theme.mq({ until: 'l', }, { textAlign: 'center', }),
                    theme.mq({ from: 's', until: 'l', }, { marginTop: '8rem', }),
                    theme.mq({ until: 's', }, { marginTop: '13rem', }),
                  ],
            })}
          >
            {isTheMarker ? (
              <Diver
                size={[
                  { until: 's', value: 35, },
                  { from: 's', until: 'm', value: 35, },
                  { from: 'm', until: 'xl', value: 35, },
                  { from: 'xl', value: 40, },
                ]}
              />
            ) : (
              <Astronaut
                size={[
                  { until: 's', value: 45, },
                  { from: 's', until: 'm', value: 50, },
                  { from: 'm', value: 60, },
                ]}
              />
            )}
          </FelaComponent>
        </FelaComponent>
      </FelaComponent>
    </FelaComponent>
  );
}

export default SubHeader;
