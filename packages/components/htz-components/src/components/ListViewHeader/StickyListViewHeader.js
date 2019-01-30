// @flow
/* eslint-disable react/prop-types, react/default-props-match-prop-types */
import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';
import { FelaTheme, } from 'react-fela';
import * as React from 'react';

import GridItem from '../Grid/GridItem';
import ListViewHeader, { type ListViewHeaderPropTypes, } from './ListViewHeader';

type Props = ListViewHeaderPropTypes & {
  /**
   * A special property applying miscellaneous CSS values that
   * trump all default values of the inner Listview header.
   * Processed by [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  innerMiscStyles: ?StyleProps,
  /**
   * Should not be passed manually. Handled by the parent `<Grid>` component
   */
  gutter: ?number,
  /**
   * The width of the underlying `<GridItem />`.
   * The number passed should be (`width` / `columns`).
   * When the number passed to `width` is greater than `1`, it will be
   * used as an absolute width in rems.
   *
   * Can be set responsively.
   *
   * @example
   * // <StickyListViewHeader /> spans 25% (3 of 12 columns)
   * <StickyListViewHeader width={3 / 12} />
   *
   * // responsive settings:
   * <StickyListViewHeader
   *   width={[
   *     { from: 's', until: 'm', misc: 'landscape', value: 3 / 12 },
   *     { from: 'xl', value: 6 / 12 },
   *   ]}
   * />
   */
  width: ?number | ComponentPropResponsiveObject<number>[],
};

StickyListViewHeader.defaultProps = {
  backgroundColor: [ { until: 's', value: [ 'neutral', '-10', ], }, ],
  biAction: null,
  commercialLinks: null,
  extraLinks: null,
  gutter: null,
  hasTitlePadding: false,
  innerMiscStyles: null,
  isCommercial: false,
  isHorizontal: false,
  isVertical: false,
  marketingTeaser: null,
  miscStyles: null,
  title: null,
  titleMiscStyles: null,
  url: null,
  width: null,
};

export default function StickyListViewHeader({
  gutter,
  innerMiscStyles,
  miscStyles,
  width,

  backgroundColor,
  biAction,
  commercialLinks,
  extraLinks,
  hasTitlePadding,
  isCommercial,
  isHorizontal,
  isVertical,
  marketingTeaser,
  title,
  titleMiscStyles,
  url,
}: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <GridItem
          gutter={gutter}
          stretchContent
          width={width}
          miscStyles={{
            position: [ { until: 's', value: 'sticky', }, ],
            top: [ { until: 's', value: '0', }, ],
            zIndex: [
              { until: 's', value: theme.getZIndex('stickyListViewHeader'), },
            ],
            ...(miscStyles || {}),
          }}
        >
          <ListViewHeader
            backgroundColor={backgroundColor}
            biAction={biAction}
            commercialLinks={commercialLinks}
            extraLinks={extraLinks}
            hasTitlePadding={hasTitlePadding}
            isCommercial={isCommercial}
            isHorizontal={isHorizontal}
            isVertical={isVertical}
            marketingTeaser={marketingTeaser}
            title={title}
            titleMiscStyles={titleMiscStyles}
            url={url}
            miscStyles={innerMiscStyles}
          />
        </GridItem>
      )}
    />
  );
}
