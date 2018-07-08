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

const IconSave = createComponent(iconStyle, UnstyledIconSave, [
  'attrs',
  'onClick',
]);

IconSave.propTypes = iconPropTypes;
IconSave.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconSave.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconSave.defaultProps = {
  attrs: null,
};

function UnstyledIconSave({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M183 31H31v194h194V64.5L183 31zM72 33h98v71H72V33zm131 166.1c0 6-4.9 10.9-10.9 10.9H63.9c-6 0-10.9-4.9-10.9-10.9v-66.2c0-6 4.9-10.9 10.9-10.9h128.2c6 0 10.9 4.9 10.9 10.9v66.2zM130 42h24v48h-24V42z"
      />
    </svg>
  );
}

export default IconSave;
