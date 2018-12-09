// @flow
import type { ImageDataType, } from './ImageDataType';

export type GalleryDataType = {
  inputTemplate: string,
  name?: string,
  showTitle?: boolean,
  accessibility?: string,
  images?: ImageDataType[],
  kind: 'gallery',
};
