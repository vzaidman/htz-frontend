const template = (opts = {}) => (
  code,
  state
) => `/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change this Icon component , it is generated
 * from the \`iconTamplate.js\` file the parent directory.
 * *************************************************************** */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import iconStyle from '../iconStyle';
import { iconPropTypes, iconDefaultProps, } from '../iconPropTypes';

const ${
  state.componentName
} = ({ size, fill, color, attrs, miscStyles, ...props }) => (
  <FelaComponent
    size={size}
    fill={fill}
    color={color}
    attrs={attrs}
    miscStyles={miscStyles}
    rule={iconStyle}
    render={({ className, }) => (
      ${code
    .replace(
      /((?:.|[\n\r])*)((<svg )(width="1em" height="1em" )?((viewbox=")((?:\d+\.?\d*)+\s+(?:\d+\.?\d*)+\s+)(\d+\.?\d*)\s+(\d+\.?\d*)\s*")).*(>(?:.|[\n\r])*)/gim,
      (
        matches,
        pre,
        g2,
        svgTag,
        g4,
        viewBox,
        g6,
        g7,
        width,
        height,
        rest
      ) =>
        `${pre}${svgTag}width="${width /
              height}em" height="1em" ${viewBox} className={className} {...props} {...attrs} ${rest}`
    )
    .replace(/\r?\n|\r/gm, '')}
    )}
  />
);

${state.componentName}.propTypes = iconPropTypes;
${state.componentName}.defaultProps = iconDefaultProps;

export default ${state.componentName};
`;

module.exports = template;
