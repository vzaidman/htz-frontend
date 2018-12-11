// @flow

import hexToRgbArray from './hexToRgb';
import hslStringToRgbArray from './hslStringToRgbArray';
import rgbStringToArray from './rgbStringToArray';

/**
 * Add opacity to rgb, hex and hsl colors
 *
 * @param {string} color
 *   The color to add alpha channel opacity to
 * @param {number} opacity
 *   A number between 0 and 1
 *
 * @return {string} the opicified color in rgba
 */
export default function rgba(color: string, opacity: number): ?string {
  if (
    typeof color !== 'string'
    || (opacity != null && typeof opacity !== 'number')
  ) {
    return null;
  }

  if (color.startsWith('rgba(') || color.startsWith('hsla(')) return color;

  const alpha = opacity == null ? 1 : Math.max(Math.min(opacity, 1), 0);
  const colorMode = color.startsWith('rgb(')
    ? 'rgb'
    : color.startsWith('hsl(')
      ? 'hsl'
      : 'hex';

  const colorFn = pickColorFunction(colorMode);
  const rgbArray = colorFn(color);

  return rgbArray ? `rgba(${rgbArray.toString()},${alpha})` : null;
}

function pickColorFunction(colorMode: string): (color: string) => number[] {
  const fnEquiv = {
    rgb: rgbStringToArray,
    hsl: hslStringToRgbArray,
    hex: hexToRgbArray,
  };
  return fnEquiv[colorMode];
}
