import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Image from '../../Image/Image';
import HtzLink from '../../HtzLink/HtzLink';

// const styleRule = ({ theme, isBusy, }) => ({
//   backgroundColor: 'rgba(200,200,200, 0.3)',
//   height: '100%',
// });

RespView282.propTypes = {
  clicktrackerimage: PropTypes.shape({}),
  link: PropTypes.string.isRequired,
  linkTarget: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

RespView282.defaultProps = {
  clicktrackerimage: null,
};

/**
 * A Simple ClickTrackerBanner view.
 * It's purpose is to display a certain banner according to passed-down props.
 * @export RespView282 which is a pure function component (get props, returns JSX)
 * @param {*} { clicktrackerimage, link, linkTarget, text, } destructuerd props
 * @returns a banner component to be displayed.
 */
export default function RespView282({
  clicktrackerimage,
  link,
  linkTarget,
  text,
}) {
  // do some pre-processing
  return (
    <HtzLink
      href={link}
      target={linkTarget}
      content={
        <FelaComponent
          style={theme => ({
            backgroundColor: theme.color('neutral', '-6'),
            width: '100%',
            height: '22rem',
            display: 'flex',
            extend: [
              borderBottom('2px', 0.0001, 'dashed', theme.color('primary')),
            ],
          })}
          render={({ className, theme, }) => (
            <div className={className}>
              <Image
                data={{
                  ...clicktrackerimage,
                  isAnimatedGif: clicktrackerimage.isAnimated,
                }}
                hasWrapper={false}
                imgOptions={{
                  sizes:
                    '(min-width:1420px) 610px,(min-width:1320px) 500px, 280px',
                  transforms: [
                    {
                      width: '252',
                      height: '152',
                      aspect: 'landscape',
                      quality: 'auto:best',
                    },
                  ],
                }}
                miscStyles={{ backgroundColor: 'transparent', }}
              />
              <FelaComponent
                style={{
                  height: '100%',
                  paddingTop: '3rem',
                  paddingRight: '2rem',
                  paddingLeft: '2rem',
                  paddingBottom: '3rem',
                  fontFamily: 'Arial',
                  fontWeight: 'bold',
                  textAlign: 'start',
                  extend: [ theme.type(1), ],
                }}
              >
                {text}
              </FelaComponent>
              <FelaComponent
                style={{
                  color: theme.color('primary'),
                  alignSelf: 'flex-end',
                  marginInlineStart: 'auto',
                  marginInlineEnd: '1rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                  extend: [ theme.type(-1), ],
                }}
              >
                {theme.clickTrackerI18n.promotedContentLabel}
              </FelaComponent>
            </div>
          )}
        />
      }
    />
  );
}
