/* @flow */

import type { MqFunc, } from '../mq/createMqFunc';

/**
 * The shape of a ComponentResponsiveProp's options object
 *
 * @prop {string} [from] - The named breakpoint used as the min-width breakpoint (inclusive)
 * @prop {string} [until] - The named breakpoint used as the max-width breakpoint (exclusive)
 * @prop {string} [misc] - A named breakpoint used as a miscellaneous media-query feature
 * @prop {string} [type] - A media type
 * @prop {boolean | string | number | (string | number)[]} value - The value(s) to assign to the prop
 */
export type ComponentPropResponsiveObject<T> = {
  from?: string,
  until?: string,
  misc?: string,
  type?: string,
  value: T,
};

/**
 * The shape of a `componentProp`'s `value`
 */
export type ComponentPropValue<
  T:
    | boolean
    | string
    | number
    | (string | number | ComponentPropResponsiveObject<*>)[]
> = T;

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
  value: any,
  ...args?: any
) => Object;

/**
 * Parse the value of React components' props that can take
 * [responsive values](#componentpropresponsiveobject), and convert them
 * to CSS-in-JS objects.
 *
 * Say we have a <MyComp /> component, that takes a `width` prop, which may have
 * different values in different breakpoints. It may either be a number, or
 * when the width of the component does not change, or an array of
 * `ComponentPropResponsiveObject`s:
 *
 * ```jsx
 * <MyComp width={6} />
 * ```
 *
 * or
 *
 * ```jsx
 * <MyComp
 *   width={[
 *     { until: 's', value: 6, },
 *     {from: 's', until: 'l', value: 8, },
 *     { from: 'l', value: 10, },
 *   ]}
 * />
 * ```
 *
 * the `parseComponentProp` function can be used to create a `CSS-in-JS` object containing
 * a media query for each of the conditions (or none at all, in the first, simple use-case),
 * and pass the value of the `value` property of each of the objects to a
 * [converter function](#componentpropconverterfn).
 *
 * @param {string} prop - The name of the React component prop being parsed
 * @param {ComponentPropValue} values - The prop's value.
 * @param {MqFunc} mq - A media query function.
 * @param {ComponentPropConverterFn} [converter] - A callback used for converting `values`
 *   (or the `value` prop in each item in `values`, when it is an array) to a CSS-in-JS object.
 *   Passed the `prop` and `values` as arguments, followed by those defined in `converterArgs`.<br />
 *   In its absence, the returned object will simply be `{ [prop]: values }`
 *
 *   At its simplest, example of a converter function could be:
 *
 *   ```js
 *   function setWidth(prop: string, value: number): Object {
 *     return { width: `${value * 2}rem`, };
 *   }
 *   ```
 * @param {...*} [converterArgs] - Arguments to be passed to the `converter` function
 *   after `prop` and `value`
 *
 * @example
 * parseComponentProp(
 *    // prop:
 *   'width',
 *   // values:
 *   [
 *     { until: 's', value: 6, },
 *     {from: 's', until: 'l', value: 8, },
 *     { from: 'l', value: 10, },
 *   ],
 *   // media query function:
 *   theme.mq,
 *   // converter function:
 *   setWidth
 *  // adiditional args will be passed to the converter function //
 * );
 */
export default function parseComponentProp<Values: ComponentPropValue<*>>(
  prop: string,
  values: Values,
  mq: MqFunc,
  converter?: ComponentPropConverterFn,
  ...converterArgs: any
): Object {
  if (isResponsiveOptions(values)) {
    // Flow doesn't recognise that we validated `values` to be an `array` in `isResponsiveOptions()`
    // $FlowFixMe
    return values.reduce((styles, { from, until, misc, type, value, }) => {
      const styleRules = converter
        ? converter(prop, value, ...converterArgs)
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

/*
 * Determine if `candidate` is a prop responsive options object.
 *
 * @param {*} candidate - The value to evaluate
 * @return {boolean}
 *
 * @private
 */
function isResponsiveOptions(candidate: any): boolean {
  if (!Array.isArray(candidate)) return false;
  return candidate.every(
    item => typeof item.value !== 'undefined'
      && (item.from || item.until || item.misc || item.type)
  );
}
