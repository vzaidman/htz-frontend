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

const IconCamera = createComponent(
  iconStyle,
  UnstyledIconCamera,
  [ 'attrs', 'onClick', ]
);

IconCamera.propTypes = iconPropTypes;
IconCamera.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconCamera.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconCamera.defaultProps = {
  attrs: null,
};

function UnstyledIconCamera({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M183.8 62l-11.7-31H85.2L73.5 62H9v164h240V62h-65.2zm-54.2 136c-30 0-54.4-24.3-54.4-54.4 0-30 24.3-54.4 54.4-54.4s54.4 24.3 54.4 54.4c-.1 30.1-24.4 54.4-54.4 54.4zm34.7-54.6c0 19.2-15.5 34.7-34.7 34.7s-34.7-15.5-34.7-34.7c0-19.2 15.5-34.7 34.7-34.7s34.7 15.5 34.7 34.7z" /></svg>
  );
}


export default IconCamera;
