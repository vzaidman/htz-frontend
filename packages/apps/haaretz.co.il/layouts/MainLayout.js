import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { graphql, gql, } from 'react-apollo';
import { StyleProvider, } from '@haaretz/htz-components';
import TopNav from '../components/TopNav/TopNav';

const propTypes = {
  /**
   * Data from the GraphQL query, provided by Apollo.
   */
  /* eslint-disable react/forbid-prop-types */
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
  /* eslint-enable react/forbid-prop-types */
};
const defaultProps = {
  children: null,
};

const MainSeoData = gql`
  query MainSeoData {
    page {
      contentId
      contentName
      seoData {
        metaTitle
        metaDescription
        metaKeywords
        canonicalLink
        ogImages
        obTitle
      }
    }
  }
`;

export function MainLayout({ data, children, }) {
  if (data.loading) {
    return <div>Loading…</div>;
  }
  if (!data.page) {
    // This seems to happen even when `loading` is false while Apollo is
    // invalidating the cache or something...
    return <div>No page loaded.</div>;
  }
  const { contentName, seoData, } = data.page;
  return (
    <StyleProvider>
      <div>
        <Head>
          <title>
            {seoData.metaTitle}
          </title>
          <meta name="description" content={seoData.metaDescription} />
          <meta name="keywords" content={seoData.metaKeywords.join(', ')} />
          <meta
            name="news_keywords"
            content={seoData.metaKeywords.join(', ')}
          />
          {seoData.ogImages.map(image =>
            <meta property="og:image" content={image} />
          )}
          <link rel="canonical" href={seoData.canonicalLink} />
        </Head>
        <TopNav />
        <h1>
          {contentName}
        </h1>
        {children}
      </div>
    </StyleProvider>
  );
}

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default graphql(MainSeoData)(MainLayout);
