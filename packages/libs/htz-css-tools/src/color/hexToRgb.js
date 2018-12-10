// @flow

/**
 * convert a hex color into an array of RGB
 *
 * @param {string} hex
 *   A hex color string of 3 or 6 values, either with a `#` prefix or without
 * @return {number[]} An array of three numbers, each in the range of 0-255,
 *   represneting RGB channel data.
 */
export default function hexToRgbArray(hex: string): ?(number[]) {
  const sharplessHex = hex[0] === '#' ? hex.slice(1) : hex;
  if (![ 3, 6, ].includes(sharplessHex.length)) {
    return null;
  }
  const hexArray = sharplessHex.length === 3
    ? sharplessHex.split('').map(char => char + char)
    : sharplessHex.match(/.{2}/g);

  // $FlowFixMe
  return hexArray.map(channel => parseInt(channel, 16));
}
