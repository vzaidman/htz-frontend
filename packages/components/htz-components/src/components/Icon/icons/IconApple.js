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

const IconApple = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M187.1 131c-.3-27.4 22.4-40.5 23.4-41.2-12.7-18.6-32.6-21.1-39.6-21.4-16.9-1.7-32.9 9.9-41.5 9.9-8.5 0-21.8-9.7-35.7-9.4-18.4.2-35.4 10.6-44.8 27.1-19.1 33.1-4.9 82.2 13.7 109 9.1 13.1 20 27.9 34.2 27.4 13.7-.5 18.9-8.9 35.5-8.9s21.2 8.9 35.8 8.6c14.8-.3 24.1-13.4 33.2-26.6 10.4-15.3 14.8-30 15-30.8-.4-.1-28.9-11-29.2-43.7m-27.2-80.4c7.6-9.2 12.7-21.9 11.3-34.6-10.9.4-24.1 7.3-31.9 16.4-7 8.1-13.3 21.4-11.7 33.8 12.1.9 24.7-6.5 32.3-15.6" /></svg>
    )}
  />
);

IconApple.propTypes = iconPropTypes;
IconApple.defaultProps = iconDefaultProps;

export default IconApple;
