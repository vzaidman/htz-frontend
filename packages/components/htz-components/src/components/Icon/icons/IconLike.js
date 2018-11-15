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

const IconLike = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M184 72h48v113h-48V72zM24.7 91.2c3.7 20.4 29.6 76.1 29.6 76.1 4.9 11.1 8 17.8 17.8 17.8h74c11.6 0 21-9.4 21-21V93c0-11.6-9.4-21-21-21-1 0-2-.5-2.6-1.3-20.5-27.4-24.1-41.1-30-56-1.9-4.9-6-13.8-14.8-13.8-10.9.1-24.8 13.1-25.2 28-.4 15.3 1.8 24.4 11.4 42.8 0 .1.1.1.1.2H42.9c-9.9.1-20 9.6-18.2 19.3z" /></svg>
    )}
  />
);

IconLike.propTypes = iconPropTypes;
IconLike.defaultProps = iconDefaultProps;

export default IconLike;
