import React from 'react';
import { createComponent, } from 'react-fela';
import Link from '../Link/Link';

const articleStyle = ({ theme, isBlock, }) =>
  isBlock ?
    theme.articleStyle.linksBlockLink :
    theme.articleStyle.relatedArticlesLink;
const Article = createComponent(articleStyle, 'span');

const currentArticleStyle = ({ theme, }) => theme.articleStyle.currentArticleInSeries;
const CurrentArticle = createComponent(currentArticleStyle, 'span');

const authorStyle = ({ theme, }) => ({
  fontWeight: '300',
  marginStart: '0.5rem',
  color: theme.color('neutral', '-2'),
});
const Author = createComponent(authorStyle, 'span');

const ArticleLink = ({ article, currentArticle, focus, isBlock, }) => (
  (currentArticle ?
    <CurrentArticle>
      {article.contentName}
      {isBlock && article.authors &&
      <Author>
        {article.authors[0].contentName || article.authors[0]}
      </Author>
      }
    </CurrentArticle>
    :
    <Link
      href={article.url}
      content={
        <Article isBlock={isBlock}>
          {article.contentName}
          {isBlock && article.authors &&
            <Author>
              {article.authors[0].contentName || article.authors[0]}
            </Author>
          }
        </Article>
      }
      focus={focus}
    />
  )
);

export default ArticleLink;
