import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import ArticleLink from './articleLink';
import EventTracker from '../../utils/EventTracker';

const propTypes = {
  /**
   * An array of article objects.
   */
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Article title to display.
       */
      title: PropTypes.string.isRequired,
      /**
       * Article's destination.
       */
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Should be passed if the component should have a MarginBottom style.
   */
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const defaultProps = {
  miscStyles: null,
};

const articleWrapperStyle = ({ theme, lastItem, }) => ({
  paddingInlineStart: '1em',
  position: 'relative',
  display: 'flex',
  alignItems: 'baseline',
  color: theme.color('primary', '+1'),
  ...(!lastItem
    ? {
      ...parseComponentProp(
        'marginBottom',
        theme.articleStyle.relatedArticlesLink.marginBottom,
        theme.mq,
        (prop, value) => ({ [prop]: value, })
      ),
    }
    : {}),
  ':before': {
    marginInlineStart: '-1em',
    marginInlineEnd: '0.5em',
    transform: 'translateY(-50%)',
    display: 'inline-block',
    content: '""',
    borderRadius: '50%',
    height: '1rem',
    width: '1rem',
    backgroundColor: theme.color('primary', '+1'),
  },
});

const RelatedArticles = ({ articles, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      extend: [
        parseComponentProp('marginBottom', '5rem', theme.mq),
        parseComponentProp('marginTop', '5rem', theme.mq),
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    })}
    render="ul"
  >
    {articles.map((article, i) => (
      <EventTracker>
        {({ biAction, }) => (
          <FelaComponent
            rule={articleWrapperStyle}
            key={article.contentId}
            lastItem={i === articles.length - 1}
            render={({ className, theme, }) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <li // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
                className={className}
                onClick={() => {
                  biAction({
                    actionCode: 109,
                    additionalInfo: {
                      ArticleId: article.contentId,
                      NoInList: i + 1,
                      ViewName: 'Related article',
                    },
                  });
                }}
              >
                <ArticleLink article={article} />
              </li>
            )}
          />
        )}
      </EventTracker>
    ))}
  </FelaComponent>
);

RelatedArticles.propTypes = propTypes;
RelatedArticles.defaultProps = defaultProps;

export default RelatedArticles;
