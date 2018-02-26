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

const IconComment = createComponent(iconStyle, UnstyledIconComment, [
  'attrs',
  'onClick',
]);

IconComment.propTypes = iconPropTypes;
IconComment.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconComment.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconComment.defaultProps = {
  attrs: null,
};

function UnstyledIconComment({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path fill="currentColor" d="M250 181h-57v59l-70-59H10V19h240v162z" />
    </svg>
  );
}

export default IconComment;
