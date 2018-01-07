/* @flow */

import type { Typesetter, } from '../typography/createTypesetter';

// ////////////////////////////////////////////////////////////////// //
//                               TYPES                                //
// ////////////////////////////////////////////////////////////////// //

/**
 * the typographic value eventually passed to the typesetter function.
 *
 * Either a number representing a step in the typographic scale,
 * or an object with `step` (mandatory) and `lines` (optional)
 * keys. The `lines` key, if provided, overrides the default
 * number of vertical rhythm lines each line of text occupies.
 */
export type TypographyValueType = number | { step: number, lines?: number };

/**
 * The shape of a single item when the value of a typographic
 * prop needs to change between breakpoints.
 *
 * @prop {string} [from] - A named min-width breakpoint
 * @prop {string} [until] - A named max-width breakpoint
 * @prop {TypographyValueType} value - The value to apply at given breakpoint
 */
export type TypographyPropResponsiveObjectType = {
  from?: string,
  until?: string,
  value: TypographyValueType
};

/**
 * The shape of values passed to a typographic prop of a
 * React component
 *
 * When an array, each item will be used to apply values in
 * specific breakpoint ranges.
 */
export type TypographyPropType =
  | TypographyValueType
  | TypographyPropResponsiveObjectType[];

// //////////////////////////////////////////////////////////////////////
//                          Public function                           //
// //////////////////////////////////////////////////////////////////////

/**
 * Parse the value passed to a typographic prop on a React component
 * and return a CSS-inJS object.
 *
 * Always use inside a Fela extend array, so that media queries
 * returned by this function extend exisiting media queries
 * rather than clobber them.
 *
 * @param {TypographyPropType} propValues
 *   The values passed to the props on the React component.
 *   When an array, each item will be used to apply values in
 *   specific breakpoint ranges.
 * @param {Typesetter} typesetter
 *   A typesetter function to create a CSS-in-JS object based on
 *   an apps configuration.
 *
 * @returns {Object} A CSS-in-JS object with typographic definitions
 *
 * @example
 * // Usage inside a Fela style function in a component that
 * // takes a `type` prop setting its typography.
 * const styles = ({
 *   type = [
 *     { until: 's', value: 1, },
 *     { from: 's', value: {step: 2, lines: 5, }, },
 *   ],
 *   theme,
 * }) => ({
 *   extend: [
 *     parseTypographyProp(type, theme.type);
 *   ]
 * });
 */
export default function parseTypographyProp(
  propValues: TypographyPropType,
  typesetter: Typesetter
): Object {
  return Array.isArray(propValues)
    ? propValues.reduce(
      (styles, item) => ({
        ...styles,
        ...createTypeStyles(item, typesetter),
      }),
      {}
    )
    : createTypeStyles(propValues, typesetter);
}

// ///////////////////////////////////////////////////////////////// //
//                         PRIVATE FUNCTIONS                         //
// ///////////////////////////////////////////////////////////////// //

function createTypeStyles(
  typographicValues: TypographyValueType | TypographyPropResponsiveObjectType,
  typesetter: Typesetter
): Object {
  // Plain number
  if (typeof typographicValues === 'number') {
    return typesetter(typographicValues);
  }

  // Invalid
  if (!isTypographyObject(typographicValues)) return {};

  // Responsive object
  if (typographicValues.value) {
    const lines = typographicValues.value.lines
      ? typographicValues.value.lines
      : undefined;
    const fromBp = typographicValues.from || undefined;
    const untilBp = typographicValues.until || undefined;
    return typesetter(
      typeof typographicValues.value === 'number'
        ? typographicValues.value
        : // We already checked, `typographicValues.value` is a `TypographyValueType`
        // object and thus has a `step` key
        // $FlowFixMe
        typographicValues.value.step,
      // Lines, fromBp and untilBp in this case are always the correct type
      // $FlowFixMe
      { lines, fromBp, untilBp, }
    );
  }

  // Non responsive object
  return typesetter(
    // We already checked, `typographicValues` is a `TypographyValueType` object
    // and thus has a `step` key
    // $FlowFixMe
    typographicValues.step,
    typeof typographicValues.lines === 'number'
      ? { lines: typographicValues.lines, }
      : { lines: undefined, }
  );
}

function isTypographyObject(candidate: Object): boolean {
  const candidateKeys = Object.keys(candidate);
  const responsiveKeys = [ 'from', 'until', ];

  if (typeof candidate.step === 'number') return true;

  // return false if `candidate` doesn't have a
  // `value` key or a doesn't specify a breakpoint
  if (
    !(
      typeof candidate.value === 'number' ||
      (candidate.value && typeof candidate.value.step === 'number')
    ) ||
    !responsiveKeys.reduce(
      (result, item) => result || candidateKeys.includes(item),
      false
    )
  ) {
    return false;
  }

  const { value, } = candidate;

  return typeof value === 'number' || typeof value.step === 'number';
}
