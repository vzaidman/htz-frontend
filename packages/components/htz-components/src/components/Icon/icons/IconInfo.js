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

const IconInfo = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="0.765625em" height="1em" viewBox="0 0 196 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M121 87v99.1c0 8.8 1 14.5 3.1 16.9 2 2.5 6 3.9 11.9 4.2v4.8H70v-4.8c5.5-.2 9.6-1.8 12.3-4.8 1.8-2 2.7-7.5 2.7-16.3v-73c0-8.8-1-14.5-3.1-16.9-2.1-2.5-6-3.9-11.9-4.2v-5h51zm-18.1-59.7c5.8 0 10.6 2 14.6 6.1 4 4 6 8.9 6 14.6 0 5.7-2 10.5-6 14.5s-8.9 6-14.6 6c-5.7 0-10.5-2-14.5-6s-6-8.8-6-14.5c0-5.7 2-10.5 6-14.6s8.8-6.1 14.5-6.1z" /></svg>
    )}
  />
);

IconInfo.propTypes = iconPropTypes;
IconInfo.defaultProps = iconDefaultProps;

export default IconInfo;
