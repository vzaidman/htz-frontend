// eslint-disable-next-line import/no-named-as-default
import Article from '../components/Article/Article';
import Embed from '../components/Embed/Embed';
import Footer from '../components/PageLayout/slots/Footer';
import Header from '../components/PageLayout/slots/Header';
import Main from '../components/PageLayout/slots/Main';
import Paragraph from '../components/Paragraph/Paragraph';
import PostHeader from '../components/PageLayout/slots/PostHeader';
import PostMain from '../components/PageLayout/slots/PostMain';
import PreHeader from '../components/PageLayout/slots/PreHeader';
import Quote from '../components/Quote/Quote';
import RelatedArticles from '../components/RelatedArticles/RelatedArticles';
import SeriesArticles from '../components/RelatedArticles/SeriesArticles';

const inputTemplateToComponent = new Map([
  /* PageLayout components */
  [ 'preHeader', PreHeader, ],
  [ 'header', Header, ],
  [ 'postHeader', PostHeader, ],
  [ 'main', Main, ],
  [ 'postMain', PostMain, ],
  [ 'footer', Footer, ],

  /* HeaderSlots components */
  [ 'com.htz.NavigationElementResp', () => (<p>NavigationElementResp</p>), ],
  [ 'com.tm.PageTitle', () => (<p>PageTitle</p>), ],
  [ 'com.htz.ArticleHeaderElement', () => (<p>ArticleHeaderElement</p>), ],

  /* MainSlot components */
  [ 'com.htz.StandardArticle', Article, ],
  [ 'com.polobase.OutbrainElement', () => (<p>OutbrainElement</p>), ],
  [ 'com.tm.CommentsElement', () => (<p>CommentsElement</p>), ],

  /* FooterSlot components */
  [ 'com.tm.FooterElement', () => (<p>FooterElement</p>), ],

  /* ArticleBody components */
  [ 'embedElement', Embed, ],
  [ 'p', Paragraph, ],
  [ 'h4', Paragraph, ],
  [ 'a', Paragraph, ],
  [ 'com.htz.MagazineArticleQuote', Quote, ],
  [ 'relatedArticles', RelatedArticles, ],
  [ 'relatedArticleSeries', SeriesArticles, ],

  /* Misc components */
  [ 'com.tm.Image', () => (<p>Image</p>), ],
  [ 'com.tm.HtmlElement', () => (<p>HtmlElement</p>), ],
  [ 'com.tm.ListElement', () => (<p>ListElement</p>), ],
  [ 'com.mouse.ChronicalBoardElement', () => (<p>ChronicalBoardElement</p>), ],
  [ 'com.tm.ElementGroup', () => (<p>ElementGroup</p>), ],
  [ 'com.polobase.DfpBannerElement', () => (<p>DfpBannerElement</p>), ],
  [ 'com.polobase.ClickTrackerBannersWrapper', () => (<p>ClickTrackerBannersWrapper</p>), ],
  [ null, null, ],
]);
export default inputTemplate => inputTemplateToComponent.get(inputTemplate);
