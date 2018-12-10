// @flow

import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';
import * as React from 'react';

import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';
import type { attrFlowType, } from '../../flowTypes/attrTypes';
import BlockLink from '../BlockLink/BlockLink';
import Card from '../Card/Card';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Grid from '../Grid/Grid';

type TeaserPropTypes = {
  data: TeaserDataType,
  children?: React.Node,
  /**
   * pass an `onClick` event to the blockLink.
   * Useful for bi actions and events
   *
   * Should also be passed to underlying links, e.g.,
   * around the title and image
   */
  onClick: ?(evt: SyntheticMouseEvent<HTMLElement>) => void,
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
  gridMiscStyles: ?StyleProps,
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
  onClick: null,
  attrs: null,
  backgroundColor: null,
  isElevated: false,
  miscStyles: null,
  gutter: 0,
  isRev: false,
  gridMiscStyles: null,
};

export default function Teaser({
  children,
  data,

  // BlockLink props
  onClick,

  // Card props
  attrs,
  backgroundColor,
  isElevated,
  miscStyles,

  // Grid props
  gutter,
  isRev,
  gridMiscStyles,
}: TeaserPropTypes): React.Node {
  return (
    <ErrorBoundary>
      <Card
        tagName="article"
        fillHeight
        {...{ miscStyles, backgroundColor, isElevated, attrs, }}
      >
        <BlockLink href={data.path} onClick={onClick} tagName="div" miscStyles={{height: '100%'}}>
          <Grid
            gutter={gutter}
            miscStyles={{
              alignContent: 'flex-start',
              height: '100%',
              ...(gridMiscStyles || {})
            }}
            {...(isRev ? { isRev, } : {})}
          >
            {children}
          </Grid>
        </BlockLink>
      </Card>
    </ErrorBoundary>
  );
}
