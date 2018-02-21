/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change this Icon component , it is generated
 * from the `iconTamplate.js` file the parent directory.
 * *************************************************************** */
import React from 'react';
import { createComponent, } from 'react-fela';
import iconStyle from '../iconStyle';
import { iconPropTypes, iconDefaultProps, } from '../iconPropTypes';
import { attrsPropType, } from '../../../propTypes/attrsPropType';

const IconApple = createComponent(
  iconStyle,
  UnstyledIconApple,
  [ 'attrs', 'onClick', ]
);

IconApple.propTypes = iconPropTypes;
IconApple.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconApple.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconApple.defaultProps = {
  attrs: null,
};

function UnstyledIconApple({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M193.5 135.5c-.3-30.3 24.8-44.9 25.9-45.6-14.1-20.6-36-23.4-43.9-23.7-18.7-1.9-36.4 11-45.9 11S105.5 66.5 90 66.8c-20.4.3-39.1 11.8-49.6 30-21.1 36.7-5.4 90.9 15.2 120.7 10.1 14.5 22.1 30.9 37.9 30.3 15.2-.6 20.9-9.8 39.3-9.8s23.5 9.8 39.6 9.5c16.3-.3 26.7-14.8 36.7-29.4 11.6-16.9 16.3-33.2 16.6-34.1-.4-.2-31.9-12.3-32.2-48.5m-30.2-89c8.4-10.1 14-24.2 12.5-38.3-12.1.5-26.7 8-35.3 18.1-7.8 9-14.7 23.7-12.9 37.4 13.4 1.1 27.3-7.1 35.7-17.2" /></svg>
  );
}


export default IconApple;
