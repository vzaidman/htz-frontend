/** ************************************************************** *
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

const IconReading = createComponent(iconStyle, UnstyledIconReading, [
  'attrs',
  'onClick',
]);

IconReading.propTypes = iconPropTypes;
IconReading.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconReading.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconReading.defaultProps = {
  attrs: null,
};

function UnstyledIconReading({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path fill="currentColor" d="M208.7 248.3l-80-80-80 80V8.3h160v240z" />
    </svg>
  );
}

export default IconReading;
