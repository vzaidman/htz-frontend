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

const IconGPlus = createComponent(
  iconStyle,
  UnstyledIconGPlus,
  [ 'attrs', 'onClick', ]
);

IconGPlus.propTypes = iconPropTypes;
IconGPlus.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconGPlus.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconGPlus.defaultProps = {
  attrs: null,
};

function UnstyledIconGPlus({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M226 136v25h-21v-25h-24v-21h24V91h21v24h24v21h-24zm-58.2-21h-77v27h45c-6.8 33.9-52.5 45.3-77 23.2-25.2-19.4-24-61.9 2.2-80 18.3-14.5 44.3-10.9 62.6 1.6 7.2-6.6 13.9-13.7 20.4-21-15.2-12.1-33.9-20.7-53.7-19.8-41.4-1.4-79.6 34.8-80.2 76.1-2.7 33.7 19.6 66.8 51.1 78.8 31.3 12 71.5 3.8 91.5-24.2 13.2-17.7 15.1-40.7 15.1-61.7z" /></svg>
  );
}


export default IconGPlus;
