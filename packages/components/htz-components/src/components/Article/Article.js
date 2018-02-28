import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import ArticleBody from '../ArticleBody/ArticleBody';
import ArticleHeader from '../ArticleHeader/ArticleHeader';

const propTypes = {
  articleType: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ])
  ).isRequired,
  exclusive: PropTypes.string,
  mobileTitle: PropTypes.string.isRequired,
  modDate: PropTypes.number,
  pubDate: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
const defaultProps = {
  exclusive: null,
  modDate: null,
};

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default function Article({
  articleType,
  authors,
  body,
  exclusive,
  mobileTitle,
  modDate,
  pubDate,
  subtitle,
  title,
}) {
  return (
    <Fragment>
      <ArticleHeader
        author={authors[0]}
        kicker={exclusive}
        publishDateTime={pubDate}
        subtitle={subtitle}
        title={title}
      />
      <ArticleBody body={body} />
    </Fragment>
  );
}
