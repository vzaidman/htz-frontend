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

const IconGPlus = createComponent(iconStyle, UnstyledIconGPlus, [
  'attrs',
  'onClick',
]);

IconGPlus.propTypes = iconPropTypes;
IconGPlus.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconGPlus.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconGPlus.defaultProps = {
  attrs: null,
};

function UnstyledIconGPlus({ attrs, ...props }) {
  return (
    <svg
      width="1.15234375em"
      height="1em"
      viewBox="0 0 295 256"
      {...props}
      {...attrs}
    >
      {' '}
      <path
        fill="currentColor"
        d="M260.5 139.2v29h-25v-29h-28v-25h28v-28h25v28h27v25h-27zm-68.2-24h-90.8v31h53c-7.9 39.5-61.2 53.4-89.8 27.6-29.4-22.6-28-72.3 2.6-93.3 21.3-17 51.7-12.8 73 1.9 8.4-7.7 16.2-16 23.8-24.6-17.8-14.1-39.5-24.2-62.7-23.1C53 33.1 8.6 75.3 7.8 123.5c-3.1 39.4 22.7 78.5 59.6 91.9 36.6 13.3 83.5 4.2 106.8-28.3 15.1-20.9 18.1-47.4 18.1-71.9z"
      />
    </svg>
  );
}

export default IconGPlus;
