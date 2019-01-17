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

const IconMarker = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M128 39c-49.2 0-89 39.8-89 89s39.8 89 89 89 89-39.8 89-89-39.8-89-89-89zm46 128h-22v-56.8L137.7 167h-20.5L103 110.2V167H81V89h35.5l10.6 44.2L137.9 89H174v78z" /></svg>
    )}
  />
);

IconMarker.propTypes = iconPropTypes;
IconMarker.defaultProps = iconDefaultProps;

export default IconMarker;
