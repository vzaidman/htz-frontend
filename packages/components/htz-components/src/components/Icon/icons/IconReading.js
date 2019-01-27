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

const IconReading = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="0.84375em" height="1em" viewBox="0 0 216 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M164 215l-56-56-56 56V47h112v168z" /></svg>
    )}
  />
);

IconReading.propTypes = iconPropTypes;
IconReading.defaultProps = iconDefaultProps;

export default IconReading;
