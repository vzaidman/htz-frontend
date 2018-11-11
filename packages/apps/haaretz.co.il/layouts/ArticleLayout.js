/* global sessionStorage localStorage */
import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
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
  PremiumContentMeta,
  Query,
  Error,
  pixelEvent,
  PaywallDbgController,
  PaywallDbgProvider,
  PaywallBottomRuler,
} from '@haaretz/htz-components';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import ArticleChartbeatConfig from '../components/ChartBeat/ArticleChartbeatConfig';
import ArticleInitQuery from './queries/article_layout';

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

  static defaultProps = {};

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
    const articleId = this.props.url.query.path.match(/(?:.*-?)(1\.\d+.*)/)[1];
    pixelEvent('track', 'ViewContent', { article_id: articleId, });
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
    pixelEvent('track', 'ViewContent', { article_id: this.state.articleId, });
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
    const { url, render, } = this.props;
    return (
      <Query query={ArticleInitQuery} variables={{ path: url.query.path, }}>
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) logger.error(error);
          if (data && data.page) {
            const {
              page: { pageType, slots, lineage, jsonld, pageDateTimeString, },
            } = data;
            const articleId = lineage[0].contentId;
            this.setState({
              articleId,
            });
            const titleSEO = `${lineage[0].name} - ${lineage[1] ? lineage[1].name : ''} - ${
              lineage.length > 2 ? lineage[lineage.length - 1].name : ''
            }`;
            client.writeData({
              data: {
                pageType,
                articleId,
                title: titleSEO,
                pageDateTimeString,
                // place properties to reset in the client store when a new article is loaded
                isOsakaDisplayed: false,
              },
            });
            const standardArticleElement = slots.article.find(
              ({ inputTemplate, }) => inputTemplate && inputTemplate.endsWith('StandardArticle')
            );
            const isPremiumContent = standardArticleElement
              ? standardArticleElement.isPremiumContent
              : null;

            const authorsArr = slots.article
              .find(item => item.authors);

            const authors = authorsArr.authors ? authorsArr.authors.map(item => item.contentName).join(', ') : 'No Authors';

            return (
              <Fragment>
                <Head>
                  <title>{titleSEO}</title>
                  {ArticleChartbeatConfig(lineage[1].name, authors)}
                </Head>
                {// render <PremiumContentMeta/> only when isPremiumContent is defined
                isPremiumContent !== null ? (
                  <PremiumContentMeta isPremiumContent={isPremiumContent} />
                ) : null}
                <ScrollListener />
                <RouteChangeListener />
                <UserInjector />
                <DfpInjector path={url.query.path} pageType="htz_article" />
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
                      {render({ articleId: this.props.url.query.path, slots, pageType, })}
                    </FelaComponent>
                    <WelcomePage />
                    <PaywallDbgController />
                    <PaywallDbgProvider>
                      {paywallData => (
                        paywallData.slotLocation === 'bot-persist'
                          ? <PaywallBottomRuler {...paywallData} />
                          : null
                      )}
                    </PaywallDbgProvider>
                  </Fragment>
                </StyleProvider>
                <div id="welcomePageModal" />
                {jsonld ? <PageSchema jsonld={jsonld} /> : null}
              </Fragment>
            );
          }
          return <Error errorCode={1} kind="error" message="PApi is down, Call Avi Kaufman." />;
        }}
      </Query>
    );
  }
}

export default ArticleLayout;
