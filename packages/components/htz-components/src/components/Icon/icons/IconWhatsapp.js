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

const IconWhatsapp = createComponent(iconStyle, UnstyledIconWhatsapp, [
  'attrs',
  'onClick',
]);

IconWhatsapp.propTypes = iconPropTypes;
IconWhatsapp.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconWhatsapp.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconWhatsapp.defaultProps = {
  attrs: null,
};

function UnstyledIconWhatsapp({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M231.1 64.3c-27-44.1-78.7-66-128.6-54.1C61.6 20 32.7 44.7 17.4 84.3c-13.6 35.1-10.3 69.4 7.8 102.3.7 1.2.9 3.2.5 4.5-4.4 13.6-20 54.5-22.7 61.9 2.3-.8 45.4-13.8 65.8-20.3 1.2-.4 2.9-.4 4 .2 12.1 6.3 24.9 10.6 38.4 12.6 20.8 3.1 41.2 1.3 60.7-6.7 42-17.3 67.7-48.5 75.3-93.9 4.9-28.8-.9-55.8-16.1-80.6zm-85.9 115.4c-15-4.9-28.8-11.7-40.3-22.7-12.4-11.9-23.3-24.9-30.4-40.7-5.6-12.6-5.4-25.1 3.2-36.5 3.6-4.8 7.2-6.8 14.6-7.5 5.6-.6 7.9 2.4 9.7 7.1 2.4 6.4 5 12.7 7.9 18.9 1.5 3.2 1.1 6-.8 8.7-1.9 2.6-3.9 5.2-6.1 7.6-2.1 2.2-2.1 4.3-.6 6.7 8.9 14.6 20.6 25.8 36.3 32.7 7.3 3.2 7.3 3.3 12.4-2.8 2.1-2.6 4.2-5.2 6.2-7.9 1.8-2.3 3.9-2.9 6.5-1.7 7.8 3.7 15.7 7.5 23.5 11.2 2 .9 2.7 2.4 2.8 4.6.1 12.2-8.3 22.1-20.4 25-8.8 2-16.6-.1-24.5-2.7z"
      />
    </svg>
  );
}

export default IconWhatsapp;
