// @flow

import type { ListItemType, } from '../../../flowTypes/ListDataType';

export function isTeaser(item: ListItemType): %checks {
  return item.inputTemplate === 'com.tm.TeaserData';
}

export function isClickTrackerWrapper(item: ListItemType): %checks {
  return item.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper';
}

export function isClickTracker(item: ListItemType): %checks {
  return item.inputTemplate === 'com.polobase.ClickTrackerBannerElement';
}

export function isDfp(item: ListItemType): %checks {
  return item.inputTemplate === 'com.polobase.DfpBannerElement';
}
