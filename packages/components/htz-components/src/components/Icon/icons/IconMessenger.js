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

const IconMessenger = createComponent(iconStyle, UnstyledIconMessenger, [
  'attrs',
  'onClick',
]);

IconMessenger.propTypes = iconPropTypes;
IconMessenger.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconMessenger.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconMessenger.defaultProps = {
  attrs: null,
};

function UnstyledIconMessenger({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M128.4 28c-56 0-101.5 42.2-101.5 94.2 0 29.8 14.8 56.1 38.1 73.3V231l32.1-19.5c9.9 3 20.3 5.1 31.3 5.1 56.1 0 101.5-42.4 101.5-94.5S184.5 28 128.4 28zm9.9 125.6l-26.5-26.3-47.1 24.8 51.5-55.5 26.5 26.3 48.5-24.8-52.9 55.5z"
      />
    </svg>
  );
}

export default IconMessenger;
