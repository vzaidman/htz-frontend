/* @flow */
/* eslint-disable operator-linebreak */

import setBorder from '../border/setBorder';
import visuallyHidden from '../mixins/visuallyHidden';
import autospace from '../mixins/autospace';

import type { MqFunc, } from '../mq/createMqFunc';
import type { Typesetter, } from '../typography/createTypesetter';
import type { ComponentPropResponsiveObject, } from './parseComponentProp';

/**
 * The shape of a SyleProp's responsive object
 *
 * @prop {string} [from] - The named breakpoint used as the min-width breakpoint (inclusive)
 * @prop {string} [until] - The named breakpoint used as the max-width breakpoint (exclusive)
 * @prop {string} [misc] - A named breakpoint used as a miscellaneous media-query feature
 * @prop {string} [type] - A media type
 * @prop {string | number | (string | number)[]} value - The value(s) to assign to the prop
 * @prop {object} [options] - Miscellaneous options to be passed to a function parsing the prop,
 *   e.g., the `type` prop, which is parsed by the typesetter function.
 */
export type StylePropResponsiveObject<T> = ComponentPropResponsiveObject<T> & {
  options?: ?Object,
};

/**
 * The shape of a styleProp
 * May be one of:
 *
 *   1. A CSS value (string or number) (when not responsive)
 *   2. An array of CSS values (used for providing fallback values, when not responsive)
 *   3. An array of StylePropValues objects
 *
 * @type {string|number|StylePropResponsiveObject}
 */
export type StyleProp<
  T: string | number | (string | number | StylePropResponsiveObject<*>)[]
> = T;

/**
 * Parse an object of responsive values into a CSS-in-JS object
 *
 * @param {string} prop - the CSS property
 * @param {StyleProp} values -
 *   May be one of:
 *
 *     1. A CSS value (string or number) (when not responsive)
 *     2. An array of CSS values (used for providing fallback values, when not responsive)
 *     3. An array of StylePropValues objects
 * @param {string} [values[].from] - The named breakpoint used as the min-width breakpoint (inclusive)
 * @param {string} [values[].until] - The named breakpoint used as the max-width breakpoint (exclusive)
 * @param {string} [values[].misc] - A named breakpoint used as a miscellaneous media-query feature
 * @param {string} [values[].type] - A media type
 * @param {string | number | (string | number)[]} values[].value - The value(s) to assign to the prop
 * @param {object} [values[].options] - Miscellaneous options to be passed to a function parsing the prop,
 *   e.g., the `type` prop, which is parsed by the typesetter function.
 * @param {MqFunc} mq - a media-query function
 * @param {Typesetter} typesetter - a typesetter function
 *
 * @return {Object|void} A CSS-in-JS object
 */
export default function parseStyleProp(
  prop: string,
  values: StyleProp<*>,
  mq: MqFunc,
  typesetter: Typesetter
): Object | void {
  const valuesIsArray = Array.isArray(values);

  if (
    typeof values !== 'undefined' &&
    // if values is a straight-up CSS value
    (isNumOrString(values) ||
      // or an array of straight-up CSS values (a fallback values array)
      // Flow doesn't recognized that we validated `values` to be an `array`
      // $FlowFixMe
      (valuesIsArray && values.every(item => isNumOrString(item))))
  ) {
    if (prop === 'type' && typeof values === 'number') {
      return typesetter(values);
    }

    if (prop === 'visuallyHidden') {
      return values === 'focusable' ? visuallyHidden(true) : visuallyHidden();
    }

    const isAutospace =
      prop === 'autospace' &&
      (typeof values === 'number' ||
        // Flow doesn't recognize the fact that validated the type of `values`
        // $FlowFixMe
        (valuesIsArray && values.every(item => typeof item === 'number')));

    // Flow doesn't recognize the fact that validated the type of `values`
    return isAutospace
      ? // $FlowFixMe
      autospace(...(typeof values === 'number' ? [ values, ] : values))
      : prop.startsWith('border') && prop.toLowerCase().indexOf('radius') === -1
        ? // $FlowFixMe
        getBorderStyles(prop, values)
        : { [prop]: values, };
  }

  if (valuesIsArray) {
    // Flow doesn't recognize that we validated `values` to be an `array`
    // $FlowFixMe
    return values.reduce((styles, item) => {
      if (typeof item === 'object') {
        if (prop === 'type' && typeof item.value === 'number') {
          return {
            ...styles,
            ...typesetter(item.value, {
              fromBp: item.from,
              untilBp: item.until,
              lines: item.options && item.options.lines,
            }),
          };
        }
        const isAutospace =
          prop === 'autospace' &&
          (typeof item.value === 'number' ||
            (Array.isArray(item.value) &&
              item.value.every(
                austospaceItem => typeof austospaceItem === 'number'
              )));

        return {
          ...styles,
          ...mq(
            {
              from: item.from,
              until: item.until,
              misc: item.misc,
              type: item.type,
            },

            // $FlowFixMe
            prop === 'visuallyHidden'
              ? item.value === 'focusable'
                ? visuallyHidden(true)
                : visuallyHidden()
              : isAutospace
                ? // $FlowFixMe
                autospace(
                  ...(typeof item.value === 'number'
                    ? [ item.value, ]
                    : item.value)
                )
                : prop.startsWith('border') &&
                  prop.toLowerCase().indexOf('radius') === -1
                  ? getBorderStyles(prop, item.value)
                  : { [prop]: item.value, }
          ),
        };
      }
      return styles;
    }, {});
  }

  return { [prop]: values, };
}

function getBorderStyles(
  prop: string,
  values: string | number | (string | number)[]
): Object | void {
  const [ , direction, ] = prop.split('border');
  if (typeof direction !== 'undefined' && Array.isArray(values)) {
    const borderDirection = (direction || 'all').toLowerCase();
    if (
      [
        'all',
        'top',
        'right',
        'bottom',
        'left',
        'end',
        'start',
        'inlinestart',
        'inlineend',
      ].indexOf(borderDirection) > -1
    ) {
      // border direction Enum is enforced above, Flow just doesn't get it
      // $FlowFixMe
      return setBorder(borderDirection, ...values);
    }
  }
  return undefined;
}

function isNumOrString(value: any): boolean {
  const valueType = typeof value;
  return valueType === 'string' || valueType === 'number';
}
