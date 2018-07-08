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

const IconStar = createComponent(iconStyle, UnstyledIconStar, [
  'attrs',
  'onClick',
]);

IconStar.propTypes = iconPropTypes;
IconStar.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconStar.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconStar.defaultProps = {
  attrs: null,
};

function UnstyledIconStar({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M128.9 203.6l-60.4 33.2c-1.1.6-2.2 1-3.1 1.3-.8.3-1.6.5-2.2.5-2.4 0-4-.8-4.8-2.6-.8-1.8-1.1-4.2-.8-7.4l11.9-70.5-49.1-49.9c-2.9-3.2-4.1-6-3.3-8.6.8-2.4 3.1-4 7.3-4.6l67.8-10.5 30.1-64.4c.8-1.8 1.9-3.1 3.1-4.1 1.1-1 2.5-1 3.6-1"
      />{' '}
      <path
        fill="currentColor"
        d="M128 204l61.3 32.9c1.2.6 2.3 1 3.1 1.3.8.3 1.8.5 2.6.5 2 0 3.5-.8 4.3-2.6.8-1.8 1.1-4.2.8-7.4l-11.9-70.4 49.1-49.9c2.9-3.2 4.1-6.1 3.3-8.6-.8-2.4-3.2-4-7.3-4.6l-67.9-10.5-30.1-64.4c-.9-1.7-2-3.1-3.1-4.1-1.1-1-3.2-1-4.4-1"
      />
    </svg>
  );
}

export default IconStar;
