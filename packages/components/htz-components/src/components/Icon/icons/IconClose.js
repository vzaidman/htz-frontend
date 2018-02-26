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

const IconClose = createComponent(iconStyle, UnstyledIconClose, [
  'attrs',
  'onClick',
]);

IconClose.propTypes = iconPropTypes;
IconClose.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconClose.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconClose.defaultProps = {
  attrs: null,
};

function UnstyledIconClose({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M148.8 129l99.6 99.6-19.8 19.8-99.6-99.6-99.6 99.6-19.8-19.8 99.6-99.6L9.6 29.4 29.4 9.6l99.6 99.6 99.6-99.6 19.8 19.8-99.6 99.6z"
      />
    </svg>
  );
}

export default IconClose;
