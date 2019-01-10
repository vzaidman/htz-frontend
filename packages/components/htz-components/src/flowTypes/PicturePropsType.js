// @flow

import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { ImageDataType, } from './ImageDataType';

type PictureTransformType = {
  aspect?: string,
  flags?: Array<string>,
  height?: string,
  isProgressive?: boolean,
  quality?: string,
  transforms?: Array<string | number>,
  width: string | number,
}

export type SourceOptionsType = {
  sizes: string,
  transforms: PictureTransformType | Array<PictureTransformType>,
};

type ImageType = {
  sourceOptions: SourceOptionsType,
  data: ?ImageDataType,
};

type SourceType = {
  from?: 's' | 'm' | 'l' | 'xl',
  until?: 's' | 'm' | 'l' | 'xl',
} & ImageType;

export type PicturePropsType = {
  attrs?: any,
  bgcolor?: string,
  defaultImg: ImageType,
  hasWrapper?: boolean,
  isPresentational?: boolean,
  lazyLoad?: boolean | string,
  miscStyles?: StyleProps,
  sources: Array<SourceType>,
}
