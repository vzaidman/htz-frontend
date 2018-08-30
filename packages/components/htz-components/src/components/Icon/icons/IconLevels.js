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

const IconLevels = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M64 235c-12.4 0-22.5-10.1-22.5-22.5v-40c0-12.4 10.1-22.5 22.5-22.5s22.5 10.1 22.5 22.5v40c0 12.4-10.1 22.5-22.5 22.5zm84.5-22.5v-104c0-12.4-10.1-22.5-22.5-22.5s-22.5 10.1-22.5 22.5v104c0 12.4 10.1 22.5 22.5 22.5s22.5-10.1 22.5-22.5zm66 0v-169c0-12.4-10.1-22.5-22.5-22.5s-22.5 10.1-22.5 22.5v169c0 12.4 10.1 22.5 22.5 22.5s22.5-10.1 22.5-22.5z" /></svg>
    )}
  />
);

IconLevels.propTypes = iconPropTypes;
IconLevels.defaultProps = iconDefaultProps;

export default IconLevels;
