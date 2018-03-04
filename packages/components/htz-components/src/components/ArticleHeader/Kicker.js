import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseStyleProps, parseTypographyProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const kickerPropTypes = {
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
      })
    ),
  ]).isRequired,
  /**
   * Text of kicker
   */
  text: PropTypes.string.isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};
const kickerDefaultProps = {
  isBlock: false,
  miscStyles: null,
};

const styleKicker = ({ isBlock, fontSize, miscStyles, theme, }) => {
  const kickerTheme = isBlock
    ? theme.articleStyle.header.blockKicker
    : theme.articleStyle.header.inlineKicker;

  const style = {
    backgroundColor: kickerTheme.backgroundColor,
    color: kickerTheme.color,
    extend: [
      parseTypographyProp(fontSize, theme.type),
      ...(miscStyles ? parseStyleProps(miscStyles) : []),
    ],
  };

  if (!isBlock) {
    style[':after'] = {
      content: `'${kickerTheme.separator}'`,
      paddingInlineStart: '1rem',
    };
  }

  return style;
};

// eslint-disable-next-line react/prop-types
function KickerComponent({ isBlock, className, text, }) {
  const KickerTag = isBlock ? 'div' : 'span';
  return <KickerTag className={className}>{text}</KickerTag>;
}

const KickerStyled = createComponent(styleKicker, KickerComponent, props =>
  Object.keys(props)
);

function Kicker({ isBlock, fontSize, text, miscStyles, }) {
  return (
    <KickerStyled
      isBlock={isBlock}
      fontSize={fontSize}
      text={text}
      miscStyles={miscStyles}
    />
  );
}

Kicker.propTypes = kickerPropTypes;
Kicker.defaultProps = kickerDefaultProps;
export default Kicker;
