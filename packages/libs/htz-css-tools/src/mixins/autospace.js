/* @flow */

/**
 * Inteligently space direct descendent of an element by assigning a `margin-top`
 * of `amount` to any child element that is preceded by a sibling element.
 *
 * @param amount - The number vertical-rhythm lines to space child elements with
 * @param [nUp] - the number of columns child elements are displayed in.
 *   The first `n` number of children with not be assigned a margin at their top.
 *
 * @return A CSS-in-JS object with a declaration that spaces child elements by `amount`.
 *
 * @example
 * // Single column layout
 * const autoSpaced = autospace(2);
 *
 * // Output:
 * { '> * + *': { marginTop: '2rem', }, }
 *
 * @example
 * // Three-column layout
 * const autoSpaced = autospace(1, 3);
 *
 * // Output:
 * { '> * + *:nth-child(n+4)': { marginTop: '2rem', }, }
 */
export default function autospace(amount: number, nUp?: number): Object {
  return {
    [`> * + *${nUp ? `:nth-child(n+${nUp + 1})` : ''}`]: {
      marginTop: `${amount}rem`,
    },
  };
}
