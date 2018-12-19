// @flow
import React from 'react';

import type { Node, } from 'react';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';

import VerticalList from '../commonViews/VerticalList';

type Props = {
  items: Array<ClickTrackerBannerWrapperType>,
  biAction: ListBiActionType,
  gaAction: () => void,
};

function Raphael({ items, ...props }: Props): Node {
  return items.length > 0
    ? <VerticalList banners={items.slice(0, 2)} isCommercial {...props} />
    : null;
}

export default Raphael;
