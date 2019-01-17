/* *************************************************************** *
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
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M98 43h66.4l64 108H162L98 43zM69.1 214h125.6l33.6-56H101.9l-32.8 56zM91.3 47.5l32.9 55.4-63.4 107.6-33.7-55.4L91.3 47.5z" /></svg>
    )}
  />
);

IconDrive.propTypes = iconPropTypes;
IconDrive.defaultProps = iconDefaultProps;

export default IconDrive;
