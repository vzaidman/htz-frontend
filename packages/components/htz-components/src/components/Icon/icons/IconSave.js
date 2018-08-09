/** ************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change this Icon component , it is generated
 * from the `iconTamplate.js` file the parent directory.
 * *************************************************************** */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import iconStyle from '../iconStyle';
import { iconPropTypes, iconDefaultProps, } from '../iconPropTypes';

const IconSave = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
        className={className}
        {...props}
        {...attrs}
      >
        {' '}
        <path
          fill="currentColor"
          d="M183 31H31v194h194V64.5L183 31zM72 33h98v71H72V33zm131 166.1c0 6-4.9 10.9-10.9 10.9H63.9c-6 0-10.9-4.9-10.9-10.9v-66.2c0-6 4.9-10.9 10.9-10.9h128.2c6 0 10.9 4.9 10.9 10.9v66.2zM130 42h24v48h-24V42z"
        />
      </svg>
    )}
  />
);

IconSave.propTypes = iconPropTypes;
IconSave.defaultProps = iconDefaultProps;

export default IconSave;
