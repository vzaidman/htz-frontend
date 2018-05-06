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

const IconMarkerLogoTransparent = createComponent(
  iconStyle,
  UnstyledIconMarkerLogoTransparent,
  [ 'attrs', 'onClick', ]
);

IconMarkerLogoTransparent.propTypes = iconPropTypes;
IconMarkerLogoTransparent.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconMarkerLogoTransparent.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconMarkerLogoTransparent.defaultProps = {
  attrs: null,
};

function UnstyledIconMarkerLogoTransparent({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M128 8a120 120 0 1 0 0 240 120 120 0 0 0 0-240zm63 173h-29v-77l-20 77h-28l-19-77v77H66V75h48l14 60 14-60h49v106z"
      />
    </svg>
  );
}

export default IconMarkerLogoTransparent;
