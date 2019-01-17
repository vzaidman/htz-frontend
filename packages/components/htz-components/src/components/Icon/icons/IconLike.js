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

const IconLike = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg width="1em" height="1em" viewBox="0 0 256 256" className={className} {...props} {...attrs} >  <path fill="currentColor" d="M85 177H46V84h39v93zm116.2-92h-34.7c0-.1.1-.1.1-.2 7.9-15.2 9.7-22.7 9.4-35.3-.3-12.3-11.8-23-20.6-23.1-7.3 0-10.7 7.3-12.2 11.3-4.8 12.3-7.8 23.6-24.7 46.1-.5.7-1.3 1.1-2.1 1.1h-.1c-9.5 0-17.2 7.7-17.2 17.2v58.6c0 9.5 7.7 17.2 17.2 17.2h61c8.1 0 10.6-5.4 14.6-14.6 0 0 21.3-45.8 24.3-62.6 1.4-7.9-7-15.7-15-15.7z" /></svg>
    )}
  />
);

IconLike.propTypes = iconPropTypes;
IconLike.defaultProps = iconDefaultProps;

export default IconLike;
