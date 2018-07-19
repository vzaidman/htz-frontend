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

const IconDrive = createComponent(iconStyle, UnstyledIconDrive, [
  'attrs',
  'onClick',
]);

IconDrive.propTypes = iconPropTypes;
IconDrive.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconDrive.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconDrive.defaultProps = {
  attrs: null,
};

function UnstyledIconDrive({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M96 35h70.7l68.1 115h-70.7L96 35zM64.7 218h134.6l36-60H99.9l-35.2 60zm-44-63.4l35.9 58.9L124 99.1 89 40.2 20.7 154.6z"
      />
    </svg>
  );
}

export default IconDrive;
