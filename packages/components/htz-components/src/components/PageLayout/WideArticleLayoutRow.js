import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderTop, parseStyleProps, } from '@haaretz/htz-css-tools';
import Section from '../AutoLevels/Section';
import { stylesPropType, } from '../../propTypes/stylesPropType';

const WideArticleLayoutRow = ({ children, hideDivider, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      marginTop: '3rem',
      extend: [
        borderTop('2px', 2, 'solid', hideDivider ? 'transparent' : theme.color('primary')),
        theme.mq(
          { from: 'l', until: 'xl', },
          {
            paddingInlineStart: `${theme.layoutStyle.startColumnPadding}rem`,
          }
        ),
        theme.mq(
          { from: 'xl', },
          {
            paddingInlineStart: `${theme.layoutStyle.startColumnPaddingXL}rem`,
          }
        ),
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    })}
    render={({ className, }) => (
      <Section className={className}>
        {children}
      </Section>
    )}
  />
);

WideArticleLayoutRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  hideDivider: PropTypes.bool,
  miscStyles: stylesPropType,
};

WideArticleLayoutRow.defaultProps = {
  hideDivider: false,
  miscStyles: null,
};

export default WideArticleLayoutRow;
