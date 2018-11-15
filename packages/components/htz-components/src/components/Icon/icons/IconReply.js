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

const IconReply = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M240 25.5v107l-23 24H69.9l42.4 42.4-19.6 19.6-76-76L92.3 67l19.6 19.6L70 128.5h142v-103h28z" /></svg>
    )}
  />
);

IconReply.propTypes = iconPropTypes;
IconReply.defaultProps = iconDefaultProps;

export default IconReply;
