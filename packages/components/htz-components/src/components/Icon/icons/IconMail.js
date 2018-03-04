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

const IconMail = createComponent(iconStyle, UnstyledIconMail, [
  'attrs',
  'onClick',
]);

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
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M242.4 49l-114.9 90.3L13.8 49h228.6zm-71.3 71.4l72.2 68.3-8.2 8.7-73.5-69.5-34 26.8-34.1-27.1-73.1 69.6-8.3-8.7L83.9 120 8 59.6V207h240V59.9l-76.9 60.5z"
      />
    </svg>
  );
}

export default IconMail;
