import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import Link from '../Link/Link';

const articleStyle = ({ theme, isBlock, }) =>
  (isBlock
    ? theme.articleStyle.linksBlockLink
    : theme.articleStyle.relatedArticlesLink);
const Article = createComponent(articleStyle, 'span');

const currentArticleStyle = ({ theme, }) =>
  theme.articleStyle.currentArticleInSeries;
const CurrentArticle = createComponent(currentArticleStyle, 'span');

const authorStyle = ({ theme, }) => ({
  fontWeight: '300',
  marginStart: '0.5rem',
  color: theme.color('neutral', '-2'),
});
const Author = createComponent(authorStyle, 'span');

ArticleLink.propTypes = {
  /** An object containing the article's properties */
  article: PropTypes.shape({
    contentName: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          contentName: PropTypes.string.isRequired,
        }),
      ])
    ),
    url: PropTypes.string.isRequired,
  }).isRequired,

  /** Is the currently viewed article */
  currentArticle: PropTypes.bool,
  /** Is this the focused item. Used mainly for a11y */
  focus: PropTypes.bool,
  /** Is this link part of an inline links-block */
  isBlock: PropTypes.bool,
};

ArticleLink.defaultProps = {
  currentArticle: false,
  focus: false,
  isBlock: false,
};

function ArticleLink({ article, currentArticle, focus, isBlock, }) {
  return currentArticle ? (
    <CurrentArticle>
      {article.contentName}
      {isBlock &&
        article.authors && (
          <Author>
            {article.authors[0].contentName || article.authors[0]}
          </Author>
        )}
    </CurrentArticle>
  ) : (
    <Link
      href={article.url}
      content={
        <Article isBlock={isBlock}>
          {article.contentName}
          {isBlock &&
            article.authors && (
              <Author>
                {article.authors[0].contentName || article.authors[0]}
              </Author>
            )}
        </Article>
      }
      focus={focus}
    />
  );
}

export default ArticleLink;
