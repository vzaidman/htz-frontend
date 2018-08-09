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

const IconBold = ({ size, fill, color, attrs, miscStyles, ...props }) => (
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
          d="M163.1 122c20.3 3.7 35.4 10.2 45.6 19.6 10.1 9.4 15.2 21.6 15.2 36.7 0 16.9-6.5 30.3-19.4 40-13 9.8-34.5 14.6-64.6 14.6h-108V216c10.8 0 18-1.7 21.6-5.2 3.5-3.4 5.3-10.2 5.3-20.4V68c0-9.9-1.7-16.6-5-20.2-3.3-3.6-10.6-5.4-21.9-5.4V25.3L111 23h11.2c35.6 0 59.9 4.5 72.9 13.5 13 9 19.4 21.2 19.4 36.7 0 11.7-4.3 21.6-12.8 29.7-8.5 8.2-21.4 14.5-38.6 19.1zm-49.6-8.4h10.6c11.3 0 19.7-2.6 25.2-7.9 5.5-5.3 8.3-14.4 8.3-27.5 0-9.7-1.7-17.4-5.2-23.1-3.5-5.6-8.1-9.3-13.8-10.9-5.7-1.6-14.1-2.5-25.2-2.5v71.9zm0 17.9v59.2c0 5.7.6 10.1 1.8 13.1 1.2 3 3.5 5.5 6.9 7.5 3.4 2 8.3 3 14.5 3 9.7 0 17.1-3.4 21.9-10.3 4.9-6.9 7.3-17.2 7.3-30.9 0-11-1.6-19.6-4.8-25.8-3.2-6.2-7.5-10.4-13.1-12.5-5.5-2.2-13.7-3.2-24.6-3.2h-9.9z"
        />
      </svg>
    )}
  />
);

IconBold.propTypes = iconPropTypes;
IconBold.defaultProps = iconDefaultProps;

export default IconBold;
