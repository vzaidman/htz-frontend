/* noOverWrite */
/** *************************************************************** *
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
    <svg
      width="1.07421875em"
      height="1em"
      viewBox="0 0 275 256"
      {...props}
      {...attrs}
    >
      <path
        fill="#2F872A"
        d="M211 93.7c-30.6 0-55.4 24.9-55.4 55.4 0 30.6 24.9 55.4 55.4 55.4 30.6 0 55.4-24.9 55.4-55.4.1-30.5-24.8-55.4-55.4-55.4zm0 103.9c-26.7 0-48.4-21.7-48.4-48.4s21.7-48.4 48.4-48.4 48.4 21.7 48.4 48.4c.1 26.7-21.7 48.4-48.4 48.4zm-6.2-20.6l-23.1-25.4 10.6-9.7 12.2 13.4 28.9-34 10.9 9.3-39.5 46.4z"
      />
      <path
        fill="currentColor"
        d="M159 184.1H21.4c-4.6 0-8.4-3.8-8.4-8.4V112h147.6c10.9-14.7 28-24.5 47.4-25.5V70.2c0-7.8-6.4-14.2-14.2-14.2H22.2C14.3 56 8 62.3 8 70.2v105.7c0 7.8 6.3 14.2 14.2 14.2h141.4c-1.6-1.9-3.2-3.9-4.6-6zM13 70.4c0-4.6 3.8-8.4 8.4-8.4h172.3c4.6 0 8.4 3.8 8.4 8.4V82H13V70.4zM28 141h92v4H28v-4zm53-14v4H28v-4h53z"
      />
    </svg>
  );
}

export default IconSafePayment;
