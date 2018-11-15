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

const IconLock = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M209.8 100H197V72.3C197 36.8 168.2 8 132.7 8h-9.4C87.8 8 59 36.8 59 72.3V100H47.2c-3.4 0-6.2 2.8-6.2 6.2v135.5c0 3.4 2.8 6.2 6.2 6.2h162.5c3.4 0 6.2-2.8 6.2-6.2V106.2c.1-3.4-2.7-6.2-6.1-6.2zM87 72c0-20.2 15.8-37 36.4-37h9.1c20.2 0 36.4 16.3 36.4 37v28H87V72zm31.1 148.2l-34.6-37.9 15.8-14.4 18.2 20.2 43.2-50.9 16.3 13.9-58.9 69.1z" /></svg>
    )}
  />
);

IconLock.propTypes = iconPropTypes;
IconLock.defaultProps = iconDefaultProps;

export default IconLock;
