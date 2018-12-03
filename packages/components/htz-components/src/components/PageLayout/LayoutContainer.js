import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

LayoutContainer.propTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /**
   * backgroundColor that will trump the default backgroundColor defined in the theme
   */
  bgc: PropTypes.string,
  /** The Children to be rendered inside a `<LayoutContainer>` */
  children: PropTypes.node,
  /** The HTML tag a `<LayoutContainer />` will be rendered as */
  tagName: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

LayoutContainer.defaultProps = {
  attrs: null,
  bgc: null,
  children: null,
  tagName: 'div',
  miscStyles: null,
};

const styles = ({ bgc, miscStyles, theme, }) => ({
  backgroundColor: bgc || theme.color('layout', 'containerBg'),
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
  extend: [
    parseComponentProp(
      'maxWidth',
      [
        { from: 's', until: 'm', value: 100, },
        { from: 'm', until: 'l', value: 768 / 6, },
        { from: 'l', until: 'xl', value: 1024 / 6, },
        { from: 'xl', value: (1280 - 17) / 7, },
      ],
      theme.mq
    ),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

export default function LayoutContainer({
  attrs,
  bgc,
  children,
  miscStyles,
  tagName,
}) {
  const Tag = tagName;
  return (
    <FelaComponent
      rule={styles}
      bgc={bgc}
      miscStyles={miscStyles}
      render={({ className, }) => (
        <Tag {...attrs} className={className}>
          {children}
        </Tag>
      )}
    />
  );
}
