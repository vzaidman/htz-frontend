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

const IconClose = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M187.5 203l-58.7-58.7-60.9 60.9-16.7-16.7 60.9-60.9-58.8-58.7 17.4-17.4 58 58 58.7-58.7 17.4 17.4-58.7 58.7 58.7 58.7-17.3 17.4z" /></svg>
    )}
  />
);

IconClose.propTypes = iconPropTypes;
IconClose.defaultProps = iconDefaultProps;

export default IconClose;
