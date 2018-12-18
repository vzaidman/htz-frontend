// @flow
import React from 'react';

import type { Node, } from 'react';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { ListItemType, } from '../../../../flowTypes/ListDataType';

import VerticalList from '../commonViews/VerticalList';
import { isClickTrackerWrapper, } from '../../utils/validateTeaser';

type Props = {
  items: Array<ListItemType>,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
  title: string,
};

function Raphael({ items, ...props }: Props): Node {
  // The `isClickTracker` predicate checks the type and
  // filters out non `ClickTrackerBannerWrapperType` elements,
  // but flow does not understand predicates in `filter` yet:
  // https://github.com/facebook/flow/issues/1414
  // $FlowFixMe
  const banners: Array<ClickTrackerBannerWrapperType> = items
    .filter(item => isClickTrackerWrapper(item))
    .slice(0, 3);

  return banners.length > 0 ? (
    <VerticalList banners={banners} isCommercial {...props} />
  ) : null;
}

export default Raphael;
