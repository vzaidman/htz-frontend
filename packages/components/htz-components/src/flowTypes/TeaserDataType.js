// @flow
// import type { AuthorDataType, } from './AuthorDataType';
import type { ImageDataType, } from './ImageDataType';
import type { HTMLEmbedDataType, } from './HTMLEmbedDataType';
import type { GalleryDataType, } from './GalleryDataType';

export type TeaserDataType = {
  authorImage?: ?ImageDataType,
  authors?: ?({
    contentName: string,
    url?: ?string,
  }[]),
  commentsCounts?: number,
  contentId: string,
  exclusive?: ?string,
  exclusiveMobile?: ?string,
  firstParagraph?: ?string,
  hash?: ?string,
  image?: ?ImageDataType,
  inputTemplate?: string,
  media?: ?ImageDataType | HTMLEmbedDataType | GalleryDataType,
  isPremiumContent?: ?boolean,
  lastUpdate?: ?number,
  leadText?: ?string,
  inputTemplate: 'com.tm.TeaserData',
  mediaFlags?: { video?: boolean, html_embed?: boolean, gallery?: boolean, },
  path: string,
  publishDate?: ?number,
  rank?: ?number,
  relatedArticles?: ?({ contentId: string, path: string, title: string, }[]),
  reportingFrom?: ?string,
  representedContent: string,
  representedContentType: ?string,
  subtitle?: ?string,
  subtitleMobile?: ?string,
  title: string,
  titleMobile?: ?string,
  tixwise?: ?string,
  __typename?: string,
};
