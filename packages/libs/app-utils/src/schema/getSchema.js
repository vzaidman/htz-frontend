import HeaderNewsGroup from './types/header_news_group_type';
import MainBlock from './types/main_block_type';
import MiddleRuller from './types/middle_ruller_type';
import TabViewElement from './types/tab_view_element_type';
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
import mobileListWrapper from './types/mobile_list_wrapper_type';
import mobileQuickRegistrationType from './types/mobile_quick_registration_type';
import newsLetter from './types/news_letter_type';
import nullFallback from './types/null_fallback_type';
import paragraph from './types/paragraph_type';
import quote from './types/quote_type';
import relatedArticles from './types/related_articles_type';
import seriesOrBlockArticles from './types/series_or_block_articles_type';
import tableScore from './types/table_score_type';
import tags from './types/tags_type';
import video from './types/video_type';

const types = new Map([
  [ 'com.htz.MagazineArticleQuote', quote, ],
  [ 'com.htz.PageMainBlockElement', MainBlock, ],
  [ 'com.htz.magazineArticleDfpBannerElement', dfpBanner, ],
  [ 'com.polobase.ClickTrackerBannersWrapper', clickTrackerBannersWrapper, ],
  [ 'com.polobase.DfpBannerElement', dfpBanner, ],
  [ 'com.polobase.quickNewsletterRegistration', mobileQuickRegistrationType, ],
  [ 'com.polobase.whtzMobileSiteListsWrapper', mobileListWrapper, ],
  [ 'com.tm.BlogImage', image, ],
  [ 'com.tm.ElementGroup', elementGroup, ],
  [ 'com.tm.GridElementGroup', gridElementGroup, ],
  [ 'com.tm.HeaderNewsGroup', HeaderNewsGroup, ],
  [ 'com.tm.HtmlElement', htmlElement, ],
  [ 'com.tm.Image', image, ],
  [ 'com.tm.ImageGalleryElement', imageGallery, ],
  [ 'com.tm.Link', link, ],
  [ 'com.tm.TabViewElement', TabViewElement, ],
  [ 'com.tm.TableScore', tableScore, ],
  [ 'com.tm.Video', video, ],
  [ 'com.tm.element.List', list, ],
  [ 'com.tm.newsLetterQuickRegistrationRespAuto', newsLetter, ],
  [ 'com.tm.promotion.banner.MiddleRuler', MiddleRuller, ],
  [ 'embed', embed, ],
  [ 'error', nullFallback, ],
  [ 'gallery', imageGallery, ],
  [ 'image', image, ],
  [ 'interactiveElement', interactive, ],
  [ 'linksBlock', seriesOrBlockArticles, ],
  [ 'paragraph', paragraph, ],
  [ 'relatedArticleSeries', seriesOrBlockArticles, ],
  [ 'relatedArticles', relatedArticles, ],
  [ 'tagsElement', tags, ],
  [ 'video', video, ],
]);

// What the fucking fuck?!
// types.get('com.tm.element.List') doesn't get the map item
export default inputTemplate => (inputTemplate === 'com.tm.element.List' ? list : types.get(inputTemplate));
