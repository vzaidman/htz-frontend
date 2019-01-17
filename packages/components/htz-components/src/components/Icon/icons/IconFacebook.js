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
      <svg width="0.8828125em" height="1em" viewBox="0 0 226 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M84 224v-84H64v-36h20V80.8c0-17 8.2-43.8 43-43.8h31v35h-21.8c-3.7 0-10.2 2.6-10.2 10.4V104h34.4l-3.4 36h-31v84H84z" /></svg>
    )}
  />
);

IconFacebook.propTypes = iconPropTypes;
IconFacebook.defaultProps = iconDefaultProps;

export default IconFacebook;
