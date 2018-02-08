import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseStyleProps, parseTypographyProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType'
import { stylesPropType, } from '../../propTypes/stylesPropType';

const titlePropTypes = {
  /**
   * Sets heading element to be _block_ or _inline_.(default is inline)
   */
  isBlock: PropTypes.bool,
  /**
   * Font-size configuration for the heading.<br/>
   * Can be an int, defined at: [theme typography](https://haaretz.github.io/htz-frontend/docs/htz-theme/#typographic-scale)
   * Or an array of responsive-prop-object.
   * ```js
   *  { from, until, value, }
   * ```
   */
  fontSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        ...responsivePropBaseType,
        value: PropTypes.number,
      })),
  ]).isRequired,
  /**
   * Heading level. The H<x> tag to create.
   */
  level: PropTypes.oneOf([ 1, 2, 3, 4, 5, 6, ]).isRequired,
  /**
   * Text of title
   */
  text: PropTypes.string.isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const titleDefaultProps = {
  isBlock: false,
  miscStyles: null,
};

/**
 * See Title.propTypes of details
 * @param {boolean} isBlock - Sets heading element to be _block_ or _inline_.(default is inline)
 * @param {number|Array} fontSize - Font-size configuration for the heading
 * @param {object} miscStyles - A special property holding miscellaneous CSS values
 * @param {object} theme - theme :-)
 */
const styleTitle = ({ isBlock, fontSize, miscStyles, theme, }) => ({
  display: isBlock ? 'block' : 'inline',
  extend: [
    parseTypographyProp(fontSize, theme.type),
    ...(miscStyles ? parseStyleProps(miscStyles) : []),
  ],
});

function TitleComponent({ level, className, text, }) {
  const HeadingTag = `h${level}`;
  return (
    <HeadingTag className={className}>
      {text}
    </HeadingTag>
  );
}

const TitleStyled = createComponent(styleTitle, TitleComponent, props => Object.keys(props));

function Title({ isBlock, fontSize, level, text, miscStyles, }) {
  return <TitleStyled isBlock={isBlock} fontSize={fontSize} level={level} text={text} miscStyles={miscStyles} />;
}

Title.propTypes = titlePropTypes;
Title.defaultProps = titleDefaultProps;
export default Title;
