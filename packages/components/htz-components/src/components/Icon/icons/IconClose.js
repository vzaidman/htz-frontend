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

const IconClose = ({ size, fill, color, attrs, miscStyles, ...props }) => (
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
          d="M148.8 129l99.6 99.6-19.8 19.8-99.6-99.6-99.6 99.6-19.8-19.8 99.6-99.6L9.6 29.4 29.4 9.6l99.6 99.6 99.6-99.6 19.8 19.8-99.6 99.6z"
        />
      </svg>
    )}
  />
);

IconClose.propTypes = iconPropTypes;
IconClose.defaultProps = iconDefaultProps;

export default IconClose;
