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

const IconLevels = createComponent(iconStyle, UnstyledIconLevels, [
  'attrs',
  'onClick',
]);

IconLevels.propTypes = iconPropTypes;
IconLevels.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconLevels.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconLevels.defaultProps = {
  attrs: null,
};

function UnstyledIconLevels({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M64 235c-12.4 0-22.5-10.1-22.5-22.5v-40c0-12.4 10.1-22.5 22.5-22.5s22.5 10.1 22.5 22.5v40c0 12.4-10.1 22.5-22.5 22.5zm84.5-22.5v-104c0-12.4-10.1-22.5-22.5-22.5s-22.5 10.1-22.5 22.5v104c0 12.4 10.1 22.5 22.5 22.5s22.5-10.1 22.5-22.5zm66 0v-169c0-12.4-10.1-22.5-22.5-22.5s-22.5 10.1-22.5 22.5v169c0 12.4 10.1 22.5 22.5 22.5s22.5-10.1 22.5-22.5z"
      />
    </svg>
  );
}

export default IconLevels;
