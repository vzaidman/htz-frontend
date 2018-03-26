import React from 'react';

import Article from '../components/Article/Article';
import CommentsWithApollo from '../components/CommentsSection/CommentsWithApollo';
import Embed from '../components/Embed/Embed';
import HtmlElement from '../components/Interactive/HtmlElement';
import Image from '../components/Image/Image';
import InteractiveElement from '../components/Interactive/interactiveElement';
import LinksBlock from '../components/RelatedArticles/LinksBlock';
import Paragraph from '../components/Paragraph/Paragraph';
import Quote from '../components/Quote/Quote';
import RelatedArticles from '../components/RelatedArticles/RelatedArticles';
import SeriesArticles from '../components/RelatedArticles/SeriesArticles';
import Tags from '../components/Tags/Tags';
import Video from '../components/Video/Video';

const inputTemplateToComponent = new Map([
  /* HeaderSlots components */
  [ 'com.htz.NavigationElementResp', () => <p>NavigationElementResp</p>, ],
  [ 'com.tm.PageTitle', () => <p>PageTitle</p>, ],
  [ 'com.htz.ArticleHeaderElement', () => <p>ArticleHeaderElement</p>, ],

  /* MainSlot components */
  [ 'com.htz.StandardArticle', Article, ],
  [ 'com.polobase.OutbrainElement', () => <p>OutbrainElement</p>, ],
  [ 'com.tm.CommentsElement', () => <p>CommentsElement</p>, ],
  [ 'com.tm.ArticleCommentsElement', CommentsWithApollo, ],

  /* FooterSlot components */
  [ 'com.tm.FooterElement', () => <p>FooterElement</p>, ],
  [ 'com.tm.DisclaimerElement', () => <p>DisclaimerElement</p>, ],

  /* ArticleBody components */
  [ 'embedElement', Embed, ],
  [ 'interactiveElement', InteractiveElement, ],
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
  [ 'com.tm.ListElement', () => <p>ListElement</p>, ],
  [ 'com.tm.TabViewElement', () => <p>TabViewElement</p>, ],
  [ 'com.polobase.JSONListsWrapper', () => <p>JSONListsWrapper</p>, ],
  [ 'com.mouse.ChronicalBoardElement', () => <p>ChronicalBoardElement</p>, ],
  [ 'com.tm.ElementGroup', () => <p>ElementGroup</p>, ],
  [ 'com.polobase.DfpBannerElement', () => <p>DfpBannerElement</p>, ],
  [
    'com.polobase.ClickTrackerBannersWrapper',
    () => <p>ClickTrackerBannersWrapper</p>,
  ],
  [ null, null, ],
]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ inputTemplate, }) => (
  <p>{inputTemplate} is currently not supported</p>
);

export default inputTemplate =>
  inputTemplateToComponent.get(inputTemplate) || DefaultComponent;
