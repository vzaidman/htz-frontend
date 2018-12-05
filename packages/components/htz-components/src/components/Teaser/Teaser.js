// @flow

import * as React from 'react';

import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';

import BlockLink from '../BlockLink/BlockLink';
import Card from '../Card/Card';
import Grid from '../Grid/Grid';

import type { attrFlowType, } from '../../flowTypes/attrTypes';
import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';

type TeaserPropTypes = {
  data: TeaserDataType,
  children?: React.Node,
  /**
   * attributes to be passed to the DOM element
   */
  attrs: ?attrFlowType,
  /**
   * The background-color of the headline
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
    | ?string
    | [string, ]
    | [string, string, ]
    | ComponentPropResponsiveObject<string | [string, ] | [string, string, ]>[],
  /**
   * indicates if the card is elevated.
   */
  isElevated: boolean,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: ?StyleProps,
  gutter:
    | number
    | {
        onServerRender: number,
        queries: ComponentPropResponsiveObject<number>[],
      },
  isRev: boolean | ComponentPropResponsiveObject<boolean>[],
};

Teaser.defaultProps = {
  children: null,
  attrs: null,
  backgroundColor: null,
  isElevated: false,
  miscStyles: null,
  gutter: 0,
  isRev: false,
};

export default function Teaser({
  children,
  data,

  // Card props
  attrs,
  backgroundColor,
  isElevated,
  miscStyles,

  // Grid props
  gutter,
  isRev,
}: TeaserPropTypes): React.Node {
  return (
    <Card
      tagName="article"
      fillHeight
      {...{ miscStyles, backgroundColor, isElevated, attrs, }}
    >
      <BlockLink href={data.path}>
        <Grid gutter={gutter} {...(isRev ? { isRev, } : {})}>
          {children}
        </Grid>
      </BlockLink>
    </Card>
  );
}