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

const IconCamera = ({ size, fill, color, attrs, miscStyles, ...props }) => (
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
          d="M174.2 67L164 40H88.4L78.2 67H25v140h206V67h-56.8zm-45.9 116c-25.7 0-46.6-20.9-46.6-46.6 0-25.7 20.9-46.6 46.6-46.6s46.6 20.9 46.6 46.6c0 25.8-20.9 46.6-46.6 46.6zm29.7-46.8c0 16.4-13.3 29.7-29.7 29.7s-29.7-13.3-29.7-29.7 13.3-29.7 29.7-29.7 29.7 13.3 29.7 29.7z"
        />
      </svg>
    )}
  />
);

IconCamera.propTypes = iconPropTypes;
IconCamera.defaultProps = iconDefaultProps;

export default IconCamera;
