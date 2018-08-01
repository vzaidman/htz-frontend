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

const IconPlus = createComponent(iconStyle, UnstyledIconPlus, [
  'attrs',
  'onClick',
]);

IconPlus.propTypes = iconPropTypes;
IconPlus.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconPlus.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconPlus.defaultProps = {
  attrs: null,
};

function UnstyledIconPlus({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M228 141h-87v87h-23v-87H28v-24h89V28h24v89h87v24z"
      />
    </svg>
  );
}

export default IconPlus;
