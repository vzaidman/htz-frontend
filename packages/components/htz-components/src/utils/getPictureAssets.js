// @flow
import getImageAssets from './getImageAssets';

import type { PicturePropsType, } from '../flowTypes/PicturePropsType';
import type { ImageDataType, } from '../flowTypes/ImageDataType';
import type { AssetOptions, } from './getImageAssets';

type SourceType = AssetOptions & {
  from: 's' | 'm' | 'l' | 'xl',
};

type PictureAssetPropsType ={
  imgData: ImageDataType,
  defaultImgOptions: AssetOptions,
  sources: SourceType[],
}
export default function pictureAssetProps({
  imgData,
  defaultImgOptions,
  sources,
}: PictureAssetPropsType): PicturePropsType {
  return {
    defaultImg: {
      sourceOptions: getImageAssets({
        sizes: defaultImgOptions.sizes,
        aspect: defaultImgOptions.aspect,
        widths: defaultImgOptions.widths
      }),
      data: imgData,
    },
    sources: sources.map((source: SourceType) => ({
      data: imgData,
      sourceOptions: getImageAssets({
        sizes: source.sizes,
        aspect: source.aspect,
        widths: source.widths,
      }),
      from: source.from,
    })),
  };
}


