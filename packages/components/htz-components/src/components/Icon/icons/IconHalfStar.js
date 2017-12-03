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

const IconHalfStar = createComponent(
  iconStyle,
  UnstyledIconHalfStar,
  [ 'attrs', 'onClick', ]
);

IconHalfStar.propTypes = iconPropTypes;
IconHalfStar.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconHalfStar.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconHalfStar.defaultProps = {
  attrs: null,
};

function UnstyledIconHalfStar({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M246.8 99.5c-.8-2.6-3.4-4.3-7.7-4.9L167 83.4 135 15c-1-1.8-2.1-3.3-3.3-4.4-1.2-1.1-2.5-1.6-3.7-1.6s-2.5.5-3.7 1.6c-1.3 1.1-2.4 2.5-3.3 4.4L89 83.4 17 94.5c-4.4.6-6.9 2.3-7.7 4.9-.8 2.7.4 5.7 3.5 9.1l52.1 53-12.6 74.8c-.3 3.4 0 6 .9 7.9.9 1.9 2.6 2.8 5.1 2.8.6 0 1.4-.2 2.3-.5 1-.3 2.1-.8 3.3-1.4l64.1-35.3 64.2 35.3c1.3.6 2.4 1.1 3.3 1.4.9.3 1.9.5 2.8.5 2.1 0 3.7-.9 4.6-2.8.9-1.9 1.2-4.5.9-7.9l-12.6-74.7 52.1-53c3.1-3.4 4.3-6.5 3.5-9.1zM128 200.5L60.2 238v-.7l12.5-74.5.7-4-2.9-2.9-52-52.9c-.2-.2-.4-.4-.5-.6h.1l72-11.1 4.2-.7 1.8-3.9L120 36l8-16.5v181z" /></svg>
  );
}


export default IconHalfStar;
