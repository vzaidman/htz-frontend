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

const IconFacebook = createComponent(iconStyle, UnstyledIconFacebook, [
  'attrs',
  'onClick',
]);

IconFacebook.propTypes = iconPropTypes;
IconFacebook.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconFacebook.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconFacebook.defaultProps = {
  attrs: null,
};

function UnstyledIconFacebook({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M94 248V137H69V92h25V63c0-21.4 10.3-55 54.1-55H187v44h-28.3c-4.6 0-12.7 3.2-12.7 13v27h43l-4.2 45H146v111H94z"
      />
    </svg>
  );
}

export default IconFacebook;
