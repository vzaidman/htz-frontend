// @flow

import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import type { ComponentPropResponsiveObject, StyleProps, } from '@haaretz/htz-css-tools';

import type { FillHeightType, } from '../Card/cardStyle';
import type { ClickTrackerBannerType, } from '../../flowTypes/ClickTrackerBannerType';
import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';
import type { attrFlowType, } from '../../flowTypes/attrTypes';
import { isClickTracker, } from '../../utils/validateType';
import Card from '../Card/Card';
import Debug from '../Debug/Debug';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Grid from '../Grid/Grid';
import HtzLink from '../HtzLink/HtzLink';

export type IsStackedType = boolean | ComponentPropResponsiveObject<boolean>[];

type TeaserPropTypes = {
  data: TeaserDataType | ClickTrackerBannerType,
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
   * is the data passed is a clickTracker data.
   */
  isClickTracker: ?boolean,
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
   * Should the Teaser forcefully occupy the entire height of its container
   * Takes a boolean or an array of resposive objects
   */
  fillHeight: FillHeightType,
  /**
   * indicates if the card is elevated.
   */
  isElevated: boolean,
  isStacked: IsStackedType,
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
  fillHeight: true,
  isClickTracker: false,
  attrs: null,
  backgroundColor: null,
  isElevated: false,
  isStacked: false,
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
  fillHeight,
  isElevated,
  isStacked,
  miscStyles,

  // Grid props
  gutter,
  isRev,
  gridMiscStyles,
}: TeaserPropTypes): React.Node {
  if (!data) {
    return <Debug>No data was provided for this teaser</Debug>;
  }
  return (
    <ErrorBoundary>
      <Card
        tagName="article"
        fillHeight={fillHeight}
        miscStyles={{ position: 'relative', ...(miscStyles || {}), }}
        {...{ backgroundColor, isElevated, attrs, }}
      >
        <Grid
          gutter={gutter}
          miscStyles={{
            alignContent: 'flex-start',
            flexGrow: '1',
            height: '100%',
            ...setStacking(isStacked),
            ...(gridMiscStyles || {}),
          }}
          {...(isRev ? { isRev, } : {})}
        >
          {children}
        </Grid>
        <FelaComponent
          style={{
            backgroundColor: 'transparent',
            bottom: '0',
            left: '0',
            position: 'absolute',
            right: '0',
            top: '0',
            zIndex: '0',
          }}
          render={({ className: linkClassName, }) => (
            <HtzLink
              className={linkClassName}
              href={isClickTracker(data) ? data.link : data.path}
              target={isClickTracker(data) ? data.linkTarget : null}
              onClick={onClick}
              attrs={{
                tabIndex: '-1',
                'aria-hidden': true,
              }}
            />
          )}
        />
      </Card>
    </ErrorBoundary>
  );
}

// /////////////////////////////////////////////////////////////////////
//                               UTILS                                //
// /////////////////////////////////////////////////////////////////////

type StackingOpts = 'column' | 'row';
type StackingSettings = {
  flexDirection: StackingOpts | Array<{ from: ?string, until: ?string, value: StackingOpts, }>,
};

function setStacking(options: IsStackedType): StackingSettings {
  if (typeof options === 'boolean') {
    return {
      flexDirection: options ? 'column' : 'row',
      flexWrap: options ? 'nowrap' : 'wrap',
    };
  }
  return {
    flexDirection: options.map(({ from, until, value, }) => ({
      from,
      until,
      value: value ? 'column' : 'row',
    })),
    flexWrap: options.map(({ from, until, value, }) => ({
      from,
      until,
      value: value ? 'nowrap' : 'wrap',
    })),
  };
}
