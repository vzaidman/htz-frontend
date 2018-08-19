import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { withData, } from '@haaretz/app-utils';
import Head from 'next/head';
import Error from 'next/error';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import { StyleProvider, } from '@haaretz/fela-utils';
import htzTheme from '@haaretz/htz-theme';
import {
  UserInjector,
  LoginExample,
  RegisterExample,
  ArticlePageLayout,
} from '@haaretz/htz-components';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import TopNav from '../components/TopNav/TopNav';
// eslint-disable-next-line import/no-named-as-default
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const PageData = gql`
  query PageData($path: String!) {
    page(path: $path) {
      pageType
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
      ...BreadcrumbsPage
      slots {
        preHeader
        header
        postHeader
        aside
        article
        postMain
        footer
      }
      dfpConfig {
        adSlotConfig
        adManagerConfig {
          network
          adUnitBase
        }
        conflictManagementConfig
        impressionManagerConfig
        googleGlobalSettings {
          enableSingleRequest
          enableAsyncRendering
          breakpointType
        }
      }
    }
  }
  ${Breadcrumbs.fragments.page}
`;

export class HomePage extends React.Component {
  static propTypes = {
    /**
     * Information about the GraphQL query from Apollo.
     */
    data: PropTypes.shape(PageData).isRequired,
    // /**
    //  * An object containing route information from Next, such as the `pathname`
    //  * and `query` object.
    //  */
    // url: PropTypes.shape({
    //   pathname: PropTypes.string.isRequired,
    //   query: PropTypes.shape({
    //     path: PropTypes.string.isRequired,
    //   }).isRequired,
    // }).isRequired,
  };

  static defaultProps = {};

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
  }

  renderHead() {
    const { data, } = this.props;
    if (!data.page) {
      return null;
    }
    const { seoData, } = data.page;
    return (
      <Head>
        <title>{seoData.metaTitle}</title>
        <meta name="description" content={seoData.metaDescription} />
        <meta name="keywords" content={seoData.metaKeywords.join(', ')} />
        <meta name="news_keywords" content={seoData.metaKeywords.join(', ')} />
        {seoData.ogImages.map(image => (
          <meta property="og:image" content={image} />
        ))}
        <link rel="canonical" href={seoData.canonicalLink} />
      </Head>
    );
  }
  render() {
    const { data, } = this.props;
    if (data.error) {
      // FIXME: This is essentially duplicated in `withData`. Figure out a
      // more reasonable error handling strategy.
      const isNotFound = data.error.graphQLErrors.some(
        ({ message, }) => message === 'Not Found'
      );
      return <Error statusCode={isNotFound ? 404 : 500} />;
    }
    return (
      <Fragment>
        <UserInjector />
        {LoginExample}
        {RegisterExample}
        <StyleProvider renderer={styleRenderer} theme={htzTheme}>
          <div>
            {this.renderHead()}
            <TopNav />
            <h1>
              {data.loading
                ? 'Loading…'
                : data.page
                  ? data.page.contentName
                  : ''}
            </h1>
            {data.page ? <Breadcrumbs page={data.page} /> : null}
            {data.page.pageType === 'article' && (
              <ArticlePageLayout
                slots={data.page.slots}
                seoData={data.page.seoData}
              />
            )}
          </div>
        </StyleProvider>
      </Fragment>
    );
  }
}

export default withData(
  graphql(PageData, {
    options: props => ({
      variables: {
        path: props.url.query.path,
      },
    }),
  })(HomePage)
);
