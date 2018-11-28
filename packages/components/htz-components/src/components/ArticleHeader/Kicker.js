import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, parseTypographyProp, } from '@haaretz/htz-css-tools';
import { responsivePropBaseType, } from '../../propTypes/responsivePropBaseType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

Kicker.propTypes = {
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
  ]),
  /**
   * string to use as divider
   */
  divider: PropTypes.string,
  /**
   * Text of kicker
   */
  text: PropTypes.string,
  children: PropTypes.node,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  tagName: PropTypes.string,
};
Kicker.defaultProps = {
  text: null,
  fontSize: null,
  isBlock: false,
  miscStyles: null,
  tagName: 'span',
  divider: '|',
  children: null,
};

const style = ({ isBlock, fontSize, divider, miscStyles, theme, }) => ({
  display: isBlock ? 'block' : 'inline',
  backgroundColor: theme.color(
    'articleHeader',
    isBlock ? 'kickerBlockBg' : 'kickerInlineBg'
  ),
  color: theme.color(
    'articleHeader',
    isBlock ? 'kickerBlockText' : 'kickerInlineText'
  ),
  ...(!isBlock
    ? {
      ':after': {
        content: `"${divider}"`,
        paddingInlineStart: '1rem',
        paddingInlineEnd: '1rem',
      },
    }
    : {}),
  extend: [
    ...[ fontSize ? parseTypographyProp(fontSize, theme.type) : {}, ],
    ...(miscStyles ? parseStyleProps(miscStyles) : []),
  ],
});

export default function Kicker({
  isBlock,
  fontSize,
  text,
  divider,
  miscStyles,
  tagName,
  children,
}) {
  return (
    <FelaComponent
      rule={style}
      isBlock={isBlock}
      fontSize={fontSize}
      divider={divider}
      miscStyles={miscStyles}
      render={tagName}
    >
      {text || children}
    </FelaComponent>
  );
}
