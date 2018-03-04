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
        d="M249 142H143v106h-28V142H9v-28h106V8h28v106h106v28z"
      />
    </svg>
  );
}

export default IconPlus;
