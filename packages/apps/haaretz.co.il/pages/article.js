/* global sessionStorage */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/fela-utils';
import { htzTheme, } from '@haaretz/htz-theme';
import { createLogger, } from '@haaretz/app-utils';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  AriaLive,
  ArticlePageLayout,
  ApolloBoundary,
  BIRequest,
  DeviceTypeInjector,
  GaDimensions,
  GoogleAnalytics,
  PageSchema,
  ScrollListener,
  RouteChangeListener,
  UserInjector,
} from '@haaretz/htz-components';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import ArticleInitQuery from './queries/article_layout';
import publisher from './schema/publisher';

// TODO: Get rid of ApolloBoundary
const { Query, } = ApolloBoundary;

const logger = createLogger();

const DfpInjector = dynamic(import('../components/Dfp/DfpInjector'), {
  loading: () => null,
  ssr: false,
});

const WelcomePage = dynamic(import('../components/WelcomePage/WelcomePage'), {
  loading: () => null,
  ssr: false,
});

export class ArticlePage extends React.Component {
  static propTypes = {
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

  state = {
    articleId: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.articleId !== nextState.articleId;
  }

  componentDidUpdate() {
    this.writeToSession(this.state.articleId);
  }

  writeToSession = articleId => {
    const history = JSON.parse(sessionStorage.getItem('readingHistory')) || [];
    if (!history.includes(articleId)) {
      history.push(articleId);
      sessionStorage.setItem(
        'readingHistory',
        JSON.stringify(history, null, 2)
      );
    }
  };

  render() {
    const { url, } = this.props;
    return (
      <Query query={ArticleInitQuery} variables={{ path: url.query.path, }}>
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) logger.error(error);
          const { page: { slots, lineage, }, user, } = data;
          const articleId = lineage[0].contentId;
          this.setState({
            articleId,
          });
          client.writeData({
            data: {
              articleId,
              articleParent: {
                name: lineage[1] ? lineage[1].name : '',
                id: lineage[1] ? lineage[1].contentId : '',
                __typename: 'ArticleParent',
              },
              pageSchema: {
                publisher,
                __typename: 'PageSchema',
              },
            },
          });
          const titleSEO = `${lineage[0].name} - ${
            lineage[1] ? lineage[1].name : ''
          } - ${lineage.length > 2 ? lineage[lineage.length - 1].name : ''}`;
          return (
            <Fragment>
              <Head>
                <title>{titleSEO}</title>
              </Head>
              <ScrollListener />
              <RouteChangeListener />
              <UserInjector />
              <DfpInjector path={url.query.path} />
              <GoogleAnalytics withEC />
              <StyleProvider renderer={styleRenderer} theme={htzTheme}>
                <Fragment>
                  <AriaLive />
                  <DeviceTypeInjector />
                  <BIRequest articleId={url.query.path} />
                  <GaDimensions userType={user.type} />
                  <ArticlePageLayout
                    articleId={this.props.url.query.path}
                    slots={slots}
                  />
                  <WelcomePage />
                </Fragment>
              </StyleProvider>
              <div id="welcomePageModal" />
              <PageSchema />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default ArticlePage;
