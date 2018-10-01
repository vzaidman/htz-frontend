// @flow

import React from 'react';
import { FelaComponent, } from 'react-fela';
import type { Node, ElementType, } from 'react';
import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';

import cardStyle from './cardStyle';
import type { attrFlowType, } from '../../flowTypes/attrTypes';

export type CardProps = {
  /**
   * attributes to be passed to the DOM element
   */
  attrs: attrFlowType,
  /**
   * The background color of the card.
   * Can be:
   *   - A `string` representing a named color.
   *   - A `tuple` of two `string`s, the first representing.
   *     a named color, and the second representing a variant
   *     of that named color.
   *   - An array of objects representing media queries, in
   *     the following structure:
   *     ```
   *     {
   *       from?: string,
   *       until?: string,
   *       misc?: string,
   *       value: string or tuple, as mentioned above,
   *     }
   *     ```
   */
  backgroundColor:
    | string
    | [string]
    | [string, string]
    | {
        ...ComponentPropResponsiveObject,
        value: string | [string] | [string, string],
      }[],
  /**
   * indicates if the card is elevated.
   */
  isElevated: boolean,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: StyleProps,
  children: Node,
  /** The html element to use for the card */
  tagName: ElementType,
};

Card.defaultProps = {
  // Disabling eslint here, because it doesn't understand how
  // flow wroks with default props and required props
  /* eslint-disable react/default-props-match-prop-types */
  attrs: null,
  children: null,
  backgroundColor: null,
  isElevated: null,
  miscStyles: null,
  tagName: 'div',
  /* eslint-enable react/default-props-match-prop-types */
};

export default function Card({
  attrs,
  backgroundColor,
  isElevated,
  miscStyles,
  children,
  tagName,
}: CardProps): Node {
  const Component = tagName;
  return (
    <FelaComponent
      {...{ backgroundColor, isElevated, miscStyles, }}
      rule={cardStyle}
      render={({ className, }) => (
        <Component className={className} {...attrs}>
          {children}
        </Component>
      )}
    />
  );
}
