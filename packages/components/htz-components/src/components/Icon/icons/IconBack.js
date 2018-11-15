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

const IconBack = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M84.1 127.7l99.6 99.6-19.8 19.8L44.5 127.7 163.9 8.3l19.8 19.8-99.6 99.6z" /></svg>
    )}
  />
);

IconBack.propTypes = iconPropTypes;
IconBack.defaultProps = iconDefaultProps;

export default IconBack;
