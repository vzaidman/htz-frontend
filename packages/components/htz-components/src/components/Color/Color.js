import React from 'react';
import PropTypes from 'prop-types';
import {createComponent,} from 'react-fela';
import {parseStyleProps,} from '@haaretz/htz-css-tools';
import {responsivePropBaseType,} from '../../propTypes/responsivePropBaseType';
import {stylesPropType,} from '../../propTypes/stylesPropType';


const colorShape = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.string),
]);

const colorAttrPropType = PropTypes.oneOfType(
  [
    colorShape,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: colorShape,
      })
    ),
  ]
);

const colorPropTypes = {
  /**
   * Fore-ground color-name or [ color-name, tint ] value, according to [color pallete](https://haaretz.github.io/htz-frontend/docs/htz-theme//#color-palette)
   */
  color: colorAttrPropType.isRequired,
  /**
   * Back-ground color-name or [ color-name, tint ] value, according to [color pallete](https://haaretz.github.io/htz-frontend/docs/htz-theme//#color-palette)
   */
  bgColor: colorAttrPropType,
  /**
   * HTML tag-name to render
   */
  tagName: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,

};

const colorDefaultProps = {
  bgColor: null,
  tagName: 'span',
};

const styleColor = ({ color, bgColor, miscStyles, theme, }) => {
  const style = {
    color: theme.color(...(typeof color === 'string' ? [color,] : color)),
    extend: [
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  }

  if (bgColor) {
    style.backgroundColor =
      theme.color(...(typeof bgColor === 'string' ? [ bgColor, ] : bgColor));
  }

  return style;
};

function ColorComponent({ tagName, className, children, }) {
  const TagName = tagName;
  return (
    <TagName className={className}>
      {children}
    </TagName>
  );
}

const ColorStyled = createComponent(styleColor, ColorComponent, [ 'tagName', 'children', ]);

function Color({ color, bgColor, tagName, children, miscStyles, }) {
  return (
    <ColorStyled color={color} bgColor={bgColor} tagName={tagName} miscStyles={miscStyles}>
      {children}
    </ColorStyled>
  );
}
Color.propTypes = colorPropTypes;
Color.defaultProps = colorDefaultProps;
export default Color;
