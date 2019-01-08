// @flow
import React from 'react';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';

import VerticalList from '../commonViews/VerticalList';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: () => void,
  biAction: ListBiActionType,
};

function Michelangelo({ list, ...props }: Props): Node {
  const banners: ?Array<ClickTrackerBannerWrapperType> = list.clickTrackers
    ? list.clickTrackers.slice(0, 3)
    : null;

  return banners && banners.length > 0
    ? <VerticalList banners={banners} list={list} {...props} isCommercial />
    : null;
}

export default Michelangelo;
