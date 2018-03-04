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

const IconDislike = createComponent(iconStyle, UnstyledIconDislike, [
  'attrs',
  'onClick',
]);

IconDislike.propTypes = iconPropTypes;
IconDislike.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconDislike.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconDislike.defaultProps = {
  attrs: null,
};

function UnstyledIconDislike({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M184 72h48v113h-48V72zM42.9 184H85c0 .1-.1.1-.1.2-9.6 18.5-11.7 27.5-11.4 42.8.4 15 14.3 28 25 28 8.8 0 12.9-8.9 14.8-13.8 5.9-14.9 9.5-28.6 30-56 .6-.8 1.6-1.3 2.6-1.3 11.6 0 21-9.4 21-21V92c0-11.6-9.4-21-21-21H72c-9.8 0-12.9 6.6-17.8 17.8 0 0-25.9 55.7-29.6 76.1-1.7 9.6 8.4 19.1 18.3 19.1z"
      />
    </svg>
  );
}

export default IconDislike;
