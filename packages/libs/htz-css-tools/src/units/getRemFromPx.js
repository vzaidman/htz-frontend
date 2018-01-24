/* @flow */
import type { WidthBpsConfig, } from '../mq/mq';
import type { TypeConf, } from '../typography/confTypes';

/**
 * Convert a number in pixels to its equivalent in rems,
 * based on passed configuration objects.
 *
 * **WARNING:** Has a dependency on `window`, and `window.matchMedia`
 *   so can only run in environments where those are available or
 *   polyfilled, e.g., _NOT_ on the server.
 *
 * @param widthBps
 *   An object containing named width-breakpoints as keys, and a number representing
 *   their width in pixels as values.
 * @param typeConf
 *   A hash of typographic options per breakpoint
 * @param pxValue
 *   The number of pixels to convert to `rem`
 *
 * @return - The number of rems `pxValue` is at the current breakpoint
 *
 * @example
 * // Assuming `default` breakpoint is `0`, and its `rhythmUnit` is `6`
 * // and `l` breakpoint is `1024` and its `rhythmUnit` is `7`
 * getRemFromPx(widths, typeConf, 16)
 * // => returns `2.28571428571` when the window is `1024px` or
 * //    more in width, and `2.666666667` when it is narrower
 */
export default function getRemFromPx(
  widthBps: WidthBpsConfig,
  typeConf: TypeConf,
  pxValue: number
): number | void {
  const typeConfBps = Object.keys(typeConf).sort(
    (a: string, b: string) => (a === 'default' ? 1 : widthBps[b] - widthBps[a])
  );

  const typeBpsWidths = typeConfBps.reduce(
    (widths, bp) => ({
      ...widths,
      ...(bp === 'default'
        ? { default: '0px', }
        : { [bp]: `${widthBps[bp] / 16}em`, }),
    }),
    {}
  );

  for (const bp of typeConfBps) {
    // eslint-disable-next-line no-undef
    const bpMatches = window.matchMedia(`(min-width: ${typeBpsWidths[bp]})`)
      .matches;

    if (bpMatches) return pxValue / typeConf[bp].rhythmUnit;
  }

  return undefined;
}
