// @flow

import * as React from 'react';

import type {
  ComponentPropResponsiveObject,
  StyleProps,
} from '@haaretz/htz-css-tools';

import AboveBlockLink from '../BlockLink/AboveBlockLink';
import GridItem from '../Grid/GridItem';
import HtzLink from '../HtzLink/HtzLink';

import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';

type TeaserMediaPropsType = {
  data: TeaserDataType,
  /**
   * Should not be passed manually. Handled by the parent `<Grid>` component
   */
  gutter: number,
  /**
   * The width of the underlying `<TeaserMedia />`.
   * The number passed should be (`width` / `columns`).
   * When the number passed to `width` is greater than `1`, it will be
   * used as an absolute width in rems.
   *
   * Can be set responsively.
   *
   * @example
   * // <TeaserMedia /> spans 25% (3 of 12 columns)
   * <TeaserMedia width={3 / 12} />
   *
   * // responsive settings:
   * <TeaserMedia
   *   width={[
   *     { from: 's', until: 'm', misc: 'landscape', value: 3 / 12 },
   *     { from: 'xl', value: 6 / 12 },
   *   ]}
   * />
   */
  width: number | ComponentPropResponsiveObject<number>[],
  /**
   * Don't wrap the media element with an `<a>` element.
   * Useful for interactive  content.
   */
  disableAnchor: boolean,
  children: React.Node,
  /**
   * miscellaneous styles on the wrapper `<GridItem />`
   */
  miscStyles: ?StyleProps,
};

TeaserMedia.defaultProps = {
  gutter: 0,
  children: null,
  disableAnchor: false,
  width: null,
  miscStyles: null,
};

export default function TeaserMedia({
  data,
  gutter,
  width,
  children,
  disableAnchor,
  miscStyles,
}: TeaserMediaPropsType): React.Node {
  return (
    <GridItem width={width} gutter={gutter} miscStyles={miscStyles}>
      <AboveBlockLink>
        {({ className, }) => (
          <div className={className}>
            {disableAnchor ? (
              children
            ) : (
              <HtzLink href={data.path} attrs={{ tabIndex: -1, }}>
                {children}
              </HtzLink>
            )}
          </div>
        )}
      </AboveBlockLink>
    </GridItem>
  );
}
