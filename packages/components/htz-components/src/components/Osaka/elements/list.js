/* globals OBR */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import Article from './article';
import Link from '../../Link/Link';
import StyledGrid from '../../Grid/Grid';
import StyledGridItem from '../../Grid/GridItem';

const propTypes = {
  /**
   * An array of articles to display.
   */
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Is the the list of outbrain content.
   */
  outbrain: PropTypes.bool,
  /**
   * Is the the list of promoted content.
   */
  promoted: PropTypes.bool,
  /**
   * The app's theme (get imported automatically with the `withTheme` method).
   */
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  outbrain: false,
  promoted: false,
};

const promotedStyle = ({ outbrain, theme, }) => ({
  ...theme.type(-4),
  color: theme.color('neutral', '-3'),
  marginBottom: '0.25rem',
  marginStart: '1rem',
  marginTop: '1rem',
  position: 'relative',
  ...(outbrain && {
    paddingStart: '2rem',
    ':after': {
      background:
        'url(//widgets.outbrain.com/images/widgetIcons/ob_logo_16x16.png) no-repeat center top',
      backgroundSize: '100% 200%',
      content: '""',
      height: '1.75rem',
      position: 'absolute',
      right: '0',
      bottom: '50%',
      transform: 'translateY(50%)',
      width: '1.75rem',
    },
    ':hover': {
      color: theme.color('neutral'),
      textDecoration: 'underline',
      lineSkip: 'ink',
      ':after': {
        backgroundPosition: 'center bottom',
      },
    },
  }),
});
const Promoted = createComponent(promotedStyle, 'p');

function List({ articles, promoted, outbrain, theme, }) {
  return (
    <StyledGrid gutter={0}>
      {articles.map((article, i) => (
        <StyledGridItem key={article.title} width={1 / articles.length}>
          <Link href={article.url} content={<Article {...article} />} />
        </StyledGridItem>
      ))}
      {promoted && <Promoted>{theme.osakaI18n.promotedContent}</Promoted>}
      {outbrain && (
        <a
          href="#"
          onMouseDown={event => {
            // eslint-disable-next-line no-param-reassign
            event && event.cancelBubble && (event.cancelBubble = true);
            event && event.stopPropagation && event.stopPropagation();
            return true;
          }}
          onClick={() => {
            OBR.extern.callWhatIs(
              'https://www.outbrain.com/what-is/default/he',
              '',
              -1,
              -1,
              true,
              null
            );
            return false;
          }}
        >
          <Promoted outbrain>Recommended by</Promoted>
        </a>
      )}
    </StyledGrid>
  );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default withTheme(List);
