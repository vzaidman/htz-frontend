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

const IconZoomOut = createComponent(iconStyle, UnstyledIconZoomOut, [
  'attrs',
  'onClick',
]);

IconZoomOut.propTypes = iconPropTypes;
IconZoomOut.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconZoomOut.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconZoomOut.defaultProps = {
  attrs: null,
};

function UnstyledIconZoomOut({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M237.8 219.8l-66-66.1c10-13.8 15.9-30.8 15.9-49.2 0-46.3-37.7-84-83.9-84s-83.9 37.7-83.9 84 37.7 84 83.9 84c18.8 0 36.2-6.2 50.2-16.7l65.9 66 17.9-18zm-134-52.2c-34.8 0-63.1-28.3-63.1-63.1S69 41.3 103.8 41.3s63.1 28.3 63.1 63.1-28.4 63.2-63.1 63.2zM150 96v18H59V96h91z"
      />
    </svg>
  );
}

export default IconZoomOut;
