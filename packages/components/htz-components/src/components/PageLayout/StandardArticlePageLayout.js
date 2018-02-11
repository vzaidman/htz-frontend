import React, { Fragment } from 'react';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

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
    metaKeywords: PropTypes.arrayOf(
      PropTypes.string,
    ),
    canonicalLink: PropTypes.string.isRequired,
    alternate: PropTypes.string.isRequired,
    ogDescription: PropTypes.string.isRequired,
    ogImages: PropTypes.arrayOf(
      PropTypes.string,
    ),
  }).isRequired,
  /**
   * Article's slots content.
   */
  slots: PropTypes.shape({
    preHeader: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    header: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    postHeader: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    aside: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    article: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    footer: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
  }).isRequired,
};
const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const sectionStyle = ({ theme, }) => ({
  backgroundColor: theme.color('primary', '-5'),
  width: '100%',
});
const Row = createComponent(sectionStyle, 'section');

const slotStyle = ({ miscStyles, theme, }) => ({
  backgroundColor: theme.color('primary', '-6'),
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',

  ...parseComponentProp(
    'maxWidth',
    [
      { until: 'm', value: 320/6 },
      { from: 'm', until: 'l', value: 100 },
      { from: 'l', until: 'xl', value: 1024/6 },
      { from: 'xl', value: 1293/7 },
    ],
    theme.mq,
    mediaQueryCallback
  ),

});

const Slot = createComponent(slotStyle);

function StandardArticlePageLayout({ slots, seoData}) {

  return (
    <Fragment>
      <Row>
        <Slot>
          <PreHeader content={slots.preHeader} />
        </Slot>
      </Row>
      <Row>
        <Slot>
          <Header content={slots.header} />
        </Slot>
      </Row>
      <Row>
        <Slot>
          <PostHeader content={slots.postHeader} />
        </Slot>
      </Row>
      <Row>
        <Slot>
          <Main content={{ aside: slots.aside, article: slots.article, }} />
        </Slot>
      </Row>
      <Row>
        <Slot>
          <PostMain content={slots.postMain} />
        </Slot>
      </Row>
      <Row>
        <Slot>
          <Footer content={slots.footer} />
        </Slot>
      </Row>
    </Fragment>
  )
}

StandardArticlePageLayout.propTypes = propTypes;

export default StandardArticlePageLayout;
