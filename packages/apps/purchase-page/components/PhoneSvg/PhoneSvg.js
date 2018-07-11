import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const propTypes = {
  isOnSale: PropTypes.bool,
  brand: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  isOnSale: false,
  brand: 'HTZ',
  size: 8,
};

function phoneSvg({ brand, size, isOnSale, }) {
  const brandColor = brand === 'HTZ' ? 'htz' : 'tm';
  const [ width, height, ] = [ 123, 244, ];
  const aspectRatio = width / height;

  return (
    <FelaComponent
      style={{ position: 'relative', display: 'inline-block', }}
      render={({ theme, theme: { color, }, className, }) => (
        <div className={className}>
          <svg
            height={`${size}em`}
            width={`${size * aspectRatio}em`}
            viewBox={`0 0 ${width} ${height}`}
          >
            <path d="M121.8 30h0.2v-2.2 -13 -1.9c0-4.1-3-7.7-7.1-8.3C99.6 2.1 92 0 62 0 34.3 0 23.9 2.2 9.1 4.5 5 5.2 2 8.7 2 12.8v2.6 13.1V46H0.5C0.2 46 0 46.2 0 46.5v34.1c0 0.3 0.2 0.5 0.5 0.5H2v12.8 54.9 45.5 34.6 0.2l0 0c0.1 6 5.2 9.9 11.1 10.9 12.9 2.1 21.6 4 48.9 4 25.1 0 36-1.9 48.9-4.1 6-1 11-4.9 11.1-10.9l0 0v-0.5 -34.6 -45.5 -55V50h-0.2c0.4 0.1 0.8-0.3 1.2-0.7v-18C122.6 30.9 121.8 30 121.8 30z" />
            <circle fill="#FFFFFF" cx="61.5" cy="11.5" r="3.5" />
            <circle fill="#FFFFFF" cx="14" cy="15" r="2" />
            {/* screen background color */}
            <rect
              x="7"
              y="24"
              fill={color('phones', brandColor)}
              width="110"
              height="194"
            />
            <circle fill="#FFFFFF" cx="62" cy="121" r="34.5" />
            {brand === 'HTZ' ? (
              <path
                id="logoHTZ"
                fill={color('phones', brandColor)}
                d="M82.07 139.57c-0.09 0-0.17 0.09-0.17 0.17L50.07 116.55c-0.09 0-0.43 0.34-1.11 1.11 -0.68 0.77-1.11 1.88-1.28 3.42 -0.26 2.05-0.17 4.19 0.17 6.42 0.43 2.23 1.71 3.42 3.85 3.42h5.73l-0.17 2.65c-0.17 1.8 0.43 4.02 1.71 6.76H43.82l-0.17-0.17c-0.09-0.09-0.09-0.26 0-0.51 0.26-0.77 0.6-2.05 1.03-4.11 0.43-1.97 0.69-4.28 0.94-6.85 0.09-1.71-0.09-3.42-0.43-5.05 -0.34-1.63-0.6-3.34-0.6-5.13 0-1.63 0.09-2.91 0.26-3.68 0.17-0.77 0.34-2.14 0.6-4.11 0.17-1.45 0.17-2.99-0.17-4.53 -0.26-1.54-0.77-2.99-1.37-4.28 0-0.09 0-0.17 0.09-0.17h2.57c1.88 1.46 4.62 3.59 8.39 6.25 3.68 2.74 7.1 5.13 10.01 7.36 0.34-0.17 0.69-0.51 1.03-1.11 0.34-0.51 0.69-1.37 1.03-2.48 0.34-1.37 0.34-2.57 0-3.42 -0.34-0.94-0.6-1.88-0.6-2.74 -0.09-0.94-0.09-1.71 0.09-2.31 0.17-0.6 0.6-1.11 0.6-1.63h12.84c-1.71 2.74-2.4 5.22-1.45 7.62l1.37 3.51h-9.24c-0.68 0-1.28 0.26-1.8 0.86 -0.6 0.51-0.94 1.28-1.11 2.05 -0.09 0.51 0 1.11 0.17 1.71 0.26 0.6 0.51 1.03 0.77 1.2 2.4 1.63 4.45 3.17 6.16 4.45 1.71 1.28 3.42 2.57 5.31 3.77 -0.26 1.37-0.43 2.4-0.51 3.08 -0.09 0.69 0 1.71 0.17 3.08 0.17 1.03 0.43 2.05 0.86 3.17 0.34 1.11 0.77 2.14 1.28 3.17C82.16 139.48 82.16 139.57 82.07 139.57z"
              />
            ) : (
              <path
                id="logoTM"
                fill={color('phones', brandColor)}
                d="M80.19 136.4h-0.09 -8.3v-22.42l-5.56 22.42h-8.56l-5.56-22.42v22.42h-8.3v-30.81h13.86l2.91 16.77h2.74l2.91-16.77h13.95V136.4z"
              />
            )}
          </svg>
          {isOnSale && (
            <FelaComponent
              style={{
                position: 'absolute',
                top: '20%',
                start: '7.5rem',
                transform: 'rotate(-25deg)',
                extend: [
                  theme.mq(
                    { until: 'l', },
                    { start: '4rem', fontSize: '1.8rem', top: '10%', }
                  ),
                ],
              }}
              render={({ className, }) => (
                <svg
                  height={`${size / 1.5}em`}
                  width={`${size / 1.5}em`}
                  viewBox={`0 0 ${256} ${256}`}
                  className={className}
                >
                  <path
                    fill="#FFE70C"
                    d="M128,250C60.7,250,6,195.3,6,128C6,60.7,60.7,6,128,6c67.3,0,122,54.7,122,122C250,195.3,195.3,250,128,250 z"
                  />
                  <path
                    fill="#FFF"
                    d="M128,8c66.3,0,120,53.7,120,120s-53.7,120-120,120S8,194.3,8,128S61.7,8,128,8 M128,4 C94.9,4,63.7,16.9,40.3,40.3S4,94.9,4,128s12.9,64.3,36.3,87.7S94.9,252,128,252s64.3-12.9,87.7-36.3S252,161.1,252,128 s-12.9-64.3-36.3-87.7S161.1,4,128,4L128,4z"
                  />
                  <path
                    fill="#2C2C2C"
                    d="M73.8,109.9H64V77.1h9.8V109.9z M80.5,99.3V77.1h9.8v15.3l-5.4,6.9H80.5z M112.6,109.9H98.2l-2.8-32.8h9.5 l1.3,15.2c0.2,0,0.4-0.1,0.7-0.2c0.3-0.1,0.5-0.3,0.7-0.5c0.2-0.2,0.4-0.6,0.6-1.1c0.2-0.5,0.3-1.1,0.4-1.7l1-11.8h9.5l-1,11.7 c-0.1,1.4-0.3,2.6-0.7,3.7c-0.4,1.1-0.8,2-1.3,2.7c-0.5,0.7-1.1,1.3-1.8,1.9c-0.7,0.5-1.3,0.9-1.9,1.2s-1.3,0.5-2,0.7 c-1,0.2-2.1,0.4-3.2,0.4h-0.4l0.3,3h6.6c2.1,0,3.9-0.8,5.3-2.5c1.4-1.7,2.2-4.3,2.6-8l1.3-14.7h9.5L131,92 c-0.3,2.9-0.8,5.4-1.6,7.5c-0.8,2.1-1.8,3.9-2.9,5.2c-1.1,1.3-2.4,2.3-4,3.1c-1.6,0.8-3.1,1.3-4.7,1.6 C116.3,109.7,114.6,109.9,112.6,109.9z M146.2,76.6c2.1,0,4,0.3,5.6,0.8c1.6,0.6,3,1.3,4,2.2c1,0.9,1.9,2,2.5,3.4 c1.2,2.3,1.8,5.2,1.8,8.4v4.2c0,1.6-0.1,3.1-0.3,4.4c-0.2,1.3-0.6,2.7-1.2,4s-1.4,2.5-2.4,3.4c-1,0.9-2.3,1.6-4,2.2 c-1.7,0.6-3.6,0.8-5.9,0.8c-4.4,0-7.9-0.2-10.3-0.7V102c2.6,0.3,5.7,0.5,9.4,0.5c1.8,0,3.1-0.6,3.8-1.8c0.7-1.2,1.1-2.9,1.1-5.1 v-4.2c0-0.9,0-1.6-0.1-2.3s-0.2-1.3-0.5-1.9c-0.2-0.7-0.6-1.2-1-1.6c-1-0.9-2.5-1.4-4.6-1.4c-2.2,0-4.5,0.1-7,0.3l-1.2,0.1V77 C138.8,76.7,142.2,76.6,146.2,76.6z M193.2,77.1L192,91.5c-0.3,2.9-0.7,5.3-1.5,7.2c-2.4,6.2-7.6,9.9-15.7,11.2l-11.3,1.8v-7.8 l7.9-1.2l-6.9-25.6h9.8l4,14.2l1.6,8.2c1.3-1.5,2.1-4,2.4-7.5l1.3-14.9H193.2z M50.7,159h-8.4l-1.3-23.9H52L50.7,159z M41.2,167.9 c0-1.5,0.5-2.7,1.4-3.6c0.9-0.9,2.2-1.3,3.9-1.3c1.7,0,3,0.4,3.9,1.3c0.9,0.8,1.3,2,1.3,3.6c0,1.5-0.5,2.7-1.4,3.6 c-0.9,0.9-2.2,1.3-3.9,1.3c-1.7,0-3-0.4-3.9-1.3C41.6,170.6,41.2,169.4,41.2,167.9z M85.1,139.3l-1.3,14.4 c-0.3,2.9-0.7,5.3-1.5,7.2c-2.4,6.2-7.6,9.9-15.7,11.2l-11.3,1.8v-7.8l7.9-1.2l-6.9-25.6H66l4,14.2l1.6,8.2c1.3-1.5,2.1-4,2.4-7.5 l1.3-14.9H85.1z M118.4,172.1H89.2v-7.6h13.3l3.6,0.2l-6-7.5l-11.7-17.9h10.8l7.8,12.6c0.5-1.4,0.9-3.1,1-5.1l0.6-7.5h9.8l-0.6,6.6 c-0.1,0.8-0.2,1.5-0.2,2c-0.1,0.5-0.2,1.3-0.5,2.4c-0.3,1.1-0.6,2.1-0.9,2.9c-0.4,0.8-0.9,1.8-1.6,2.9c-0.7,1.1-1.5,2-2.5,2.9 l6.2,7.4V172.1z M132.5,138.8c3.1,0,5.5,0.3,7.3,0.8c2,0.6,3.4,1.4,4.2,2.4c1,1.1,1.6,2.4,1.9,3.8c0.3,1.4,0.5,3.1,0.5,5v13.7h3.6 v7.6h-27.5v-7.6h14.1v-13.2c0-3.3-1.7-4.9-5-4.9c-2.1,0-4.6,0.1-7.5,0.4l-1.6,0.2v-7.5C124.5,139,127.8,138.8,132.5,138.8z M161.9,139.3c0.6,1,1,2.1,1.1,3.3h0.4c0.3-0.3,0.8-0.8,1.4-1.3s1.3-0.9,2-1.3c0.6-0.3,1.5-0.6,2.5-0.9s2.3-0.4,3.6-0.4 c1.4,0,2.7,0.2,4,0.7c1.3,0.5,2.3,1.2,3.1,2c0.8,0.8,1.5,1.9,1.9,3.2c0.9,2.3,1.3,5.2,1.3,8.9v18.5h-15.8v-7.6h5.8v-10.9 c0-1.8-0.1-3.1-0.3-3.9c-0.2-0.8-0.4-1.4-0.7-1.8c-0.6-0.9-1.7-1.4-3.1-1.4c-0.6,0-1.2,0.1-1.7,0.3c-0.6,0.2-1,0.5-1.4,0.8 c-0.8,0.7-1.4,1.3-1.6,1.8l-0.2,0.4l-1.9,22.1h-9.7l1.9-20.7c0.1-1.2,0.2-2.3,0.2-3.4c0-2.9-0.5-5.8-1.6-8.7H161.9z M198.9,138.8 c3.1,0,5.5,0.3,7.3,0.8c2,0.6,3.4,1.4,4.2,2.4c1,1.1,1.6,2.4,1.9,3.8c0.3,1.4,0.5,3.1,0.5,5v13.7h3.6v7.6h-27.5v-7.6h14.1v-13.2 c0-3.3-1.7-4.9-5-4.9c-2.1,0-4.6,0.1-7.5,0.4l-1.6,0.2v-7.5C190.8,139,194.2,138.8,198.9,138.8z"
                  />
                </svg>
              )}
            />
          )}
        </div>
      )}
    />
  );
}

phoneSvg.propTypes = propTypes;

phoneSvg.defaultProps = defaultProps;

export default phoneSvg;
