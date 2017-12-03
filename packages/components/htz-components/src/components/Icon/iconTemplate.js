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
import { createComponent, } from 'react-fela';
import iconStyle from '../iconStyle';
import { iconPropTypes, iconDefaultProps, } from '../iconPropTypes';
import { attrsPropType, } from '../../../propTypes/attrsPropType';

const ${state.componentName} = createComponent(
  iconStyle,
  Unstyled${state.componentName},
  [ 'attrs', 'onClick', ]
);

${state.componentName}.propTypes = iconPropTypes;
${state.componentName}.defaultProps = iconDefaultProps;


// Underlying component
Unstyled${state.componentName}.propTypes = {
  attrs: attrsPropType,
};

Unstyled${state.componentName}.defaultProps = {
  attrs: null,
};

function Unstyled${state.componentName}({ attrs, ...props }) {
  return (
    ${code
    .replace(
      /((?:.|[\n\r])*)((<svg )(width="1em" height="1em" )?((viewbox=")(\d+\s+\d+\s+)(\d+)\s+(\d+)\s*")).*(>(?:.|[\n\r])*)/gim,
      (matches, pre, g2, svgTag, g4, viewBox, g6, g7, width, height, rest) =>
        `${pre}${svgTag}width="${width / height}em" height="1em" ${
          viewBox
        } {...props} {...attrs} ${rest}`
    )
    .replace(/\r?\n|\r/gm, '')}
  );
}


export default ${state.componentName};
`;

module.exports = template;
