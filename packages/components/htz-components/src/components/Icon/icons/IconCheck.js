/** ************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change this Icon component , it is generated
 * from the `iconTamplate.js` file the parent directory.
 * *************************************************************** */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import iconStyle from '../iconStyle';
import { iconPropTypes, iconDefaultProps, } from '../iconPropTypes';

const IconCheck = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 725.7 725.7"
        className={className}
        {...props}
        {...attrs}
      >
        {' '}
        <path
          fill="currentColor"
          d="M563.4 228.9L301.5 536.6l-139.2-153 45.6-41.7 75.4 82.8 7.9 8.7 9.2 10.1 8.9-10.4 7.6-8.9L516.6 189l46.8 39.9zm139.5 133.9c0 187.5-152.6 340.1-340.1 340.1S22.7 550.4 22.7 362.8c0-187.5 152.6-340.1 340.1-340.1 46 0 90.7 9.1 132.7 26.9 40.7 17.3 77.2 42 108.5 73.4 31.2 31.3 55.6 67.6 72.6 108 17.6 41.8 26.5 86.2 26.3 131.8zm-26.5.7c0-172.9-140.7-313.6-313.6-313.6S49.3 190.6 49.3 363.5 189.9 677 362.8 677c42.4 0 83.6-8.4 122.4-24.8 37.5-15.9 71.2-38.7 100-67.7 28.7-28.8 51.2-62.3 66.9-99.5 16.3-38.5 24.5-79.4 24.3-121.5z"
        />
      </svg>
    )}
  />
);

IconCheck.propTypes = iconPropTypes;
IconCheck.defaultProps = iconDefaultProps;

export default IconCheck;
