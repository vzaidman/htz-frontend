/* @flow */
/*
 * @haaretz/htz-css-tools
 *
 * A toolbelt for writing css-in-js in Haaretz apps
 * @license MIT
 */

import type { BorderStyle, BorderOptions, BorderRuleset, } from './border/types';
import type { StyleProp, } from './props/parseStyleProp';
import {
  border,
  borderTop,
  borderEnd,
  borderRight,
  borderBottom,
  borderStart,
  borderLeft,
  borderHorizontal,
  borderVertical,
} from './border';
import autospace from './mixins/autospace';
import createColorGetter, {
  type ColorPalette,
  type ColorGetter,
} from './color/createColorGetter';
import createMqFunc, {
  type WidthBpsConfig,
  type MiscBpsConfig,
  type BpsConfig,
  type MqOptions,
  type MqFunc,
} from './mq/createMqFunc';
import createRemFunction, {
  type RemFunctionType,
} from './units/createRemFunction';
import createTypesetter, {
  type TypographicStyles,
  type TypesetterOpts,
  type Typesetter,
} from './typography/createTypesetter';
import getLengthProps, { type LengthProps, } from './units/getLengthProps';
import getMqString from './mq/getMqString';
import getRemFromPx from './units/getRemFromPx';
import getUnit from './units/getUnit';
import hexToRgb from './color/hexToRgb';
import hslStringToRgbArray from './color/hslStringToRgbArray';
import parseComponentProp, {
  type ComponentPropResponsiveObject,
  type ComponentPropValue,
  type ComponentPropConverterFn,
} from './props/parseComponentProp';
import parseStyleProps, { type StyleProps, } from './props/parseStyleProps';
import parseTypographyProp, {
  type TypographyValueType,
  type TypographyPropResponsiveObjectType,
  type TypographyPropType,
} from './props/parseTypographyProp';
import pxTo, { type TargetUnit, type PxToUnitConverter, } from './units/pxTo';
import pxToEm from './units/pxToEm';
import rgbStringToArray from './color/rgbStringToArray';
import rgba from './color/rgba';
import stripUnit from './units/stripUnit';
import visuallyHidden from './mixins/visuallyHidden';

export {
  autospace,
  border,
  borderTop,
  borderEnd,
  borderRight,
  borderBottom,
  borderStart,
  borderLeft,
  borderHorizontal,
  borderVertical,
  createColorGetter,
  createMqFunc,
  createRemFunction,
  createTypesetter,
  getLengthProps,
  getMqString,
  getRemFromPx,
  getUnit,
  hexToRgb,
  hslStringToRgbArray,
  parseComponentProp,
  parseStyleProps,
  parseTypographyProp,
  pxTo,
  pxToEm,
  rgba,
  rgbStringToArray,
  stripUnit,
  visuallyHidden,
};

export type {
  BorderStyle,
  BorderOptions,
  BorderRuleset,
  ColorPalette,
  ColorGetter,
  WidthBpsConfig,
  MiscBpsConfig,
  BpsConfig,
  MqOptions,
  MqFunc,
  RemFunctionType,
  TypographicStyles,
  TypesetterOpts,
  Typesetter,
  LengthProps,
  ComponentPropResponsiveObject,
  ComponentPropValue,
  ComponentPropConverterFn,
  StyleProp,
  StyleProps,
  TypographyValueType,
  TypographyPropResponsiveObjectType,
  TypographyPropType,
  TargetUnit,
  PxToUnitConverter,
};
