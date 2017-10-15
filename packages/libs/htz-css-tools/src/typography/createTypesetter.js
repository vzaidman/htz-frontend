/* @flow */

import getRhythmBpsData from '../helpers/getRhythmBpsData';
import isNamedBp from '../helpers/isNamedBp';
import { pxToRem, } from '../units/pxTo';
import { fallbackFormatter, } from '../helpers/fallbackFormatter';
import { styleFormatter, } from '../helpers/styleFormatter';
import getTypeProps from './getTypeProps';

import type { TypeConf, TypeScaleOpts, } from './confTypes';
import type { WidthBpsConfig, MqFunc, } from '../mq/mq';
import type { RhythmBpData, } from '../helpers/getRhythmBpsData';

/**
 * A CSS-in-JS object of typographic styles conforming to a global predefined
 * typographic scale and vertical rhythm.
 *
 * @property {string|string[]} fontSize
 *   A font-size in `rem`, optionally, with `px` fallback, based on the
 *   global typographic scale configuration.
 * @property {string} lineHeight
 *   A line-height in ems, based on the global vertical rhythm configuration.
 */
export type TypographicStyles = {|
  fontSize: string | string[],
  lineHeight: string | string[]
|};

/**
 * Optional options objects for `Typesetter`s
 * @param {number} [lines]
 *   The number of rhythm-lines the line-height should span.
 * @param {string} [fromBp]
 *   A named breakpoint, used for a `min-width` query
 * @param {string} [untilBp]
 *   A named breakpoint, used for a `max-width` query
 * @param {boolean} [pxFallback]
 *   Should `rem` values have `px` fallback
 *
 */
export type TypesetterOpts = {
  lines?: number,
  fromBp?: string,
  untilBp?: string,
  pxFallback?: string
};

/**
 * A function returning a CSS-in-JS object of typographic styles conforming to
 * a global predefined typographic scale and vertical rhythm.
 * **Created by `createTypesetter()`**
 *
 * @param {number} step
 *   The step in the scale to get. **The typographic scale is 0 based, so `0`
 *   base font-size** (the size that is set on `<body>`)
 * @param {TypesetterOpts} [options]
 * @param {number} [options.lines]
 *   The number of rhythm-lines the line-height should span.
 * @param {string} [options.fromBp]
 *   A named breakpoint, used for a `min-width` query
 * @param {string} [options.untilBp]
 *   A named breakpoint, used for a `max-width` query
 * @param {boolean} [options.pxFallback]
 *   Should `rem` values have `px` fallback
 *
 * @returns {TypographicStyles}
 *   A CSS-in-JS object of typographic styles conforming to a global predefined
 *   typographic scale and vertical rhythm.
 *
 * @example
 * const typesetter = createTypesetter();
 *
 * // Assuming the `m` breakpoint is `600px`,
 * // the default rhythm unit is `6px` and
 * // the default base `font-size` is `16px`:
 * typesetter(1, {until: 'm'}); // => {
 *                              // '@media (max-width; 37.5em)' {
 *                              //     fontSize: '2.6666666667rem',
 *                              //     lineHeight: '1.5em',
 *                              //   },
 *                              // };
 */
export type Typesetter = (
  step: number,
  options?: TypesetterOpts
) => TypographicStyles | { [mq: string]: TypographicStyles };

/**
 * Return a media-query-enabled function for typesetting based on
 * a global vertical rhythm and typographic scale configuration.
 *
 * @param {MqFunc} mqFunc
 *   A media query function
 * @param {TypeConf} typeConf
 *   A typographic scale and vertical rhythm configuration object
 * @param {WidthBpsConfig} bps
 *   A configuration object holding named width breakpoints
 * @param {true} [defaultPxFallback]
 *   Should the returned function generate pixel fallbacks for `rem` values
 *
 * @returns {Typesetter}
 *   A function that sets typographic styles at different breakpoints,
 *   based on the global typographic scale and vertical rhythm configuration.
 */
export default function createTypesetter(
  mqFunc: MqFunc,
  typeConf: TypeConf,
  bps: WidthBpsConfig,
  defaultPxFallback?: true
): Typesetter {
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
  const orderedRhtyhmBps = rhythmBpNames.sort(
    (a, b) => bpNamesByLength.indexOf(a) - bpNamesByLength.indexOf(b)
  );

  return function typesetter(
    step: number,
    { lines, fromBp, untilBp, pxFallback, }: TypesetterOpts = {}
  ): TypographicStyles | { [mq: string]: TypographicStyles } {
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
        const { base, steps, ratio, rhythmUnit, minPadding, } = typeConf[
          bp.rhythmBp
        ];

        const { fontSize, relativeLineHeight, } = getTypeProps({
          base,
          minPadding,
          ratio,
          rhythmUnit,
          step,
          stepsPerInterval: steps,
        });

        const lineHeight = lines
          ? generatePxFallback
            ? [ `${lines * rhythmUnit}px`, `${lines}rem`, ]
            : `${lines}rem`
          : `${relativeLineHeight}em`;

        const fontSizeInRem = pxToRem(fontSize, rhythmUnit).toString();

        const styleDeclerations = {
          ...(generatePxFallback
            ? fallbackFormatter('fontSize', [ `${fontSize}px`, fontSizeInRem, ])
            : styleFormatter('fontSize', fontSizeInRem)),
          lineHeight,
        };

        // prettier-ignore
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
