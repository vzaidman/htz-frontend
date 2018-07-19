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
      <path
        fill="currentColor"
        d="M233 170h-50v46.3L121.6 170H24V40h209v130z"
      />
    </svg>
  );
}

export default IconComment;
