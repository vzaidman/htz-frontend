import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Observer from 'react-intersection-observer';
import { ReadArticleService, } from '@haaretz/htz-user-utils';

import Query from '../ApolloBoundary/Query';
import { extractAuthorsFromArticle, } from '../GoogleAnalytics/helpers/extractAuthorsFromArticle';
import LayoutRow from './LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from './LayoutContainer'; // eslint-disable-line import/no-named-as-default
import getComponent from '../../utils/componentFromInputTemplate';
import HeaderSlot from './slots/Header';
import ArticleBIQuery from './queries/article_bi';
import GET_USER_TYPE from './queries/user_type';
import UserDispenser from '../User/UserDispenser';
import BIRequest from '../BI/BIRequest';
import NoSSR from '../NoSSR/NoSSR';
import IconHaaretzLogo from '../Icon/icons/IconHaaretzLogo';

const GoogleAnalytics = dynamic(import('../GoogleAnalytics/GoogleAnalytics'), {
  ssr: false,
  loading: () => null,
});
const GaDimensions = dynamic(import('../GoogleAnalytics/GaDimensions'), {
  ssr: false,
  loading: () => null,
});

const propTypes = {
  // should article layout render the postHeader slot
  renderPostHeader: PropTypes.bool,
  /**
   * the background color passed to all the LayoutRow components.
   */
  rowBgc: PropTypes.string,
  /** should the masthead border bottom be full width */
  mastheadFullWidthBorder: PropTypes.bool,
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

const defaultProps = {
  rowBgc: null,
  mastheadFullWidthBorder: false,
  renderPostHeader: true,
};

const ArticlePageLayout = ({
  slots: { preHeader, header, postHeader, postMain, footer, },
  articleId,
  children,
  rowBgc,
  mastheadFullWidthBorder,
  renderPostHeader,
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
      <NoSSR>{ReadArticleService.update(articleId)}</NoSSR>
      {preHeader ? <LayoutRow bgc={rowBgc}>{getElements(preHeader)}</LayoutRow> : null}
      {/* Layout row is inside Masthead Component because its miscStyles depend on state */}
      <HeaderSlot
        pageType="article"
        rowBgc={rowBgc}
        content={header}
        logo={IconHaaretzLogo}
        articleId={articleId}
      />
      {postHeader && renderPostHeader ? (
        <LayoutRow bgc={rowBgc}>
          <LayoutContainer>{getElements(postHeader)}</LayoutContainer>
        </LayoutRow>
      ) : null}
      <LayoutRow bgc={rowBgc} tagName="main" id="pageRoot" miscStyles={{ flexGrow: 1, }}>
        {children}
      </LayoutRow>
      {postMain ? (
        <LayoutRow bgc={rowBgc} miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}>
          <Observer triggerOnce rootMargin="1500px">
            {inView => (inView ? <Fragment>{getElements(postMain)}</Fragment> : null)}
          </Observer>
        </LayoutRow>
      ) : null}
      {footer ? <LayoutRow bgc={rowBgc}>{getElements(footer)}</LayoutRow> : null}
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
          const userType = client.readQuery({ query: GET_USER_TYPE, }).user;
          return (
            <Fragment>
              <BIRequest articleId={articleId} authors={extractAuthorsFromArticle(article)} />
              <GoogleAnalytics withEC />
              <GaDimensions
                pageType={data.page.pageType}
                authors={extractAuthorsFromArticle(article)}
                userType={userType.type}
              />
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

ArticlePageLayout.propTypes = propTypes;
ArticlePageLayout.defaultProps = defaultProps;

export default ArticlePageLayout;
