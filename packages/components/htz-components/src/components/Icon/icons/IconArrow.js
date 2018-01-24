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

const IconArrow = createComponent(
  iconStyle,
  UnstyledIconArrow,
  [ 'attrs', 'onClick', ]
);

IconArrow.propTypes = iconPropTypes;
IconArrow.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconArrow.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconArrow.defaultProps = {
  attrs: null,
};

function UnstyledIconArrow({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M238.1 142H69l59.4 59.4-19.5 19.6-93-93 93-93 19.6 19.6L69 114h169.1v28z" /></svg>
  );
}


export default IconArrow;
