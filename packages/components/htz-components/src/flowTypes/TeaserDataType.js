// @flow
// import type { AuthorDataType, } from './AuthorDataType';
import type { ImageDataType, } from './ImageDataType';
import type { HTMLEmbedDataType, } from './HTMLEmbedDataType';
import type { GalleryDataType, } from './GalleryDataType';

export type TeaserDataType = {
  authorImage?: ?ImageDataType,
  authors?: ?({
    name: string,
    url?: ?string,
  }[]),
  commentsCounts?: number,
  contentId: string,
  exclusive?: ?string,
  exclusiveMobile?: ?string,
  firstParagraph?: ?string,
  hash?: ?string,
  image?: ?ImageDataType,
  media?: ?ImageDataType | HTMLEmbedDataType | GalleryDataType,
  isPremiumContent?: ?boolean,
  lastUpdate?: ?number,
  leadText?: ?string,
  mediaFlags?: { video?: boolean, html_embed?: boolean, gallery?: boolean, },
  path: string,
  publishDate?: ?number,
  rank?: ?number,
  relatedArticles?: ?({ contentId: string, path: string, title: string, }[]),
  reportingFrom?: ?string,
  representedContent?: ?string,
  subtitle?: ?string,
  subtitleMobile?: ?string,
  title: string,
  titleMobile?: ?string,
  tixwise?: ?string,
};
