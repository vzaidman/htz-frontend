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

const IconMailAlert = createComponent(iconStyle, UnstyledIconMailAlert, [
  'attrs',
  'onClick',
]);

IconMailAlert.propTypes = iconPropTypes;
IconMailAlert.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconMailAlert.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconMailAlert.defaultProps = {
  attrs: null,
};

function UnstyledIconMailAlert({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M178 64l-80.9 72.9-80-72.9H178zm-50.1 58.1l50.9 55.2-5.8 7-51.8-56.2-24 21.6-24-21.9L21.7 184l-5.8-7 50.6-55.3L13 73v119h169V73.2l-54.1 48.9zM253 64h-71v9h71v-9zm-11 30h-60v9h60v-9zm-14 30h-46v9h46v-9zm-11 29h-35v9h35v-9zm-13 30h-22v9h22v-9z"
      />
    </svg>
  );
}

export default IconMailAlert;
