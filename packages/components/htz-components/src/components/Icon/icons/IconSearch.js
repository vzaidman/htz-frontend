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

const IconSearch = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M154.4 59.7c-25.6-25.6-67.1-25.6-92.8 0s-25.6 67.1 0 92.8c23 23 58.8 25.3 84.5 7l52.2 52.2 15.2-15.2-52.2-52.2c18.5-25.6 16.2-61.5-6.9-84.6zm-13.9 78.8c-17.9 17.9-46.9 17.9-64.8 0s-17.9-46.9 0-64.8 46.9-17.9 64.8 0 17.9 46.9 0 64.8z" /></svg>
    )}
  />
);

IconSearch.propTypes = iconPropTypes;
IconSearch.defaultProps = iconDefaultProps;

export default IconSearch;
