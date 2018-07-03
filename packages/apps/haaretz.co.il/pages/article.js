import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import { StyleProvider, } from '@haaretz/fela-utils';
import { htzTheme, } from '@haaretz/htz-theme';
import { createLogger, } from '@haaretz/app-utils';
import dynamic from 'next/dynamic';
import {
  AriaLive,
  ArticlePageLayout,
  BIRequest,
  DeviceTypeInjector,
  GaDimensions,
  GoogleAnalytics,
  ScrollListener,
  UserInjector,
} from '@haaretz/htz-components';

import styleRenderer from '../components/styleRenderer/styleRenderer';
import ArticleInitQuery from './queries/article_layout';

const logger = createLogger();
const DfpInjector = dynamic(import('../components/Dfp/DfpInjector'), {
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

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.articleId ||
      this.state.articleId !== nextProps.url.query.path
    ) {
      this.setState({
        articleId: nextProps.url.query.path,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.articleId !== nextState.articleId;
  }

  render() {
    const { url, } = this.props;
    return (
      <Fragment>
        <ScrollListener />
        <UserInjector />
        <DfpInjector path={url.query.path} />
        <GoogleAnalytics withEC />
        <StyleProvider renderer={styleRenderer} theme={htzTheme}>
          <Query query={ArticleInitQuery} variables={{ path: url.query.path, }}>
            {({ loading, error, data, client, }) => {
              if (loading) return null;
              if (error) logger.error(error);
              const { slots, lineage, } = data.page;
              client.writeData({
                data: {
                  articleId: lineage[0].contentId,
                  section: lineage[1] ? lineage[1].name : '',
                },
              });
              return (
                <Fragment>
                  <AriaLive />
                  <DeviceTypeInjector />
                  <BIRequest articleId={url.query.path} />
                  <GaDimensions userType={data.user.type} />
                  <ArticlePageLayout
                    articleId={this.props.url.query.path}
                    slots={slots}
                  />
                </Fragment>
              );
            }}
          </Query>
        </StyleProvider>
      </Fragment>
    );
  }
}

export default ArticlePage;
