import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import Section from '../AutoLevels/Section';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const propTypes = {
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
  /** The HTML tag a `<LayoutRow />` will be rendered as */
  tagName: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const defaultProps = {
  attrs: null,
  bgc: null,
  children: null,
  tagName: 'section',
  miscStyles: null,
};

export function LayoutRow({ attrs, children, tagName, miscStyles, bgc, }) {
  return (
    <FelaComponent
      style={theme => ({
        backgroundColor: bgc || theme.color('primary', '-6'),
        width: '100%',
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render={({ className, }) => (
        <Section tagName={tagName} className={className} {...attrs}>
          {children}
        </Section>
      )}
    />
  );
}

LayoutRow.propTypes = propTypes;
LayoutRow.defaultProps = defaultProps;

export default LayoutRow;
