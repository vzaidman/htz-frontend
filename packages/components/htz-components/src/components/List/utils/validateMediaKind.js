// @flow

import type { ImageDataType, } from '../../../flowTypes/ImageDataType';
import type { HTMLEmbedDataType, } from '../../../flowTypes/HTMLEmbedDataType';
import type { GalleryDataType, } from '../../../flowTypes/GalleryDataType';

type MediaType = ImageDataType | HTMLEmbedDataType | GalleryDataType;

export function isImage(media: MediaType): %checks {
  return media.kind === 'image';
}
export function isEmbed(media: MediaType): %checks {
  return media.kind === 'embed';
}
export function isGallery(media: MediaType): %checks {
  return media.kind === 'gallery';
}
