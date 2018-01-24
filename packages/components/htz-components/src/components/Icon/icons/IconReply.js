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

const IconReply = createComponent(
  iconStyle,
  UnstyledIconReply,
  [ 'attrs', 'onClick', ]
);

IconReply.propTypes = iconPropTypes;
IconReply.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconReply.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconReply.defaultProps = {
  attrs: null,
};

function UnstyledIconReply({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M240 25.5v107l-23 24H69.9l42.4 42.4-19.6 19.6-76-76L92.3 67l19.6 19.6L70 128.5h142v-103h28z" /></svg>
  );
}


export default IconReply;
