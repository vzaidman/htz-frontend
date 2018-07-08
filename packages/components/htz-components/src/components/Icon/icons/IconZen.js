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

const IconZen = createComponent(iconStyle, UnstyledIconZen, [
  'attrs',
  'onClick',
]);

IconZen.propTypes = iconPropTypes;
IconZen.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconZen.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconZen.defaultProps = {
  attrs: null,
};

function UnstyledIconZen({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M128 20C68.4 20 20 68.4 20 128s48.4 108 108 108 108-48.4 108-108S187.6 20 128 20zm15 169h-30V66h30v123z"
      />
    </svg>
  );
}

export default IconZen;
