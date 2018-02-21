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

const IconAndroid = createComponent(
  iconStyle,
  UnstyledIconAndroid,
  [ 'attrs', 'onClick', ]
);

IconAndroid.propTypes = iconPropTypes;
IconAndroid.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconAndroid.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconAndroid.defaultProps = {
  attrs: null,
};

function UnstyledIconAndroid({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M61 179c0 12.4 8.4 23 20.7 23H91v31c0 6.2 3.7 11.9 9.5 14 10.3 3.7 18.5-5.9 18.5-15.6V202h15v29.5c0 8.2 8.6 16.4 15 16.4 8.4 0 14-8.2 14-16.4V202h7c12.3 0 24-9.5 24-21.9V99H61v80zm93.4-149.5l9.4-18.1c.5-.9.1-2-.8-2.4-.9-.5-2-.2-2.5.7L151 28.1c-7.5-2.9-15.5-5.1-24-5.1s-16.8 2.2-24.3 5.1L93.2 9.7c-.4-.7-1.3-1.1-2.1-.8-1 .4-1.7 1.5-1.2 2.5l9.4 18.1C78.2 39.1 64.6 60.1 62 84h132c-2.7-23.9-18.5-44.9-39.6-54.5zm-50.9 39.9c-5.6 0-10.1-4.5-10.1-10.1s4.5-10.1 10.1-10.1 10.1 4.5 10.1 10.1-4.6 10.1-10.1 10.1zm48.8 0c-5.6 0-10.1-4.5-10.1-10.1s4.5-10.1 10.1-10.1 10.1 4.5 10.1 10.1-4.5 10.1-10.1 10.1zM39.6 173h-.1c-7.9 0-14.4-6.5-14.4-14.4V95.4C25 87.5 31.5 81 39.4 81h.1c8 0 14.5 6.5 14.5 14.4v63.1c0 8-6.5 14.5-14.4 14.5zm177 0h-.1c-7.9 0-14.4-6.5-14.4-14.4V95.4c0-7.9 6.5-14.4 14.4-14.4h.1c7.9 0 14.4 6.5 14.4 14.4v63.1c0 8-6.5 14.5-14.4 14.5z" /></svg>
  );
}


export default IconAndroid;
