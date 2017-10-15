/* @flow */

import getLinesWithPadding from './getLinesWithPadding';

/**
 * Get a line height that conforms to a vertical rhythm for a specific font-size
 *
 * @param {number} fontSize - The `font-size` for which to calculate `line-height`.
 * @param {number} [rhythmUnit] - The basic unit used to set the verticl rhythm to which the
 *   `line-height` should conform.
 * @param {number} [minPadding] - The minimal amount of padding (in pixels) each line
 *   should have below and above the text.
 *   A `font-size`'s `line-height` must, at minimum, conform to:
 *   `(lineHeight - fontSize) / 2  >= minPadding`.
 * @returns {number} - The `line-height` in pixels.
 *
 * @private
 */
export default function getLineHeight(
  fontSize: number,
  rhythmUnit: number = 6,
  minPadding: number = 2
): number {
  const fontSizeLineSpan = Math.ceil(fontSize / rhythmUnit);
  const lines = getLinesWithPadding(
    fontSize,
    fontSizeLineSpan,
    rhythmUnit,
    minPadding
  );

  return lines * rhythmUnit;
}
