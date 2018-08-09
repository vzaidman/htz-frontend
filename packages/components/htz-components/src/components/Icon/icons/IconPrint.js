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

const IconPrint = ({ size, fill, color, attrs, miscStyles, ...props }) => (
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
          d="M219.9 89.5H202V55.6l-30-25.1H67.3c-7.9 0-14.3 6.4-14.3 14.3v44.7H36.1c-5.6 0-10.1 4.6-10.1 10.1v77.7c0 5.6 4.6 10.1 10.1 10.1H52v18c0 7.7 6.3 14 14 14h123c7.7 0 14-6.3 14-14v-18h16.9c5.6 0 10.1-4.6 10.1-10.1V99.6c0-5.5-4.6-10.1-10.1-10.1zm-152.1-51h101.6L194 59.3v30.2H62V44.3c0-3.2 2.6-5.8 5.8-5.8zm121.7 172h-123c-3.1 0-5.5-2.5-5.5-5.5v-41.5h134V205c0 3-2.5 5.5-5.5 5.5zm7.6-85.1c-4.2 0-7.6-3.4-7.6-7.6 0-4.2 3.4-7.6 7.6-7.6 4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6z"
        />
      </svg>
    )}
  />
);

IconPrint.propTypes = iconPropTypes;
IconPrint.defaultProps = iconDefaultProps;

export default IconPrint;
