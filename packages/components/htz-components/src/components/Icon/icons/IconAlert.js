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

const IconAlert = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M196.9 169.3c-4-4-6.3-9.2-6.7-14.8L187 94.8c0-25-21.2-45.1-49.1-48.4 0-1.2-.1-2.8-.1-4.3 0-3.3-2-6.4-5.1-7.6-5.4-1.9-10.5 2-10.4 7.1 0 2.1.1 3.7.1 4.8-27.9 3.3-49.6 23.3-49.6 48.3l-3.3 59.6c-.3 5.6-2.7 10.9-6.7 14.9L46 186v7h168v-7l-17.1-16.7zM110.6 202h38c0 10.5-8.3 18.6-18.8 18.6s-19.2-8.1-19.2-18.6z" /></svg>
    )}
  />
);

IconAlert.propTypes = iconPropTypes;
IconAlert.defaultProps = iconDefaultProps;

export default IconAlert;
