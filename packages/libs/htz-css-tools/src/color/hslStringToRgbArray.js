// @flow

/**
 * Converts an HSL string value to an array of RGB channels.
 *
 * @param {string} hslString
 *   A css hsl color string, with hue being a number between 0 and 360
 *   and saturation and lightness being percentage values
 * @return {number[]} An array of three numbers, each in the range of 0-255,
 *   represneting RGB channel data.
 */
export default function hslStringToRgbArray(hslString: string): number[] {
  const [ h, s, l, ] = hslString
    .slice(4, -1)
    .split(',')
    .map((channel, idx) => parseInt(channel, 10) / (idx > 0 ? 100 : 360));

  let r;
  let g;
  let b;

  if (s === 0) {
    // achromatic
    r = l;
    g = l;
    b = l;
  }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), ];
}

function hue2rgb(p: number, q: number, t: number): number {
  const adjustedT = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
  if (adjustedT < 1 / 6) return p + (q - p) * 6 * adjustedT;
  if (adjustedT < 1 / 2) return q;
  if (adjustedT < 2 / 3) return p + (q - p) * (2 / 3 - adjustedT) * 6;

  return p;
}
