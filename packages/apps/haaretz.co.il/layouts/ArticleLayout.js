/* global sessionStorage localStorage */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Query, } from 'react-apollo';
import { FelaComponent, } from 'react-fela';
import { StyleProvider, } from '@haaretz/fela-utils';
import { htzTheme, } from '@haaretz/htz-theme';
import { createLogger, } from '@haaretz/app-utils';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {
  AriaLive,
  DeviceTypeInjector,
  GoogleAnalytics,
  PageSchema,
  ScrollListener,
  RouteChangeListener,
  UserInjector,
} from '@haaretz/htz-components';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import ArticleInitQuery from './queries/article_layout';
import publisher from './schema/publisher';

const logger = createLogger();

const DfpInjector = dynamic(import('../components/Dfp/DfpInjector'), {
  loading: () => null,
  ssr: false,
});

const WelcomePage = dynamic(import('../components/WelcomePage/WelcomePage'), {
  loading: () => null,
  ssr: false,
});

class ArticleLayout extends React.Component {
  static propTypes = {
    /**
     * is this a standard article
     */
    isStandardArticle: PropTypes.bool,
    /**
     * The render function of the Layout, should return react elements,
     * The render prop function is passed a Object with articleId and slots properties
     */
    render: PropTypes.func.isRequired,
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

  static defaultProps = {
    isStandardArticle: false,
  };

  state = {
    articleId: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextArticleId = nextProps.url.query.path.match(/(?:.*-?)(1\.\d+.*)/)[1];

    if (!prevState.articleId || prevState.articleId !== nextArticleId) {
      return { articleId: nextArticleId, };
    }

    return { articleId: prevState.articleId, };
  }

  componentDidMount() {
    console.log('article layout mounted')
    const articleId = this.props.url.query.path.match(/(?:.*-?)(1\.\d+.*)/)[1];
    this.writeToSession(articleId);
    this.writeToLocal(articleId);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      articleId,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.articleId !== nextState.articleId;
  }

  componentDidUpdate() {
    this.writeToSession(this.state.articleId);
    this.writeToLocal(this.state.articleId);
  }

  writeToSession = articleId => {
    const history = JSON.parse(sessionStorage.getItem('readingHistory')) || [];
    if (!history.includes(articleId)) {
      history.push(articleId);
      sessionStorage.setItem('readingHistory', JSON.stringify(history, null, 2));
    }
  };

  writeToLocal = articleId => {
    const history = JSON.parse(localStorage.getItem('readingHistory')) || [];
    if (!history.includes(articleId)) {
      history.push(articleId);
      localStorage.setItem('readingHistory', JSON.stringify(history, null, 2));
    }
  };

  render() {
    const { isStandardArticle, url, render, } = this.props;
    console.log('url from articlelayout: ', url);
    return (
      <Query query={ArticleInitQuery} variables={{ path: url.query.path, }}>
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) logger.error(error);
          const {
            page: { pageType, slots, lineage, },
          } = data;
          const articleId = lineage[0].contentId;
          console.log('pageType from articleLayout: ', pageType);
          if (process.browser && isStandardArticle && pageType !== 'regularArticle') {
            console.log('need to redirect, new articleId: ', articleId);
            console.log('next router: ', Router);
            Router.push(`/${pageType}?path=/${articleId}`, `/${articleId}`);
          }
          this.setState({
            articleId,
          });
          client.writeData({
            data: {
              articleId,
              pageSchema: {
                publisher,
                __typename: 'PageSchema',
              },
              // place properties to reset in the client store when a new article is loaded
              isOsakaDisplayed: false,
            },
          });
          const titleSEO = `${lineage[0].name} - ${lineage[1] ? lineage[1].name : ''} - ${
            lineage.length > 2 ? lineage[lineage.length - 1].name : ''
          }`;
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
                  <FelaComponent
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '100vh',
                    }}
                  >
                    {render({ articleId: this.props.url.query.path, slots, })}
                  </FelaComponent>
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

export default ArticleLayout;
