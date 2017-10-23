/* @flow */
// import { hsla, rgba, } from 'polished';

/**
 * A themed color palette
 * @typedef {Object} ColorPalette
 * @prop {string|string[]|ColorPalette} [colorName]
 *   The value of a named-color, a reference to another named-color (or color
 *   variant), or color-variant definitions.
 *   <ul>
 *   </ul>
 *     <li>
 *       A <code>string</code> will be interpreted as a reference to another
 *       named-color, or the straight up value of the named-color.
 *     </li>
 *     <li>
 *       An <code>Array</code> of <code>string</code>s can be used to pass
 *       references to a variant of
 *       a named-color. The item in position <code>0</code> of the array points
 *       to the referenced named-color, and the <em>optional</em> item in
 *       position <code>1</code> points to a named-color's variant name.
 *     </li>
 *     <li>
 *       A nested <code>ColorPalette</code> object is used to define variants
 *       of a color.
 *     </li>
 */
export type ColorPalette = {
  [colorName: string]: string | string[] | ColorPalette
};

/**
 * Get a color from a predefined color palette
 *
 * @param {string} color - A named-color to get the value of from the palette
 * @param {false|string} [variant=false] - A named variant of `color` to get from the palette.
 *   When `color` has variants, but variant is `false`, the `base` variant will be used by default.
 * @param {ColorPalette} [altColorPalette] - an alternative palette in place of the default one to
 *   get a color from. Can be Useful when using external elements the should be
 *   styled differently from branded elements.
 *
 * @return {string} - A CSS color value
 */
export type ColorGetter = (
  color: string,
  variant?: false | string,
  altColorPalette?: ColorPalette
) => string;

/**
 * Create a function that returns the value of named-colors based on a
 * preconfigured theme.
 *
 * @param colorPalette - The preconfigured theme which the returned
 *   function will be resolving color values from.
 *
 * @return - a function that returns the value of named-colors based on a
 *   preconfigured theme.
 */
export default function createColorGetter(
  colorPalette: ColorPalette
): ColorGetter {
  if (Array.isArray(colorPalette) || typeof colorPalette !== 'object') {
    throw new Error(
      'Cannot create a "colorGetter" function without a "colorPallete".'
    );
  }
  return function colorGetter(
    color: string,
    variant?: false | string = false,
    altColorPalette?: Object
  ): string {
    const palette = altColorPalette || colorPalette;

    const colorFromPalette = variant
      ? typeof palette[color] === 'object' && !Array.isArray(palette[color])
        ? palette[color][variant]
        : undefined
      : palette[color];

    if (variant && Array.isArray(palette[color])) {
      throw new Error(
        `"${color}" is an array ([ ${palette[
          color
        ].toString()}, ]). Cannot retrieve "${variant}" from it.`
      );
    }

    if (typeof colorFromPalette !== 'undefined') {
      // Recurse if `color` is a reference to another color in the palette
      if (Array.isArray(colorFromPalette)) {
        return colorGetter(
          colorFromPalette[0],
          colorFromPalette[1] || 'base',
          altColorPalette || undefined
        );
      }
      if (typeof colorFromPalette === 'object') {
        if (colorFromPalette.color) {
          return colorGetter(
            colorFromPalette.color,
            colorFromPalette.variant || 'base',
            altColorPalette || undefined
          );
        }

        const retValue = colorFromPalette[variant || 'base'];
        if (typeof retValue === 'string') {
          return retValue;
        }
        if (Array.isArray(retValue)) {
          return colorGetter(
            retValue[0],
            retValue[1],
            altColorPalette || undefined
          );
        }
        return colorGetter(
          retValue.color,
          retValue.variant || 'base',
          altColorPalette || undefined
        );
      }
      if (typeof colorFromPalette === 'string') {
        if (typeof palette[colorFromPalette] === 'string') {
          return colorGetter(
            colorFromPalette,
            false,
            altColorPalette || undefined
          );
        }

        // Otherwise just return as is
        return colorFromPalette;
      }

      throw new Error(
        `Your color palette object is malformed. A color cannot be a "${typeof colorFromPalette}"`
      );
    }

    // Throw if no color found
    throw new Error(
      `"${variant
        ? `${color}['${variant}']`
        : color}" is not a named-color in your color palette`
    );
  };
}
