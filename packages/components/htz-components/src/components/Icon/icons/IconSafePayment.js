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

const IconSafePayment = createComponent(iconStyle, UnstyledIconSafePayment, [
  'attrs',
  'onClick',
]);

IconSafePayment.propTypes = iconPropTypes;
IconSafePayment.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconSafePayment.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconSafePayment.defaultProps = {
  attrs: null,
};

function UnstyledIconSafePayment({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M28 127h53v4H28v-4zm0 14h92v4H28v-4zm180-70.8c0-7.8-6.4-14.2-14.2-14.2H22.2C14.3 56 8 62.3 8 70.2v105.7c0 7.8 6.3 14.2 14.2 14.2H172v-6H21.4c-4.6 0-8.4-3.8-8.4-8.4V112h166.8c5.6-7.1 13.6-12.2 22.9-14.4 1.6-.4 3.5-.7 5.3-.9V70.2zm-195 12V70.4c0-4.6 3.8-8.4 8.4-8.4h172.3c4.6 0 8.4 3.8 8.4 8.4V82H13v.2zM245.6 145H241v-10.7c0-13.4-10.9-24.3-24.3-24.3h-3.3c-13.4 0-24.3 10.9-24.3 24.3V145h-4.6c-1.3 0-2.4 1.1-2.4 2.4v51.3c0 1.3 1.1 2.4 2.4 2.4h61.3c1.3 0 2.4-1.1 2.4-2.4v-51.3c-.2-1.3-1.3-2.4-2.6-2.4zM199 134.3c0-7.8 6.1-14.3 13.8-14.3h3.4c7.5 0 13.8 6.3 13.8 14.3V145h-31v-10.7zm12.3 55.2l-13.1-14.4 6-5.5 6.9 7.6 16.4-19.3 6.2 5.3-22.4 26.3z"
      />
    </svg>
  );
}

export default IconSafePayment;
