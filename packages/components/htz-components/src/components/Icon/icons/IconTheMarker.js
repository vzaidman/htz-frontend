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

const IconTheMarker = createComponent(iconStyle, UnstyledIconTheMarker, [
  'attrs',
  'onClick',
]);

IconTheMarker.propTypes = iconPropTypes;
IconTheMarker.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconTheMarker.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconTheMarker.defaultProps = {
  attrs: null,
};

function UnstyledIconTheMarker({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <circle fill="currentColor" cx={128} cy={128} r={120} />{' '}
      <path d="M191 181h-29v-77l-20 77h-28l-19-77v77H66V75h48l14 60 14-60h49v106z" />
    </svg>
  );
}

export default IconTheMarker;
