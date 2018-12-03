// @flow

import * as React from 'react';

import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';

import AboveBlockLink from '../BlockLink/AboveBlockLink';
import GridItem from '../Grid/GridItem';
import HtzLink from '../HtzLink/HtzLink';

import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';

type TeaserMediaPropsType = {
  data: TeaserDataType,
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
  children: React.Node,
};

TeaserMedia.defaultProps = {
  width: null,
  children: null,
};

export default function TeaserMedia({
  data,
  width,
  children,
}: TeaserMediaPropsType): React.Node {
  return (
    <GridItem width={width} stretchContent>
      <AboveBlockLink>
        {({ className, }) => (
          <div className={className}>
            <HtzLink href={data.path} attrs={{ tabIndex: -1, }}>
              {children}
            </HtzLink>
          </div>
        )}
      </AboveBlockLink>
    </GridItem>
  );
}
