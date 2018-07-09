import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { borderBottom, } from '@haaretz/htz-css-tools';

import { Query, } from '../ApolloBoundary/ApolloBoundary';
import GaDimensions from '../GoogleAnalytics/GaDimensions';
import { extractAuthorsFromArticle, } from '../GoogleAnalytics/helpers/extractAuthorsFromArticle';
import LayoutRow from './LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from './LayoutContainer'; // eslint-disable-line import/no-named-as-default
import getComponent from '../../utils/componentFromInputTemplate';
import Header from './slots/Header';
import StandardArticle from './articleTypes/StandardArticle';
import StandardArticleQuery from './queries/standard_article';

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
            <LayoutRow>
              <LayoutContainer>
                {preHeader && getElements(preHeader)}
              </LayoutContainer>
            </LayoutRow>
            <LayoutRow>
              <LayoutContainer>
                <Header content={header} />
              </LayoutContainer>
            </LayoutRow>
            <LayoutRow>
              <LayoutContainer>
                {postHeader && (
                  <FelaComponent
                    style={theme => ({
                      paddingTop: '3rem',
                      extend: [
                        borderBottom(
                          '3px',
                          3,
                          'solid',
                          theme.color('primary', '-6')
                        ),
                      ],
                    })}
                  >
                    {getElements(postHeader)}
                  </FelaComponent>
                )}
              </LayoutContainer>
            </LayoutRow>
            <LayoutRow>
              <LayoutContainer>
                <StandardArticle
                  articleId={articleId}
                  article={article}
                  aside={aside}
                  seoData={seoData}
                />
              </LayoutContainer>
            </LayoutRow>
            <LayoutRow>{postMain && getElements(postMain)}</LayoutRow>
            <LayoutRow>{footer && getElements(footer)}</LayoutRow>
            <GaDimensions
              pageType={data.page.pageType}
              authors={extractAuthorsFromArticle(article)}
            />
          </Fragment>
        );
      }}
    </Query>
  );
};

ArticlePageLayout.propTypes = propTypes;

export default ArticlePageLayout;
