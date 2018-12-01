// @flow
import type { ImageDataType, } from './ImageDataType';

export type GalleryDataType = {
  name?: string,
  showTitle?: boolean,
  accessibility?: string,
  images?: ImageDataType[],
};
