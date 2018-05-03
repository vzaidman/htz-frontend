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

const IconBundle = createComponent(iconStyle, UnstyledIconBundle, [
  'attrs',
  'onClick',
]);

IconBundle.propTypes = iconPropTypes;
IconBundle.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconBundle.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconBundle.defaultProps = {
  attrs: null,
};

function UnstyledIconBundle({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        fill="currentColor"
        d="M162 170H22.4c-.2 0-.4-.2-.4-.4V43.4c0-.2.2-.4.4-.4h178.2c.2 0 .4.2.4.4V84h-6V49H28v115h134v6zm0 9H21c-3.3 0-6-2.7-6-6V42c0-3.3 2.7-6 6-6h182c3.3 0 6 2.7 6 6v42h6V42c0-6.6-5.4-12-12-12H21c-6.6 0-12 5.4-12 12v131c0 6.6 5.4 12 12 12h141v-6zm74-82h-56c-3.3 0-6 2.7-6 6v119c0 3.3 2.7 6 6 6h56c3.3 0 6-2.7 6-6V103c0-3.3-2.7-6-6-6m0-6c6.6 0 12 5.4 12 12v119c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12V103c0-6.6 5.4-12 12-12h56zm-3 22h-49v97h49v-97m5.6-6c.2 0 .4.2.4.4v108.2c0 .2-.2.4-.4.4h-60.2c-.2 0-.4-.2-.4-.4V107.4c0-.2.2-.4.4-.4h60.2zM218 222c0-1.1-.9-2-2-2h-13c-1.1 0-2 .9-2 2s.9 2 2 2h13c1.1 0 2-.9 2-2zm-7-120v-1c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h1c1.1 0 2-.9 2-2zm13.3 19.1l-33.2 33.2 3.5 3.5 33.2-33.2-3.5-3.5zm-12.1 33.1l-21.1 21.1 3.5 3.5 21.1-21.1-3.5-3.5zM163 210c0-8.3-6.5-15-14.4-15H76.4c-7.9 0-14.4 6.7-14.4 15v6h6v-6c0-5 3.8-9 8.4-9h72.2c4.6 0 8.4 4 8.4 9v6h6v-6zm-73-25h-5v11h5v-11zm49 0h-5v11h5v-11z"
      />
    </svg>
  );
}

export default IconBundle;
