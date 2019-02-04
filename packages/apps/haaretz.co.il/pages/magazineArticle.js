import React from 'react';
import PropTypes from 'prop-types';
import { MagazineArticle, } from '@haaretz/htz-components';
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

function MagArticlePage({ url, }) {
  return (
    <ArticleLayout
      url={url}
      render={({ articleId, slots, path, }) => <MagazineArticle articleId={articleId} slots={slots} path={path} />}
    />
  );
}

MagArticlePage.propTypes = propTypes;

export default MagArticlePage;
