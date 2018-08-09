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

const IconInfo = ({ size, fill, color, attrs, miscStyles, ...props }) => (
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
        viewBox="0 0 256 256"
        className={className}
        {...props}
        {...attrs}
      >
        {' '}
        <path
          fill="currentColor"
          d="M150.3 86.6v107.8c0 9.6 1.1 15.7 3.3 18.4 2.2 2.7 6.6 4.2 13.1 4.6v5.2H93.3v-5.2c6-.2 10.5-1.9 13.4-5.2 1.9-2.2 2.9-8.1 2.9-17.8V115c0-9.6-1.1-15.7-3.3-18.4-2.2-2.7-6.5-4.2-12.9-4.6v-5.4h56.9zm-20.4-65.9c6.3 0 11.6 2.2 16 6.6 4.4 4.4 6.5 9.7 6.5 15.9 0 6.2-2.2 11.5-6.6 15.9-4.4 4.4-9.7 6.5-15.9 6.5-6.2 0-11.5-2.2-15.9-6.5-4.4-4.4-6.5-9.7-6.5-15.9 0-6.2 2.2-11.5 6.5-15.9 4.4-4.4 9.7-6.6 15.9-6.6z"
        />
      </svg>
    )}
  />
);

IconInfo.propTypes = iconPropTypes;
IconInfo.defaultProps = iconDefaultProps;

export default IconInfo;
