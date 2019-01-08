// @flow
import React from 'react';

import type { Node, } from 'react';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';

import VerticalList from '../commonViews/VerticalList';

type Props = {
  items: Array<ClickTrackerBannerWrapperType>,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
  title: string,
};

function Raphael({ items, ...props }: Props): Node {
  const banners: Array<ClickTrackerBannerWrapperType> = items
    .slice(0, 3);

  return banners.length > 0
    ? <VerticalList banners={banners} isCommercial {...props} />
    : null;
}

export default Raphael;
