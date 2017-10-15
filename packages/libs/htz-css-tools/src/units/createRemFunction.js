/* @flow */
import getRhythmBpsData from '../helpers/getRhythmBpsData';
import isNamedBp from '../helpers/isNamedBp';
import { pxToRem, } from './pxTo';
import { fallbackFormatter, } from '../helpers/fallbackFormatter';
import { styleFormatter, } from '../helpers/styleFormatter';

import type { MqFunc, WidthBpsConfig, } from '../mq/mq';
import type { TypeConf, TypeScaleOpts, } from '../typography/confTypes.js';
import type { RhythmBpData, } from '../helpers/getRhythmBpsData';

/**
    * A function that converts px values to rems at given breakpoints
    * while accounting to changes in vertical rhythm.
    *
    * @param {string} property - A CSS property
    * @param {number|number[]} value - The value(s), in `px` to convert to `rem`
    * @param {string} [fromBp] - A named breakpoint, used for a `min-width` query
    * @param {string} [untilBp] - A named breakpoint, used for a `max-width` query
    * @param {boolean} [pxFallback] - Should `rem` values have `px` fallback
    *
    * @return {Object} - A css-in-js styles object with `px` values converted to `rem`
    *   (with or without `px` fallback)
    */
export type RemFunctionType = (
  property: string,
  value: number | number[],
  fromBp?: string,
  untilBp?: string,
  pxFallback?: boolean
) => Object;

/**
 * Return a media-query-enabled function for converting `px`
 * values to `rem` based on a global vertical rhythm configuration.
 *
 * @param mqFunc
 *   A media query function.
 * @param typeConf
 *   A typographic scale and vertical rhythm configuration object
 * @param bps
 *   A configuration object holding named width breakpoints
 * @param {true} [defultPxFallback]
 *   Should the returned function generate pixel fallbacks for `rem` values
 *
 * @return {remFunction}
 *   A function that converts `px` values to rems at given breakpoints
 *   while accounting to changes in the vertical rhythm.
 */
export default function createRemFunction(
  mqFunc: MqFunc,
  typeConf: TypeConf,
  bps: WidthBpsConfig,
  defaultPxFallback?: true
): RemFunctionType {
  const rhythmBpNames = Object.keys(typeConf);

  // An array of width breakpoint names, sorted in ascending order by length.
  const bpNamesByLength = [
    'default',
    ...Object.keys(bps).sort((a, b) => bps[a] - bps[b]),
  ];

  // Make sure all rhythmBps are actual named-breakpoints
  isNamedBp(rhythmBpNames, bpNamesByLength, true);

  // An array of breakpoint names with rhythm settings,
  // sorted in the same order as `orderedBpsByLength`
  //
  const orderedRhtyhmBps = rhythmBpNames.sort(
    (a, b) => bpNamesByLength.indexOf(a) - bpNamesByLength.indexOf(b)
  );

  return function remFunction(
    property: string,
    value: number | number[],
    fromBp?: string,
    untilBp?: string,
    pxFallback?: boolean
  ): Object {
    const generatePxFallback =
      pxFallback || (pxFallback === undefined && defaultPxFallback);
    const bpsData = getRhythmBpsData(
      bpNamesByLength,
      orderedRhtyhmBps,
      fromBp === 'default' ? undefined : fromBp,
      untilBp
    );

    return bpsData.reduce(
      (
        allStyles: Object,
        bp: TypeScaleOpts,
        i: number,
        allBpsData: RhythmBpData[]
      ): Object => {
        const rhythmUnit = typeConf[bp.rhythmBp].rhythmUnit;
        const valInPx = valToPx(value);
        const valInRem = pxToRem(value, rhythmUnit).toString();
        const styleDeclerations = generatePxFallback
          ? fallbackFormatter(property, [ valInPx, valInRem, ])
          : styleFormatter(property, valInRem);

        return {
          ...allStyles,
          ...(bp.from || bp.until
            ? mqFunc({ from: bp.from, until: bp.until, }, styleDeclerations)
            : styleDeclerations),
        };
      },
      {}
    );
  };
}

// ///////////////// //
//  Private Helpers  //
// ///////////////// //
function valToPx(val: number | number[]): string {
  return Array.isArray(val)
    ? val.map(item => valToPx(item)).join(' ')
    : `${val}px`;
}
