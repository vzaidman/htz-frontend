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

const IconSettings = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M215 140.2v-23.9l-24.6-8.5c-.9-2.7-1.9-5.3-3.1-7.8l10.5-25.3L181 58l-23.5 11.5c-2.4-1.2-4.8-2.2-7.4-3.1L139.7 41h-23.8l-8.6 25c-2.4.8-4.8 1.8-7.1 2.9L75.5 58.6 58.7 75.5l11.1 23c-1.5 2.9-2.7 5.9-3.8 9.1l-24.1 10v23.9l24.4 8.4c.9 2.5 1.9 5 3.1 7.4l-10.3 25L76 199l23.9-11.7c2.3 1.1 4.7 2.1 7.2 2.9l10.6 25.7h23.8l9-26.1c2.3-.8 4.5-1.8 6.7-2.9l24.7 10.3 16.8-16.9-11.5-23.7c.9-1.9 1.8-3.9 2.5-5.9l25.3-10.5zm-88 26c-20.8 0-37.7-16.9-37.7-37.7 0-20.8 16.9-37.7 37.7-37.7s37.7 16.9 37.7 37.7c0 20.8-16.9 37.7-37.7 37.7z" /></svg>
    )}
  />
);

IconSettings.propTypes = iconPropTypes;
IconSettings.defaultProps = iconDefaultProps;

export default IconSettings;
