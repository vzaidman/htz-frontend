/* global window */
import React from 'react';
import { setDfpTagsParam, } from '@haaretz/dfp';

import ArticleBody from '../components/ArticleBody/ArticleBody';
import MarkedAdSlot from '../components/Ads/MarkedAdSlot';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ChangeableElementGroup from '../components/ChangeableElementGroup/ChangeableElementGroup';
import WrappedComments from '../components/CommentsSection/WrappedComments';
import ClickTrackerWrapper from '../components/ClickTracker/ClickTrackerWrapper';
import Debug from '../components/Debug/Debug';
import ElementGroup from '../components/ElementGroup/ElementGroup';
import Embed from '../components/Embed/Embed';
import Footer from '../components/Footer/Footer';
import HtmlElement from '../components/Interactive/components/HtmlElement';
import Image from '../components/Image/Image';
import Interactive from '../components/Interactive/Interactive';
import LinksBlock from '../components/RelatedArticles/LinksBlock';
import List from '../components/List/List';
import Masthead from '../components/Masthead/Masthead';
import MobileListWrapper from '../components/MobileListWrapper/MobileListWrapper';
import MobileQuickRegistration from '../components/MobileQuickRegistration/MobileQuickRegistration';
import Newsletter from '../components/Newsletter/Newsletter';
import Outbrain from '../components/Outbrain/Outbrain';
import Paragraph from '../components/Paragraph/Paragraph';
import Quote from '../components/Quote/Quote';
import RelatedArticles from '../components/RelatedArticles/RelatedArticles';
import SeriesArticles from '../components/RelatedArticles/SeriesArticles';
import SpecialPromotions from '../components/SpecialPromotions/SpecialPromotions';
import Tags from '../components/Tags/Tags';
import Video from '../components/Video/Video';
import logger from '../componentsLogger';
import withDfpSideEffect from './../components/Dfp/withDfpSideEffect';

const isProduction = process.env.NODE_ENV === 'production';

const inputTemplateToComponent = new Map([
  /* HeaderSlots components */
  [ 'com.htz.EditableNavigationElement', Masthead, ],
  [ 'com.tm.PageTitle', Breadcrumbs, ],

  /* MainSlot components */
  [ 'com.htz.StandardArticle', ArticleBody, ],
  [ 'com.polobase.OutbrainElement', Outbrain, ],
  [ 'com.tm.ArticleCommentsElement', WrappedComments, ],

  /* FooterSlot components */
  [ 'com.tm.FooterElement', Footer, ],

  /* ArticleBody components */
  [ 'embedElement', Embed, ],
  [ 'interactiveElement', Interactive, ],
  [ 'p', Paragraph, ],
  [ 'h3', Paragraph, ],
  [ 'a', Paragraph, ],
  [ 'ul', Paragraph, ],
  [ 'ol', Paragraph, ],
  [ 'li', Paragraph, ],
  [ 'com.htz.MagazineArticleQuote', Quote, ],
  [ 'linksBlock', LinksBlock, ],
  [ 'com.polobase.quickNewsletterRegistration', MobileQuickRegistration, ],
  [ 'relatedArticles', RelatedArticles, ],
  [ 'relatedArticleSeries', SeriesArticles, ],
  [ 'com.tm.Link', SpecialPromotions, ],
  /*
   * This is only a temporary solution to avoid hitting preformance, and SHOULD BE AVOIDED as much as possible.
   * This creates a coupling between different concerns: (rendring components, accessing data)
   * but in this case as tags are deeply nested inside an array we use this to avoid searching them inside the entire page data
   * TODO: expose just the tags in graphql, then replace this temprary solution with one that fetchs the data from graphql
   */
  [ 'tagsElement', withDfpSideEffect(Tags, { sideEffect: setDfpTagsParam, }), ],

  /* Misc components */
  [ 'com.tm.Image', Image, ],
  [ 'com.tm.Video', Video, ],
  [ 'com.tm.HtmlElement', HtmlElement, ],
  [ 'com.tm.newsLetterQuickRegistrationRespAuto', Newsletter, ],
  [
    'com.tm.ListElement',
    () => {
      if (isProduction) {
        return null;
      }
      return <p>Old list, NOT SUPPORTED</p>;
    },
  ],
  [ 'com.tm.element.List', List, ],
  [ 'com.polobase.whtzMobileSiteListsWrapper', MobileListWrapper, ],
  [ 'com.tm.element.group', ChangeableElementGroup, ],
  [ 'com.tm.ElementGroup', ElementGroup, ],
  [ 'com.polobase.DfpBannerElement', MarkedAdSlot, ],
  [ 'com.polobase.ClickTrackerBannersWrapper', ClickTrackerWrapper, ],
  [ null, null, ],
]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ inputTemplate, contentId, contentName, }) => {
  logger.trace(`
    Element with inputTemplate: '${inputTemplate}' is not supported and
    we don't have any component fot it yet.
    The id of the element you tried to render on this page is: ${contentId}.
  `);
  return (
    <Debug>
      <p>{inputTemplate} is currently not supported</p>
    </Debug>
  );
};

export default inputTemplate =>
  inputTemplateToComponent.get(inputTemplate) || DefaultComponent;
