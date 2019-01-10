// @flow
import type { BpsConfig, } from '@haaretz/htz-css-tools';

import getImageAssets from './getImageAssets';

import type { PicturePropsType, } from '../flowTypes/PicturePropsType';
import type { ImageDataType, } from '../flowTypes/ImageDataType';
import type { AssetOptions, } from './getImageAssets';

type SourceType = AssetOptions & {
  from?: "s" | "m" | "l" | "xl",
  until?: "s" | "m" | "l" | "xl",
};

type PictureAssetPropsType = {
  bps: BpsConfig,
  imgData: ?ImageDataType,
  defaultImgOptions: AssetOptions,
  sources: SourceType[],
};
export default function pictureAssetProps({
  bps,
  imgData,
  defaultImgOptions,
  sources,
}: PictureAssetPropsType): PicturePropsType {
  return {
    defaultImg: {
      sourceOptions: getImageAssets({
        bps,
        sizes: defaultImgOptions.sizes,
        aspect: defaultImgOptions.aspect,
        widths: defaultImgOptions.widths,
      }),
      data: imgData,
    },
    sources: sources.map((source: SourceType) => ({
      data: imgData,
      sourceOptions: getImageAssets({
        bps,
        sizes: source.sizes,
        aspect: source.aspect,
        widths: source.widths,
      }),
      from: source.from,
      until: source.until,
    })),
  };
}
