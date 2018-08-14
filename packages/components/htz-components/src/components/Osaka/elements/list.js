/* globals OBR */
import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { parseStyleProps, borderEnd, } from '@haaretz/htz-css-tools';
import Article from './article';
import { stylesPropType, } from '../../../propTypes/stylesPropType';
import HtzLink from '../../HtzLink/HtzLink';

const propTypes = {
  /**
   * An array of articles to display.
   */
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  /**
   * Is the the list of outbrain content.
   */
  outbrain: PropTypes.bool,
  /**
   * Is the the list of promoted content.
   */
  promoted: PropTypes.bool,
};

const defaultProps = {
  miscStyles: null,
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
  ...(outbrain
    ? {
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
    }
    : {}),
});
const Promoted = createComponent(promotedStyle, 'p');

function List({ articles, promoted, outbrain, miscStyles, }) {
  return (
    <FelaComponent
      style={{
        paddingTop: '1rem',
        paddingBottom: '1rem',
        display: 'flex',
        flexDirection: promoted || outbrain ? 'column' : 'row',
        extend: [ ...(miscStyles ? parseStyleProps(miscStyles) : []), ],
      }}
      render={({ className, theme, }) => (
        <div className={className}>
          {articles.map((article, i) => (
            <FelaComponent
              style={{
                width: `${100 / articles.length}%`,
                ...(promoted
                  ? borderEnd('1px', 'solid', theme.color('neutral', '-4'))
                  : {}),
              }}
              render={({ className: linkClass, }) => (
                <HtzLink
                  className={linkClass}
                  href={article.url}
                  content={<Article {...article} />}
                />
              )}
            />
          ))}
          {promoted ? (
            <Promoted>{theme.osakaI18n.promotedContent}</Promoted>
          ) : null}
          {outbrain ? (
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
          ) : null}
        </div>
      )}
    />
  );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
