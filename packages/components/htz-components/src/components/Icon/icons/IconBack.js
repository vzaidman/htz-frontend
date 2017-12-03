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

const IconBack = createComponent(
  iconStyle,
  UnstyledIconBack,
  [ 'attrs', 'onClick', ]
);

IconBack.propTypes = iconPropTypes;
IconBack.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconBack.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconBack.defaultProps = {
  attrs: null,
};

function UnstyledIconBack({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M84.1 127.7l99.6 99.6-19.8 19.8L44.5 127.7 163.9 8.3l19.8 19.8-99.6 99.6z" /></svg>
  );
}


export default IconBack;
