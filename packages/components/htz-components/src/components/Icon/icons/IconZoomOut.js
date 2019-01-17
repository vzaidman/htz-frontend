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

const IconZoomOut = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M165.6 153.6c7.8-10.8 12.5-24.1 12.5-38.5 0-36.3-29.5-65.8-65.7-65.8s-65.7 29.5-65.7 65.8 29.5 65.8 65.7 65.8c14.7 0 28.3-4.9 39.3-13.1l51.6 51.6 14.1-14.1-51.8-51.7zm-18-33.6h-72v-16h72v16z" /></svg>
    )}
  />
);

IconZoomOut.propTypes = iconPropTypes;
IconZoomOut.defaultProps = iconDefaultProps;

export default IconZoomOut;
