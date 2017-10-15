/* @flow */

/**
 * A util to determine the number of rhythm-lines a font-size's line-height
 * should be, while retaining minimal padding above and below.
 *
 * @param {number} fontSize
 *   The `font-size` being tested.
 * @param {number} lines
 *   The number of lines to test padding against.
 * @param {number} rhythmUnit
 *   The basic unit used to set the vertical rhythm to which the
 *   `line-height` should conform.
 * @param {number} minPadding
 *   The minimal amount of padding (in pixels) each line should have below and
 *   above the text. A `font-size`'s `line-height` must, at minimum, conform to:
 *   `(lineHeight - fontSize) / 2  >= minPadding`.
 *
 * @return {number}
 *   The number of rhythm-lines a font-size's line-height
 *   should be given minimal vertical padding.
 * @private
 */
export default function getLinesWithPadding(
  fontSize: number,
  lines: number,
  rhythmUnit: number,
  minPadding: number
): number {
  // prettier-ignore
  const addPadding = ((lines * rhythmUnit) - fontSize) < minPadding * 2;

  return addPadding
    ? getLinesWithPadding(fontSize, lines + 1, rhythmUnit, minPadding)
    : lines;
}
