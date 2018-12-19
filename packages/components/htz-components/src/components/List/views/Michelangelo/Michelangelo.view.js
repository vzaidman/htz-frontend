// @flow
import React from 'react';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { DfpBannerType, } from '../../../../flowTypes/DfpBannerType';

import VerticalList from '../commonViews/VerticalList';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: () => void,
  biAction: ListBiActionType,
};

function Michelangelo({ list, ...props }: Props): Node {
  // The `isClickTracker` predicate checks the type and
  // filters out non `ClickTrackerBannerWrapperType` elements,
  // but flow does not understand predicates in `filter` yet:
  // https://github.com/facebook/flow/issues/1414
  // $FlowFixMe
  const items: Array<ClickTrackerBannerWrapperType> = list.items
    .filter(isClickTracker)
    .slice(0, 3);

  return items.length > 0
    ? <VerticalList banners={items} list={list} {...props} isCommercial />
    : null;
}

export default Michelangelo;

export function isClickTracker(
  item:
    | ClickTrackerBannerWrapperType
    | TeaserDataType
    | DfpBannerType
): %checks {
  return item.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper';
}
