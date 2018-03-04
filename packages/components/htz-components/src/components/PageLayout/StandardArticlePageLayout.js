import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import LayoutRow from './LayoutRow'; // eslint-disable-line import/no-named-as-default
import LayoutContainer from './LayoutContainer'; // eslint-disable-line import/no-named-as-default

import Footer from './slots/Footer';
import Header from './slots/Header';
import Main from './slots/Main';
import PostHeader from './slots/PostHeader';
import PostMain from './slots/PostMain';
import PreHeader from './slots/PreHeader';

const propTypes = {
  /**
   *  Article SEO data.
   */
  seoData: PropTypes.shape({
    metaTitle: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    metaKeywords: PropTypes.arrayOf(PropTypes.string),
    canonicalLink: PropTypes.string.isRequired,
    alternate: PropTypes.string.isRequired,
    ogDescription: PropTypes.string.isRequired,
    ogImages: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  /**
   * Article's slots content.
   */
  slots: PropTypes.shape({
    preHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
    header: PropTypes.arrayOf(PropTypes.object).isRequired,
    postHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
    aside: PropTypes.arrayOf(PropTypes.object).isRequired,
    article: PropTypes.arrayOf(PropTypes.object).isRequired,
    footer: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

function StandardArticlePageLayout({ slots, seoData, }) {
  return (
    <Fragment>
      <LayoutRow>
        <LayoutContainer>
          <PreHeader content={slots.preHeader} />
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow>
        <LayoutContainer>
          <Header content={slots.header} />
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow>
        <LayoutContainer>
          <PostHeader content={slots.postHeader} />
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow>
        <LayoutContainer>
          <Main content={{ aside: slots.aside, article: slots.article, }} />
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow>
        <LayoutContainer>
          <PostMain content={slots.postMain} />
        </LayoutContainer>
      </LayoutRow>
      <LayoutRow>
        <LayoutContainer>
          <Footer content={slots.footer} />
        </LayoutContainer>
      </LayoutRow>
    </Fragment>
  );
}

StandardArticlePageLayout.propTypes = propTypes;

export default StandardArticlePageLayout;
