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
        d="M128 8C61.7 8 8 61.7 8 128s53.7 120 120 120 120-53.7 120-120S194.3 8 128 8zm17 188h-34V60h34v136z"
      />
    </svg>
  );
}

export default IconZen;
