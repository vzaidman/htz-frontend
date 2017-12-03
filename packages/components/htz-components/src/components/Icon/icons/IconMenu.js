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

const IconMenu = createComponent(
  iconStyle,
  UnstyledIconMenu,
  [ 'attrs', 'onClick', ]
);

IconMenu.propTypes = iconPropTypes;
IconMenu.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconMenu.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconMenu.defaultProps = {
  attrs: null,
};

function UnstyledIconMenu({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M249 34v27H9V34h240zM9 142h240v-27H9v27zm0 80h240v-27H9v27z" /></svg>
  );
}


export default IconMenu;
