import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import Image from '../../../Image/Image';
import Link from '../../../Link/Link';

// const styleRule = ({ theme, isBusy, }) => ({
//   backgroundColor: 'rgba(200,200,200, 0.3)',
//   height: '100%',
// });

RespView282.propTypes = {
  clicktrackerimage: PropTypes.shape({}),
  link: PropTypes.string.isRequired,
  linkTarget: PropTypes.string.isRequired,
  contentName: PropTypes.string.isRequired,
};

RespView282.defaultProps = {
  clicktrackerimage: null,
};

/**
 * A Simple ClickTrackerBanner view.
 * It's purpose is to display a certain banner according to passed-down props.
 * @export RespView282 which is a pure function component (get props, returns JSX)
 * @param {*} { clicktrackerimage, link, linkTarget, contentName, } destructuerd props
 * @returns a banner component to be displayed.
 */
export default function RespView282({
  clicktrackerimage,
  link,
  linkTarget,
  contentName,
}) {
  // do some pre-processing
  return (
    <Link
      href={link}
      targer={linkTarget}
      content={
        <FelaComponent
          // rule={styleRule}
          style={{
            backgroundColor: '#ebebeb',
            width: '100%',
            height: '152px',
            display: 'flex',
          }}
          render="div"
        >
          <Image
            data={{
              ...clicktrackerimage,
              isAnimatedGif: clicktrackerimage.isAnimated,
            }}
            hasWrapper={false}
            imgOptions={{
              sizes: '(min-width:1420px) 610px,(min-width:1320px) 500px, 280px',
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
              width: '408px',
              height: '152px',
              paddingTop: '21px',
              paddingRight: '12px',
              paddingLeft: '12px',
              paddingBottom: '22px',
              fontFamily: 'Arial',
              fontSize: '20px',
              fontWeight: 'bold',
              fontStyle: 'normal',
              fontStretch: 'normal',
              lineHeight: 1.4,
              letterSpacing: 'normal',
              textAlign: 'right',
              color: '#2d2d2d',
            }}
          >
            {contentName}
          </FelaComponent>
        </FelaComponent>
      }
    />
  );
}
