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

const IconFacebook = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M94 248V137H69V92h25V63c0-21.4 10.3-55 54.1-55H187v44h-28.3c-4.6 0-12.7 3.2-12.7 13v27h43l-4.2 45H146v111H94z" /></svg>
    )}
  />
);

IconFacebook.propTypes = iconPropTypes;
IconFacebook.defaultProps = iconDefaultProps;

export default IconFacebook;
