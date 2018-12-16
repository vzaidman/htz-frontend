// @flow
import { getMqString, } from '@haaretz/htz-css-tools';
import type { BpsConfig, } from '@haaretz/htz-css-tools';

import type { SourceOptionsType, } from '../flowTypes/PicturePropsType';

export type AssetOptions = {
  aspect: string,
  sizes: string | Array<{ from?: string, size: string, }>,
  widths: Array<string | number>,
};

type AssetOptionsWithBps = AssetOptions & { bps: BpsConfig, };

export default function getImageAssets({
  bps,
  sizes,
  aspect,
  widths,
}: AssetOptionsWithBps): SourceOptionsType {
  const sizesString = typeof sizes === 'string'
    ? sizes
    : sizes.reduce(
      (result, sizeOpts, i) => `${result}${
        sizeOpts.from
          ? `${getMqString(bps, { from: sizeOpts.from, }, true)} ${
            sizeOpts.size
          }`
          : sizeOpts.size
      }${i === sizes.length - 1 ? '' : ','}`,
      ''
    );

  return {
    sizes: sizesString,
    transforms: widths.map(width => ({ width: width.toString(), aspect, })),
  };
}
