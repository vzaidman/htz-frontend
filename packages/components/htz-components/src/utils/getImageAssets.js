// @flow
import type { SourceOptionsType } from '../flowTypes/PicturePropsType';

export type AssetOptions = {
  aspect: string,
  sizes: string,
  widths: Array<string|number>,
};

export default function getImageAssets({sizes, aspect, widths}: AssetOptions): SourceOptionsType {
  return {
    sizes: sizes,
    transforms: widths.map(width => ({ width: width.toString(), aspect, })),
  };
}
