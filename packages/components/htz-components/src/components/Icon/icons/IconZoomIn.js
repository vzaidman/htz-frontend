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

const IconZoomIn = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M165.9 153.6c7.8-10.8 12.5-24.1 12.5-38.5 0-36.3-29.5-65.8-65.7-65.8S47 78.9 47 115.1c0 36.3 29.5 65.8 65.7 65.8 14.7 0 28.3-4.9 39.3-13.1l51.6 51.6 14.1-14.1-51.8-51.7zM148 120h-28v28h-16v-28H76v-16h28V76h16v28h28v16z" /></svg>
    )}
  />
);

IconZoomIn.propTypes = iconPropTypes;
IconZoomIn.defaultProps = iconDefaultProps;

export default IconZoomIn;
