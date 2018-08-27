import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import dynamic from 'next/dynamic';

import { borderBottom, } from '@haaretz/htz-css-tools';
import Query from '../ApolloBoundary/Query';
import { extractAuthorsFromArticle, } from '../GoogleAnalytics/helpers/extractAuthorsFromArticle';
import LayoutRow from './LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from './LayoutContainer'; // eslint-disable-line import/no-named-as-default
import getComponent from '../../utils/componentFromInputTemplate';
import Masthead from './slots/Masthead';
import StandardArticle from './articleTypes/StandardArticle';
import StandardArticleQuery from './queries/standard_article';
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
};

const ArticlePageLayout = ({
  slots: { preHeader, header, postHeader, postMain, footer, },
  articleId,
}) => {
  const getElements = slot =>
    slot.map(element => {
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
      {/* padding bottom is because masthead is fixed position in mobile */}
      <LayoutRow
        miscStyles={{ paddingBottom: [ { until: 's', value: '9rem', }, ], }}
      >
        <Masthead content={header} articleId={articleId} />
      </LayoutRow>
      <LayoutRow>
        {postHeader ? (
          <LayoutContainer>
            <FelaComponent
              style={theme => ({
                paddingTop: '3rem',
                extend: [
                  borderBottom('3px', 3, 'solid', theme.color('primary', '-6')),
                ],
              })}
            >
              {getElements(postHeader)}
            </FelaComponent>
          </LayoutContainer>
        ) : null}
      </LayoutRow>
      <Query query={StandardArticleQuery} variables={{ path: articleId, }}>
        {({ loading, error, data, client, }) => {
          if (loading) return null;
          if (error) return null;
          const {
            slots: { article, aside, },
            seoData,
            seoData: { canonicalUrl, },
          } = data.page;
          client.writeData({
            data: {
              canonicalUrl,
            },
          });
          return (
            <Fragment>
              <LayoutRow tagName="main" id="pageRoot">
                <StandardArticle
                  articleId={articleId}
                  article={article}
                  aside={aside}
                  seoData={seoData}
                />
              </LayoutRow>
              {postMain ? (
                <LayoutRow
                  miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}
                >
                  {getElements(postMain)}
                </LayoutRow>
              ) : null}
              {footer ? <LayoutRow> {getElements(footer)} </LayoutRow> : null}
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
