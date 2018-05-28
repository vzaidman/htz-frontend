import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import { Query, } from 'react-apollo';

import LayoutRow from './LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from './LayoutContainer'; // eslint-disable-line import/no-named-as-default

import Footer from './slots/Footer';
import Header from './slots/Header';
import Main from './slots/Main';
import PostHeader from './slots/PostHeader';
import PostMain from './slots/PostMain';
import PreHeader from './slots/PreHeader';

import ArticleContentQuery from './queries/article_content';

const propTypes = {
  /**
   * Article's slots content.
   */
  slots: PropTypes.shape({
    preHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
    header: PropTypes.arrayOf(PropTypes.object).isRequired,
    postHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
    postMain: PropTypes.arrayOf(PropTypes.object).isRequired,
    footer: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,
};

class StandardArticlePageLayout extends React.Component {
  componentDidMount() {
    console.log('standard page layout mounted');
  }

  render() {
    const {
      preHeader,
      header,
      postHeader,
      postMain,
      footer,
    } = this.props.slots;
    return (
      <Query
        query={ArticleContentQuery}
        variables={{ path: this.props.articleId, }}
      >
        {({ loading, error, data, }) => {
          if (error) {
            const isNotFound = data.error.graphQLErrors.some(
              ({ message, }) => message === 'Not Found'
            );
            return <Error statusCode={isNotFound ? 404 : 500} />;
          }
          const { slots, seoData, } = data.page;
          return (
            <Fragment>
              <LayoutRow>
                <LayoutContainer>
                  <PreHeader content={preHeader} />
                </LayoutContainer>
              </LayoutRow>
              <LayoutRow>
                <LayoutContainer>
                  <Header content={header} />
                </LayoutContainer>
              </LayoutRow>
              <LayoutRow>
                <LayoutContainer>
                  <PostHeader content={postHeader} />
                </LayoutContainer>
              </LayoutRow>
              <LayoutRow>
                <LayoutContainer>
                  <Main content={{ ...slots, }} seo={seoData} />
                </LayoutContainer>
              </LayoutRow>
              <LayoutRow>
                <LayoutContainer>
                  <PostMain content={postMain} />
                </LayoutContainer>
              </LayoutRow>
              <LayoutRow>
                <LayoutContainer>
                  <Footer content={footer} />
                </LayoutContainer>
              </LayoutRow>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

StandardArticlePageLayout.propTypes = propTypes;

export default StandardArticlePageLayout;
