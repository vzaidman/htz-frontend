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

const IconPrint = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M222 95h-23V69.7L170.6 46H61c-1.7 0-3 1.3-3 3v46H34v93h22v21.3c0 1.5 1.2 2.7 2.7 2.7h137.6c1.5 0 2.7-1.2 2.7-2.7V188h23V95zM66 53h101.7L191 72.8V95H66V53zm126 151H65v-39h127v39zm6.5-77c-7.7 5.9-16.4-2.8-10.5-10.5 7.7-5.9 16.4 2.8 10.5 10.5z" /></svg>
    )}
  />
);

IconPrint.propTypes = iconPropTypes;
IconPrint.defaultProps = iconDefaultProps;

export default IconPrint;
