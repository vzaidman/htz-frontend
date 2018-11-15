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

const IconAvatar = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M69.7 69c0-33.2 26.9-60.2 60.2-60.2S190 35.8 190 69s-26.9 60.2-60.2 60.2-60.1-27-60.1-60.2zm73.1 86.6h-25.9c-52.6 0-96 41.1-99.9 92.7h225.8c-4-51.6-47.4-92.7-100-92.7z" /></svg>
    )}
  />
);

IconAvatar.propTypes = iconPropTypes;
IconAvatar.defaultProps = iconDefaultProps;

export default IconAvatar;
