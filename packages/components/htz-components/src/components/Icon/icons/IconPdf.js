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

const IconPdf = createComponent(iconStyle, UnstyledIconPdf, [
  'attrs',
  'onClick',
]);

IconPdf.propTypes = iconPropTypes;
IconPdf.defaultProps = iconDefaultProps;

// Underlying component
UnstyledIconPdf.propTypes = {
  attrs: attrsPropType,
};

UnstyledIconPdf.defaultProps = {
  attrs: null,
};

function UnstyledIconPdf({ attrs, ...props }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props} {...attrs}>
      {' '}
      <path
        d="M157 33H67v74h10V43h70v42h46v121H77v-9H67v19h136V75l-46-42zm0 42V47.4L187.2 75H157zm-47.9 72.5c.3 1.3.5 2.8.5 4.5 0 1.8-.2 3.3-.7 4.6-.5 1.2-1.1 2.3-1.8 3-.8.8-1.6 1.3-2.6 1.7-1 .3-2 .5-3 .5h-6.4v-20.6h5.1c1.8 0 3.3.3 4.5.8 1.2.5 2.2 1.2 2.9 2.2.7.8 1.2 1.9 1.5 3.3zm-35.4-4.4c.3.6.5 1.5.5 2.5s-.2 1.9-.5 2.5c-.4.6-.8 1.1-1.4 1.5-.6.4-1.2.6-2 .7-.8.1-1.6.2-2.4.2h-5.6v-9.8h5.6c.8 0 1.6.1 2.4.2.8.1 1.4.4 2 .7.6.3 1 .8 1.4 1.5zM43 121v62h113v-62H43zm37.5 28.4c-.4 1.3-1.1 2.4-2 3.4-.9 1-2.1 1.8-3.5 2.4-1.4.6-3.2.9-5.2.9h-7.5v11.7h-7.2v-32.6h14.7c2 0 3.8.3 5.2.9 1.4.6 2.6 1.4 3.5 2.4.9 1 1.6 2.1 2 3.3.4 1.2.6 2.5.6 3.9.1 1.2-.2 2.5-.6 3.7zm35.4 8.4c-.6 2-1.5 3.7-2.8 5.2-1.2 1.5-2.8 2.6-4.6 3.4-1.8.8-4 1.3-6.5 1.3H87.9v-32.6H102c2.1 0 4.1.3 5.9 1 1.8.7 3.4 1.7 4.7 3 1.3 1.3 2.4 3 3.1 5 .7 2 1.1 4.4 1.1 7.1 0 2.4-.3 4.6-.9 6.6zm31.1-16.7h-15.8v7.5h13.7v5.6h-13.7v13.5H124v-32.6h23v6z"
        fill="#e22134"
      />
    </svg>
  );
}

export default IconPdf;
