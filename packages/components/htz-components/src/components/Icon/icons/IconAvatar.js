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
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M172 82c0 24.3-19.7 44-44 44s-44-19.7-44-44 19.7-44 44-44 44 19.7 44 44zm38.8 133c-2.9-37.9-34.7-68-73.3-68h-19c-38.6 0-70.4 30.1-73.3 68h165.6z" /></svg>
    )}
  />
);

IconAvatar.propTypes = iconPropTypes;
IconAvatar.defaultProps = iconDefaultProps;

export default IconAvatar;
