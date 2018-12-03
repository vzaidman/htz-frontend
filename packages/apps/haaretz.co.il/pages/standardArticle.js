import React from 'react';
import PropTypes from 'prop-types';
import { StandardArticle, } from '@haaretz/htz-components';
import ArticleLayout from '../layouts/ArticleLayout';
import LegacyPrefixRedirect from '../components/Redirect/LegacyPrefixRedirect';

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
      render={({ articleId, slots, pageType, }) =>
        // the following redirect is for legacy cases where
        // we dont have a correct prefix according to article type.
        // in such a case we will redirect on  the client to the correct pageType
        (pageType !== 'regularArticle' ? (
          <LegacyPrefixRedirect pageType={pageType} />
        ) : (
          <StandardArticle articleId={articleId} slots={slots} />
        ))
      }
    />
  );
}

StandardArticlePage.propTypes = propTypes;

export default StandardArticlePage;
