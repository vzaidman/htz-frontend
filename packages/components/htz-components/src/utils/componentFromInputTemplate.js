import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import Article from '../components/Article/Article';
import Embed from '../components/Embed/Embed';
import Paragraph from '../components/Paragraph/Paragraph';
import Quote from '../components/Quote/Quote';
import RelatedArticles from '../components/RelatedArticles/RelatedArticles';
import SeriesArticles from '../components/RelatedArticles/SeriesArticles';

const inputTemplateToComponent = new Map([
  /* HeaderSlots components */
  [ 'com.htz.NavigationElementResp', () => <p>NavigationElementResp</p>, ],
  [ 'com.tm.PageTitle', () => <p>PageTitle</p>, ],
  [ 'com.htz.ArticleHeaderElement', () => <p>ArticleHeaderElement</p>, ],

  /* MainSlot components */
  [ 'com.htz.StandardArticle', Article, ],
  [ 'com.polobase.OutbrainElement', () => <p>OutbrainElement</p>, ],
  [ 'com.tm.CommentsElement', () => <p>CommentsElement</p>, ],

  /* FooterSlot components */
  [ 'com.tm.FooterElement', () => <p>FooterElement</p>, ],
  [ 'com.tm.DisclaimerElement', () => <p>DisclaimerElement</p>, ],

  /* ArticleBody components */
  [ 'embedElement', Embed, ],
  [ 'p', Paragraph, ],
  [ 'h4', Paragraph, ],
  [ 'a', Paragraph, ],
  [ 'com.htz.MagazineArticleQuote', Quote, ],
  [ 'relatedArticles', RelatedArticles, ],
  [ 'relatedArticleSeries', SeriesArticles, ],

  /* Misc components */
  [ 'com.tm.Image', () => <p>Image</p>, ],
  [ 'com.tm.HtmlElement', () => <p>HtmlElement</p>, ],
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
export default inputTemplate => inputTemplateToComponent.get(inputTemplate);
