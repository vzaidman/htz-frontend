import withData from './apollo/withData';
import pagePropTypes from './apollo/pagePropTypes';
import schema from './schema/schema';
import breakUrl from './utils/breakUrl';
import switchToDomain from './utils/switchToDomain';

// Schema Fragments
import articleHeader from './fragments/articleHeader/articleHeader';
import author from './fragments/author/author';
import breadcrumbs from './fragments/breadcrumbs/breadcrumbs';
import clickTrackerBanner from './fragments/clickTrackerBanner/clickTrackerBanner';
import clickTrackerBannersWrapper from './fragments/clickTrackerBannersWrapper/clickTrackerBannersWrapper';
import content from './fragments/content/content';
import dfpBanner from './fragments/dfpBanner/dfpBanner';
import embed from './fragments/embed/embed';
import htmlElement from './fragments/htmlElement/htmlElement';
import image from './fragments/image/image';
import imageGallery from './fragments/imageGallery/imageGallery';
import interactive from './fragments/interactive/interactive';
import navMenu from './fragments/navMenu/navMenu';
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
  // Schema Fragments
  articleHeader,
  author,
  breadcrumbs,
  clickTrackerBanner,
  clickTrackerBannersWrapper,
  content,
  dfpBanner,
  embed,
  htmlElement,
  image,
  imageGallery,
  interactive,
  navMenu,
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
};
