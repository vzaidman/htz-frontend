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

const IconFacebookLogo = createComponent(iconStyle, UnstyledIconFacebookLogo, [
  'attrs',
  'onClick',
]);

IconFacebookLogo.propTypes = iconPropTypes;
IconFacebookLogo.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconFacebookLogo.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconFacebookLogo.defaultProps = {
  attrs: null,
};

function UnstyledIconFacebookLogo({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M233.4 8H23.7C15.1 8 8 15.1 8 23.9v207.8c0 8.9 7.2 16.3 16 16.3h116v-94h-23v-36h23V91.9c0-17.3 6.9-43.9 42-43.9h31v35h-24c-3.8 0-8 2.9-8 11.2V118h32l-4 36h-28v94h54c6.8 0 13-4.6 13-11.5V22.8c0-8.1-6.6-14.8-14.6-14.8z"
      />
    </svg>
  );
}

export default IconFacebookLogo;
