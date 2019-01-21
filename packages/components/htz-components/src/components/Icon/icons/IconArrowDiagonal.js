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

const IconArrowDiagonal = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M246 10c-8-8-22-8-30 0L47 178V48c0-12-10-21-21-21S4 37 4 49v182c0 12 9 21 21 21h184c12 0 22-9 22-21s-10-21-22-21H75L246 40c8-8 8-22 0-30z" /></svg>
    )}
  />
);

IconArrowDiagonal.propTypes = iconPropTypes;
IconArrowDiagonal.defaultProps = iconDefaultProps;

export default IconArrowDiagonal;
