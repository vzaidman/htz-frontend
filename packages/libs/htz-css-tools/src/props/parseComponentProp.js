/* @flow */

import type { MqFunc, } from '../mq/mq';

/**
 * The shape of a ComponentResponsiveProp's options object
 *
 * @prop {string} [from] - The named breakpoint used as the min-width breakpoint (inclusive)
 * @prop {string} [until] - The named breakpoint used as the max-width breakpoint (exclusive)
 * @prop {string} [misc] - A named breakpoint used as a miscellaneous media-query feature
 * @prop {string} [type] - A media type
 * @prop {boolean | string | number | (string | number)[]} value - The value(s) to assign to the prop
 */
export type ComponentPropResponsiveObject = {
  from?: string,
  until?: string,
  misc?: string,
  type?: string,
  value: boolean | string | number | (string | number)[]
};

/**
 * The shape of a `componentProp`'s `value`
 */
export type ComponentPropValue =
  | boolean
  | string
  | number
  | (string | number)[]
  | ComponentPropResponsiveObject;

/**
 * A callback that converts values from the prop into a CSS-in-JS object
 *
 * @param {string} prop - A css property
 * @param {boolean | string | number | (string | number)[]} - The value of the components's prop
 * @param {*[]} [args] - An optional array of aditional arguments.
 *
 * @return - A CSS-in-JS object
 */
export type ComponentPropConverterFn = (
  prop: string,
  value: boolean | string | number | (string | number)[],
  ...args?: any
) => Object;

/**
 * Parse the value of a React component's prop, and convert it to a
 * CSS-in-JS object, responsive or otherwise.
 *
 * @param {string} prop - The name of the React comoponent prop being parsed
 * @param {ComponentPropValue} values - The prop's value.
 * @param {MqFunc} mq - A media query function.
 * @param {ComponentPropConverterFn} [converter] - A callback used for converting `values`
 *   (or each item in `values`, when it is an array) to a CSS-in-JS objcet. Passed the
 *   `prop` and `values` as arguments, followd by those defined in `converterArgs`.<br />
 *   In its absence, the returned object will simply be `{ [prop]: values }`
 * @param {...*} [converterArgs] - Arguments to be passed to the `converter` function
 *   after `prop` and `value`
 */
export default function parseComponentProp(
  prop: string,
  values: ComponentPropValue,
  mq: MqFunc,
  converter?: ComponentPropConverterFn,
  ...converterArgs?: any
): Object {
  if (isResponsiveOptions(values)) {
    // Flow doesn't recognise that we validated `values` to be an `array` in `isResponsiveOptions()`
    // $FlowFixMe
    return values.reduce((styles, { from, until, misc, type, value, }) => {
      const styleRules = converter
        ? converter(
          prop,
          value,
          ...converterArgs
        )
        : { [prop]: value, };

      return {
        ...styles,
        ...mq({ from, until, misc, type, }, styleRules),
      };
    }, {});
  }
  return converter
    ? converter(
      prop,
      // Flow doesn't recognise that we validated `values` to not be a
      // `ComponentPropResponsiveObject` in `isResponsiveOptions()` above
      // $FlowFixMe
      values,
      ...converterArgs
    )
    : { [prop]: values, };
}

/**
 * Determine if `candidate` is a prop responsive options object.
 *
 * @param {*} candidate - The value to evaluate
 * @return {boolean}
 */
function isResponsiveOptions(candidate: any): boolean {
  if (!Array.isArray(candidate)) return false;
  return candidate.every(
    item =>
      // We're checking the shape of the array items by duck-typing
      // to make sure it is a responsive options object.
      // The whole point is to fail when the type is incorrect
      // $FlowFixMe
      typeof item.value !== 'undefined' && (item.from || item.until || item.misc || item.type)
  );
}
