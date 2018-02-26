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

const IconPrint = createComponent(iconStyle, UnstyledIconPrint, [
  'attrs',
  'onClick',
]);

IconPrint.propTypes = iconPropTypes;
IconPrint.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconPrint.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconPrint.defaultProps = {
  attrs: null,
};

function UnstyledIconPrint({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M236.1 89H215V43.4L179.8 14h-123C47.5 14 40 21.5 40 30.8V89H19.9C13.4 89 8 94.4 8 100.9v92.2c0 6.5 5.4 11.9 11.9 11.9H39v20.6c0 9.1 7.3 16.4 16.4 16.4h144.2c9.1 0 16.4-7.3 16.4-16.4V205h20.1c6.5 0 11.9-5.4 11.9-11.9v-92.2c0-6.5-5.4-11.9-11.9-11.9zM56.9 24h119.2L205 48.1V89H50V30.9c0-3.8 3.1-6.9 6.9-6.9zm142.6 208h-144c-3.6 0-6.5-2.9-6.5-6.5V177h157v48.5c0 3.6-2.9 6.5-6.5 6.5zm9.8-100c-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9 8.9 4 8.9 8.9-3.9 8.9-8.9 8.9z"
      />
    </svg>
  );
}

export default IconPrint;
