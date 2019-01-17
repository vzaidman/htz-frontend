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

const IconMessenger = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M128.1 44.8c-47.8 0-86.5 35.9-86.5 80.3 0 25.4 12.6 47.8 32.4 62.5v30.3l27.4-16.6c8.4 2.5 17.3 4.3 26.7 4.3 47.8 0 86.5-36.2 86.5-80.5s-38.8-80.3-86.5-80.3zm8.5 107L114 129.4l-40.1 21.2 43.9-47.3 22.6 22.4 41.4-21.2-45.2 47.3z" /></svg>
    )}
  />
);

IconMessenger.propTypes = iconPropTypes;
IconMessenger.defaultProps = iconDefaultProps;

export default IconMessenger;
