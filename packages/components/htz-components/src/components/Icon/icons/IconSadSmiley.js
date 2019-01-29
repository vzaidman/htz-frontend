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

const IconSadSmiley = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M115 104c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm46 1c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm1.6 55.7c1.8-1.7 1.9-4.6 0-6.4A48.2 48.2 0 0 0 128 139a48 48 0 0 0-34.7 15.3 4.5 4.5 0 0 0 0 6.4 4.6 4.6 0 0 0 6.5-.1c7.9-8.1 17.8-12.6 28.2-12.6s20.4 4.5 28.2 12.6c.9.9 2 1.4 3.2 1.4 1.2-.1 2.4-.5 3.2-1.3z" />  <circle cx={128} cy={128} r={88} fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={9} /></svg>
    )}
  />
);

IconSadSmiley.propTypes = iconPropTypes;
IconSadSmiley.defaultProps = iconDefaultProps;

export default IconSadSmiley;
