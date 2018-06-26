import React from 'react';
import { FelaComponent, } from 'react-fela';
import { border, } from '@haaretz/htz-css-tools';

import ArticleBody from '../components/ArticleBody/ArticleBody';
import ArticleHeader from '../components/ArticleHeader/ArticleHeader';
import AdSlot from '../components/Ads/AdSlot';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import WrappedComments from '../components/CommentsSection/WrappedComments';
import ClickTrackerWrapper from '../components/ClickTracker/ClickTrackerWrapper';
import Embed from '../components/Embed/Embed';
import Footer from '../components/Footer/Footer';
import HtmlElement from '../components/Interactive/components/HtmlElement';
import Image from '../components/Image/Image';
import Interactive from '../components/Interactive/Interactive';
import LinksBlock from '../components/RelatedArticles/LinksBlock';
import List from '../components/List/List';
import Newsletter from '../components/Newsletter/Newsletter';
import Outbrain from '../components/Outbrain/Outbrain';
import Paragraph from '../components/Paragraph/Paragraph';
import Quote from '../components/Quote/Quote';
import RelatedArticles from '../components/RelatedArticles/RelatedArticles';
import SeriesArticles from '../components/RelatedArticles/SeriesArticles';
import Tags from '../components/Tags/Tags';
import Video from '../components/Video/Video';

const isProduction = process.env.NODE_ENV === 'production';

const inputTemplateToComponent = new Map([
  /* HeaderSlots components */
  [ 'com.htz.NavigationElementResp', () => <p>NavigationElementResp</p>, ],
  // [ 'com.tm.PageTitle', () => <p>PageTitle</p>, ],
  [ 'com.tm.PageTitle', Breadcrumbs, ],
  [ 'com.htz.ArticleHeaderElement', ArticleHeader, ],

  /* MainSlot components */
  [ 'com.htz.StandardArticle', ArticleBody, ],
  [ 'com.polobase.OutbrainElement', Outbrain, ],
  [ 'com.tm.CommentsElement', () => <p>CommentsElement</p>, ],
  [ 'com.tm.ArticleCommentsElement', WrappedComments, ],

  /* FooterSlot components */
  [ 'com.tm.FooterElement', Footer, ],
  [ 'com.tm.DisclaimerElement', () => <p>DisclaimerElement</p>, ],

  /* ArticleBody components */
  [ 'embedElement', Embed, ],
  [ 'interactiveElement', Interactive, ],
  [ 'p', Paragraph, ],
  [ 'h4', Paragraph, ],
  [ 'a', Paragraph, ],
  [ 'com.htz.MagazineArticleQuote', Quote, ],
  [ 'linksBlock', LinksBlock, ],
  [ 'relatedArticles', RelatedArticles, ],
  [ 'relatedArticleSeries', SeriesArticles, ],
  [ 'tagsElement', Tags, ],

  /* Misc components */
  [ 'com.tm.Image', Image, ],
  [ 'com.tm.Video', Video, ],
  [ 'com.tm.ImageGalleryElement', () => <p>ImageGallery</p>, ],
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
  [ 'com.tm.TabViewElement', () => <p>TabViewElement</p>, ],
  [ 'com.polobase.JSONListsWrapper', () => <p>JSONListsWrapper</p>, ],
  [ 'com.mouse.ChronicalBoardElement', () => <p>ChronicalBoardElement</p>, ],
  [ 'com.tm.ElementGroup', () => <p>ElementGroup</p>, ],
  [ 'com.polobase.DfpBannerElement', AdSlot, ],
  [ 'com.polobase.ClickTrackerBannersWrapper', ClickTrackerWrapper, ],
  [ null, null, ],
]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ inputTemplate, contentId, contentName, }) => {
  console.info(`
    Element of type ${inputTemplate} is not supported and
    we don't have any component fot it yet.
    The id of the element you tried to render on this page is: ${contentId}.
  `);
  return (
    <FelaComponent
      style={theme => ({
        color: theme.color('input', 'primaryErrorTextLabel'),
        ...border(
          '2px',
          1,
          'solid',
          theme.color('input', 'primaryErrorBorder')
        ),
        marginBottom: '2rem',
      })}
    >
      <p>{inputTemplate} is currently not supported</p>
    </FelaComponent>
  );
};

export default inputTemplate =>
  inputTemplateToComponent.get(inputTemplate) || DefaultComponent;
