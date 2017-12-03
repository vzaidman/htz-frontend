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

const IconAlert = createComponent(
  iconStyle,
  UnstyledIconAlert,
  [ 'attrs', 'onClick', ]
);

IconAlert.propTypes = iconPropTypes;
IconAlert.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconAlert.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconAlert.defaultProps = {
  attrs: null,
};

function UnstyledIconAlert({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M215.1 183.5c-5.1-5.1-8.2-11.9-8.6-19.2l-4.3-77c0-32.2-27.3-58.2-63.2-62.4 0-1.6-.1-3.6-.1-5.6 0-4.6-2.9-8.8-7.3-10-6.6-1.9-12.7 3.1-12.7 9.4 0 2.7.1 4.8.1 6.2C83.1 29.1 55.2 55 55.2 87.2l-4.3 77c-.4 7.2-3.4 14-8.6 19.2L21 204.9v9.1h216v-9l-21.9-21.5zM103.3 225h49c0 13.5-10.7 24-24.2 24s-24.8-10.5-24.8-24z" /></svg>
  );
}


export default IconAlert;
