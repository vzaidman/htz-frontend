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

const IconDrive = ({ size, fill, color, attrs, miscStyles, ...props }) => (
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
        <path d="M96 37h70.7l68.1 115h-70.7L96 37z" fill="#ffd04b" />{' '}
        <path d="M64.7 220h134.6l36-60H99.9l-35.2 60z" fill="#4688f4" />{' '}
        <path
          d="M20.7 156.6l35.9 58.9L124 101.1 89 42.2 20.7 156.6z"
          fill="#1fa463"
        />
      </svg>
    )}
  />
);

IconDrive.propTypes = iconPropTypes;
IconDrive.defaultProps = iconDefaultProps;

export default IconDrive;
