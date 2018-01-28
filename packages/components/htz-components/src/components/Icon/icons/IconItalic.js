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

const IconItalic = createComponent(
  iconStyle,
  UnstyledIconItalic,
  [ 'attrs', 'onClick', ]
);

IconItalic.propTypes = iconPropTypes;
IconItalic.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconItalic.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconItalic.defaultProps = {
  attrs: null,
};

function UnstyledIconItalic({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M147.7 229.7l-2.2 7H53.6l2.2-7h5c6.6 0 12.2-1.2 16.8-3.6 4.6-2.4 7.7-5.2 9.4-8.3 1.7-3.2 4.1-10.1 7.3-20.8l41.9-138.4c3.3-10.7 5-17.4 5-20 0-7.7-6.9-11.5-20.7-11.5l-5.8-1 2.2-7h85.6l-2.2 7h-4.5c-5.1 0-9.8.9-14 2.7-4.2 1.8-7.1 4.3-8.9 7.5-1.8 3.2-4.7 11.5-8.7 24.9l-40.6 133.3c-3.1 10.2-4.7 16.6-4.7 19.2 0 5.2 2.3 9.1 6.8 11.5 4.5 2.4 9.8 3.6 15.6 3.6l6.4.9z" /></svg>
  );
}


export default IconItalic;
