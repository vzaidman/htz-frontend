import React from 'react';
import { createComponent, } from 'react-fela';
import Link from '../Link/Link';

const articleStyle = ({ theme, }) => theme.articleStyle.relatedArticlesLink;
const Article = createComponent(articleStyle, Link, props => Object.keys(props));

const selectedArticleStyle = ({ theme, }) => theme.articleStyle.activeArticleInSeries;
const SelectedArticle = createComponent(selectedArticleStyle, 'span');

const ArticleLink = ({ article, currentArticle, focus, }) => (
  (currentArticle ?
    <SelectedArticle>
      {article.contentName}
    </SelectedArticle>
    :
    <Article
      href={article.url}
      content={article.contentName}
      focus={focus}
    />
  )
);

export default ArticleLink;
