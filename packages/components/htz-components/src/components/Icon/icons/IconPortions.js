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

const IconPortions = createComponent(iconStyle, UnstyledIconPortions, [
  'attrs',
  'onClick',
]);

IconPortions.propTypes = iconPropTypes;
IconPortions.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconPortions.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconPortions.defaultProps = {
  attrs: null,
};

function UnstyledIconPortions({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M106.2 112.7c0 10.3-.3 20.1.1 29.9.7 23.4 1.7 46.9 2.6 70.3.3 6.8.4 13.5.8 20.3.4 8.4-5.2 14.8-13.2 14.8-8 .1-14.1-6.3-13.7-14.7.5-13.9 1.1-27.7 1.6-41.6.9-25.2 1.8-50.5 2.8-75.7.1-2.4-.6-3.3-2.8-4-15.4-5.3-25.2-20.6-24.2-36.8 1.2-19.6 2.1-39.2 3.1-58.8.3-5.6 2.6-8.3 7.3-8.2 4.5.1 6.7 3.4 6.7 8.9V69c0 4.8 2.2 7.1 5.9 7.1S89 73.5 89 69c0-17.4-.2-37.1 0-54.5 0-2.2 1.4-6.5 6.5-6.5 4.2 0 7.8 3.3 7.8 6.5V69c0 4.6 1.7 7.1 5.4 7.1 3.6 0 6.3-2.5 6.3-7.1 0-17.4-.1-35.7 0-53.2 0-2.7 0-4.6 2.3-6.3 4.4-3.3 10.7-.7 11.2 4.9.8 9.8 1.3 19.6 1.8 29.4.6 10.2 1.2 20.5 1.6 30.8.7 18.9-8.2 31.9-25.7 38.1zm80.5 15.3c-6.4 3.8-8.9 9.3-8.3 16.5.9 10.6 2 21.1 2.9 31.7 1.7 18.1 3.5 36.2 5 54.3 1 11.8-10.7 20.2-21.9 16.6-7.5-2.4-11-8.4-11-18V8.1c5.2.4 8.8 3.4 11.2 7.2 4 6.5 8 13.1 10.9 20.1 9.7 23.7 15.2 48.6 19.9 73.6 1.6 8.8-1 14.4-8.7 19z"
      />
    </svg>
  );
}

export default IconPortions;
