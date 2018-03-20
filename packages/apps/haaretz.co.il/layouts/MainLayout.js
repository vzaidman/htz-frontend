import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Error from 'next/error';
import { graphql, } from 'react-apollo';
import gql from 'graphql-tag';
import { propType, } from 'graphql-anywhere';
import { StyleProvider, } from '@haaretz/fela-utils';
import htzTheme from '@haaretz/htz-theme';
// import dynamic from 'next/dynamic';
import {
  UserInjector,
  DfpInjector, // eslint-disable-line no-unused-vars
  LoginExample,
  RegisterExample,
  StandardArticlePageLayout,
} from '@haaretz/htz-components';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import TopNav from '../components/TopNav/TopNav';
// eslint-disable-next-line import/no-named-as-default
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
// eslint-disable-next-line import/no-named-as-default
import Slot from '../components/Slot/Slot';

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
      slots
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

export class MainLayout extends React.Component {
  static propTypes = {
    /**
     * Information about the GraphQL query from Apollo.
     */
    data: propType(PageData).isRequired,
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

  static defaultProps = {};

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

  renderSlots() {
    const { data, } = this.props;
    const pageContentId = data.page.contentId;
    return data.page
      ? data.page.slots.map(slot => (
        <Slot {...slot} key={slot.name} pageContentId={pageContentId} />
      ))
      : [];
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
        {/* <DfpInjector /> */}
        <StyleProvider renderer={styleRenderer} theme={htzTheme}>
          <div>
            {this.renderHead()}
            <TopNav />
            <h1>
              {data.loading
                ? 'Loading…'
                : data.page ? data.page.contentName : ''}
            </h1>
            {data.page ? <Breadcrumbs page={data.page} /> : null}
            <StandardArticlePageLayout
              slots={this.props.data.page.slots}
              seoData={this.props.data.page.seoData}
            />
          </div>
        </StyleProvider>
      </Fragment>
    );
  }
}

export default graphql(PageData, {
  options: props => ({
    variables: {
      path: props.url.query.path,
    },
  }),
})(MainLayout);
