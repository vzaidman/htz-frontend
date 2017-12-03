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

const IconZoomIn = createComponent(
  iconStyle,
  UnstyledIconZoomIn,
  [ 'attrs', 'onClick', ]
);

IconZoomIn.propTypes = iconPropTypes;
IconZoomIn.defaultProps = iconDefaultProps;


// Underlying component
UnstyledIconZoomIn.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconZoomIn.defaultProps = {
  attrs: null,
};

function UnstyledIconZoomIn({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs} >  <path fill="currentColor" d="M248.1 228.5L175.7 156c11-15.2 17.5-33.8 17.5-54 0-50.8-41.3-92.1-92.1-92.1S9 51.3 9 102.1s41.3 92.1 92.1 92.1c20.6 0 39.7-6.8 55-18.3l72.3 72.3 19.7-19.7zm-147-57.2c-38.2 0-69.2-31.1-69.2-69.2s31-69.2 69.2-69.2 69.2 31.1 69.2 69.2-31.1 69.2-69.2 69.2zm10.6-19h-20v-100h20v100zm40-60v20h-100v-20h100z" /></svg>
  );
}


export default IconZoomIn;
