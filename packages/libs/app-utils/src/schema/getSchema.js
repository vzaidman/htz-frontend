import clickTrackerBannersWrapper from './types/click_tracker_banner_wrapper_type';
import dfpBanner from './types/dfp_banner_type';
import elementGroup from './types/element_group_type';
import embed from './types/embed_type';
import gridElementGroup from './types/grid_element_group_type';
import htmlElement from './types/html_element_type';
import image from './types/image_type';
import imageGallery from './types/image_gallery_type';
import interactive from './types/interactive_type';
import link from './types/link_type';
import list from './types/list_type';
import mobileQuickRegistrationType from './types/mobile_quick_registration_type';
import paragraph from './types/paragraph_type';
import relatedArticles from './types/related_articles_type';
import seriesOrBlockArticles from './types/series_or_block_articles_type';
import quote from './types/quote_type';
import tags from './types/tags_type';
import video from './types/video_type';

const types = new Map([
  [ 'com.polobase.ClickTrackerBannersWrapper', clickTrackerBannersWrapper, ],
  [ 'com.polobase.DfpBannerElement', dfpBanner, ],
  [ 'com.tm.ElementGroup', elementGroup, ],
  [ 'embedElement', embed, ],
  [ 'com.tm.GridElementGroup', gridElementGroup, ],
  [ 'com.tm.HtmlElement', htmlElement, ],
  [ 'com.tm.Image', image, ],
  [ 'com.tm.ImageGalleryElement', imageGallery, ],
  [ 'interactiveElement', interactive, ],
  [ 'com.tm.Link', link, ],
  [ 'com.tm.element.List', list, ],
  [ 'com.polobase.quickNewsletterRegistration', mobileQuickRegistrationType, ],
  [ 'paragraph', paragraph, ],
  [ 'relatedArticles', relatedArticles, ],
  [ 'relatedArticleSeries', seriesOrBlockArticles, ],
  [ 'linksBlock', seriesOrBlockArticles, ],
  [ 'com.htz.MagazineArticleQuote', quote, ],
  [ 'tagsElement', tags, ],
  [ 'com.tm.Video', video, ],
]);

export default inputTemplate => types.get(inputTemplate);
