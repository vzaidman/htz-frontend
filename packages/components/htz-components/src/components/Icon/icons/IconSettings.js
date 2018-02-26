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

const IconSettings = createComponent(iconStyle, UnstyledIconSettings, [
  'attrs',
  'onClick',
]);

IconSettings.propTypes = iconPropTypes;
IconSettings.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconSettings.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconSettings.defaultProps = {
  attrs: null,
};

function UnstyledIconSettings({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M247 144.1v-32.7l-33.8-11.7c-1.2-3.7-2.6-7.2-4.2-10.6l14.4-34.7-23.1-23.1L167.8 47c-3.3-1.6-6.6-3.1-10.1-4.3L143.4 8h-32.7L98.8 42.2c-3.3 1.1-6.6 2.5-9.8 3.9l-33.9-14L32 55.3l15.3 31.5c-2 4-3.8 8.1-5.2 12.4L9 112.9v32.7l33.6 11.6c1.2 3.5 2.6 6.9 4.3 10.1l-14.2 34.3 23.1 23.1 32.9-16c3.2 1.5 6.5 2.9 9.9 4l14.6 35.2h32.7l12.4-35.8c3.1-1.1 6.2-2.4 9.2-3.9l34 14.1 23.1-23.1-15.8-32.5c1.3-2.6 2.4-5.4 3.4-8.1l34.8-14.5zm-119.5 36c-28.6 0-51.8-23.2-51.8-51.8 0-28.6 23.2-51.8 51.8-51.8s51.8 23.2 51.8 51.8c0 28.6-23.2 51.8-51.8 51.8z"
      />
    </svg>
  );
}

export default IconSettings;
