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

const IconClock = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M128 7.3C61.3 7.3 7.3 61.3 7.3 128s54 120.8 120.7 120.8S248.8 194.7 248.8 128 194.7 7.3 128 7.3zm0 216.6c-53 0-95.9-42.9-95.9-95.9S75 32.1 128 32.1 223.9 75 223.9 128 181 223.9 128 223.9zM128 50c-43.1 0-78 34.9-78 78s34.9 78 78 78 78-34.9 78-78-34.9-78-78-78zm53.3 92.3h-69v-69h21v50h48v19z" /></svg>
    )}
  />
);

IconClock.propTypes = iconPropTypes;
IconClock.defaultProps = iconDefaultProps;

export default IconClock;
