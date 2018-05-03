import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

const propTypes = {
  brand: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  brand: 'HTZ',
  size: 8,
};

// todo: correct colors to theme
function phoneSvg({ brand, size, }) {
  const brandColor = brand === 'HTZ' ? 'htz' : 'tm';
  const [ width, height, ] = [ 123, 244, ];
  const aspectRatio = width / height;

  return (
    <FelaComponent
      render={({ theme: { color, }, }) => (
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
      )}
    />
  );
}

phoneSvg.propTypes = propTypes;

phoneSvg.defaultProps = defaultProps;

export default phoneSvg;
