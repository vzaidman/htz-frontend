import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Query from '../ApolloBoundary/Query';
import { extractAuthorsFromArticle, } from '../GoogleAnalytics/helpers/extractAuthorsFromArticle';
import LayoutRow from './LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from './LayoutContainer'; // eslint-disable-line import/no-named-as-default
import getComponent from '../../utils/componentFromInputTemplate';
import Masthead from './slots/Masthead';
import ArticleBIQuery from './queries/article_bi';
import UserDispenser from '../User/UserDispenser';

const BIRequest = dynamic(import('../BI/BIRequest'), {
  ssr: false,
  loading: () => null,
});

const GaDimensions = dynamic(import('../GoogleAnalytics/GaDimensions'), {
  ssr: false,
  loading: () => null,
});

const propTypes = {
  /**
   * Article's slots content.
   */
  slots: PropTypes.shape({
    preHeader: PropTypes.arrayOf(PropTypes.object),
    header: PropTypes.arrayOf(PropTypes.object),
    postHeader: PropTypes.arrayOf(PropTypes.object),
    postMain: PropTypes.arrayOf(PropTypes.object),
    footer: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,
  /**
   * children of ArticleLayout
   */
  children: PropTypes.element.isRequired,
};

const ArticlePageLayout = ({
  slots: { preHeader, header, postHeader, postMain, footer, },
  articleId,
  children,
}) => {
  const getElements = slot => slot.map(element => {
    const Element = getComponent(element.inputTemplate);
    const { properties, ...elementWithoutProperties } = element;
    return (
      <Element
        key={element.contentId}
        articleId={articleId}
        {...elementWithoutProperties}
        {...properties}
      />
    );
  });

  return (
    <Fragment>
      {preHeader ? <LayoutRow>{getElements(preHeader)}</LayoutRow> : null}
      {/* Layout row is inside Masthead Component because its miscStyles depend on state */}
      <Masthead content={header} articleId={articleId} />
      <LayoutRow>
        {postHeader ? (
          <LayoutContainer>{getElements(postHeader)}</LayoutContainer>
        ) : null}
      </LayoutRow>
      <LayoutRow tagName="main" id="pageRoot" miscStyles={{ flexGrow: 1, }}>
        {children}
      </LayoutRow>
      {postMain ? (
        <LayoutRow miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}>
          {getElements(postMain)}
        </LayoutRow>
      ) : null}
      {footer ? (
        <LayoutRow>
          {' '}
          {getElements(footer)}
          {' '}
        </LayoutRow>
      ) : null}
      <Query query={ArticleBIQuery} variables={{ path: articleId, }} ssr={false}>
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) return null;
          const {
            slots: { article, },
            seoData: { canonicalUrl, },
          } = data.page;
          client.writeData({
            data: {
              canonicalUrl,
            },
          });
          return (
            <Fragment>
              <BIRequest
                articleId={articleId}
                authors={extractAuthorsFromArticle(article)}
              />
              <UserDispenser
                render={({ user, isLoggedIn, }) => {
                  if (isLoggedIn) {
                    return (
                      <GaDimensions
                        pageType={data.page.pageType}
                        authors={extractAuthorsFromArticle(article)}
                        userType={user.type}
                      />
                    );
                  }
                  return null;
                }}
              />
            </Fragment>
          );
        }}
      </Query>
      <LayoutRow idName="modalsRoot" />
    </Fragment>
  );
};

ArticlePageLayout.propTypes = propTypes;

export default ArticlePageLayout;
