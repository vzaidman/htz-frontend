import React from 'react';
import PropTypes from 'prop-types';
import { RecipeArticle, } from '@haaretz/htz-components';
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

function RecipeArticlePage({ url, }) {
  return (
    <ArticleLayout
      url={url}
      render={({ articleId, slots, path, }) => <RecipeArticle articleId={articleId} slots={slots} path={path} />}
    />
  );
}

RecipeArticlePage.propTypes = propTypes;

export default RecipeArticlePage;
