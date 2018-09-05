/* global sessionStorage localStorage */
import React from 'react';
import PropTypes from 'prop-types';
import { StandardArticle, } from '@haaretz/htz-components';
import ArticleLayout from '../layouts/ArticleLayout';

const propTypes = {
  /**
   * An object containing route information from Next, such as the `pathname`
   * and `query` object.
   */
  url: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function StandardArticlePage({ url, }) {
  return (
    <ArticleLayout
      url={url}
      render={({ articleId, slots, }) => <StandardArticle articleId={articleId} slots={slots} />}
    />
  );
}

StandardArticlePage.propTypes = propTypes;

export default StandardArticlePage;
