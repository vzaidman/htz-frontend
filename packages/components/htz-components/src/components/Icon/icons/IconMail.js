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

const IconMail = createComponent(
  iconStyle,
  UnstyledIconMail,
  [ 'attrs', 'onClick', ]
);

IconMail.propTypes = iconPropTypes;
IconMail.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconMail.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconMail.defaultProps = {
  attrs: null,
};

function UnstyledIconMail({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M208.7 248.3l-80-80-80 80V8.3h160v240z" /></svg>
  );
}


export default IconMail;
