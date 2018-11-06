import withData from './apollo/withData';
import pagePropTypes from './apollo/pagePropTypes';
import schema from './schema/schema';
import breakUrl from './utils/breakUrl';
import switchToDomain from './utils/switchToDomain';
import createLogger from './utils/createLogger';
import jsonGenerator from './jsonGenerator/jsonGenerator';
import intersperse from './utils/intersperse';

// JSON Maps
import assetMap from './jsonGenerator/jsonMaps/asset';
import assetsMap from './jsonGenerator/jsonMaps/assets';
import financeSearchMap from './jsonGenerator/jsonMaps/financeSearch';
import lineGraphMap from './jsonGenerator/jsonMaps/lineGraph';
import scatterGraphMap from './jsonGenerator/jsonMaps/scatterGraph';
import quoteMap from './jsonGenerator/jsonMaps/quote';

// Schema Fragments
import articleHeader from './fragments/articleHeader/articleHeader';
import author from './fragments/author/author';
import breadcrumbs from './fragments/breadcrumbs/breadcrumbs';
import changeableElementGroup from './fragments/changeableElementGroup/changeableElementGroup';
import clickTrackerBanner from './fragments/clickTrackerBanner/clickTrackerBanner';
import clickTrackerBannersWrapper from './fragments/clickTrackerBannersWrapper/clickTrackerBannersWrapper';
import content from './fragments/content/content';
import dfpBanner from './fragments/dfpBanner/dfpBanner';
import elementGroup from './fragments/elementGroup/elementGroup';
import embed from './fragments/embed/embed';
import htmlElement from './fragments/htmlElement/htmlElement';
import image from './fragments/image/image';
import imageGallery from './fragments/imageGallery/imageGallery';
import interactive from './fragments/interactive/interactive';
import link from './fragments/link/link';
import list from './fragments/list/list';
import mobileQuickRegistration from './fragments/mobileQuickRegistration/mobileQuickRegistration';
import navMenu from './fragments/navMenu/navMenu';
import newsLetter from './fragments/newsLetter/newsLetter';
import paragraph from './fragments/paragraph/paragraph';
import quote from './fragments/quote/quote';
import relatedArticles from './fragments/relatedArticles/relatedArticles';
import seoData from './fragments/seoData/seoData';
import seriesOrBlockArticles from './fragments/seriesOrBlockArticles/seriesOrBlockArticles';
import tag from './fragments/tag/tag';
import tags from './fragments/tags/tags';
import teaser, {
  teaserForLeftElement,
  teaserForBender,
} from './fragments/teaser/teaser';
import video from './fragments/video/video';

export {
  withData,
  pagePropTypes,
  schema,
  jsonGenerator,
  intersperse,
  // JSON Maps
  assetMap,
  assetsMap,
  financeSearchMap,
  lineGraphMap,
  scatterGraphMap,
  quoteMap,
  // Schema Fragments
  articleHeader,
  author,
  breadcrumbs,
  changeableElementGroup,
  clickTrackerBanner,
  clickTrackerBannersWrapper,
  content,
  dfpBanner,
  elementGroup,
  embed,
  htmlElement,
  image,
  imageGallery,
  interactive,
  link,
  list,
  mobileQuickRegistration,
  navMenu,
  newsLetter,
  paragraph,
  quote,
  relatedArticles,
  seoData,
  seriesOrBlockArticles,
  tag,
  tags,
  teaser,
  teaserForBender,
  teaserForLeftElement,
  video,
  switchToDomain,
  breakUrl,
  createLogger,
};
