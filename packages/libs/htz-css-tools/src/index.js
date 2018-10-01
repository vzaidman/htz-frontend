/* @flow */
/*
 * @haaretz/htz-css-tools
 *
 * A toolbelt for writing css-in-js in Haaretz apps
 * @license MIT
 */

import type { BorderStyle, BorderOptions, BorderRuleset, } from './border/types';
import type { ColorPalette, ColorGetter, } from './color/createColorGetter';
import type {
  WidthBpsConfig,
  MiscBpsConfig,
  BpsConfig,
  MqOptions,
  MqFunc,
} from './mq/createMqFunc';
import type { RemFunctionType, } from './units/createRemFunction';
import type {
  TypographicStyles,
  TypesetterOpts,
  Typesetter,
} from './typography/createTypesetter';
import type { LengthProps, } from './units/getLengthProps';
import type {
  ComponentPropResponsiveObject,
  ComponentPropValue,
  ComponentPropConverterFn,
} from './props/parseComponentProp';
import type { StyleProp, } from './props/parseStyleProp';
import type { StyleProps, } from './props/parseStyleProps';
import type {
  TypographyValueType,
  TypographyPropResponsiveObjectType,
  TypographyPropType,
} from './props/parseTypographyProp';
import type { TargetUnit, PxToUnitConverter, } from './units/pxTo';

import autospace from './mixins/autospace';
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
import createColorGetter from './color/createColorGetter';
import createMqFunc from './mq/createMqFunc';
import createRemFunction from './units/createRemFunction';
import createTypesetter from './typography/createTypesetter';
import getLengthProps from './units/getLengthProps';
import getMqString from './mq/getMqString';
import getRemFromPx from './units/getRemFromPx';
import getUnit from './units/getUnit';
import parseComponentProp from './props/parseComponentProp';
import parseStyleProps from './props/parseStyleProps';
import parseTypographyProp from './props/parseTypographyProp';
import pxTo from './units/pxTo';
import pxToEm from './units/pxToEm';
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
  parseComponentProp,
  parseStyleProps,
  parseTypographyProp,
  pxTo,
  pxToEm,
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
