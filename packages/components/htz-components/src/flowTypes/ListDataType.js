// @flow

import type { TeaserDataType, } from './TeaserDataType';
import type { ListExtraLinkType, } from './ListExtraLinkType';
import type { ListMarketingTeaserType, } from './ListMarketingTeaserType';
import type { ClickTrackerBannerWrapperType, } from './ClickTrackerBannerWrapperType';
import type { DfpBannerType, } from './DfpBannerType';
import type { ClickTrackerBannerType, } from './ClickTrackerBannerType';

export type ListItemType =
  | TeaserDataType
  | ClickTrackerBannerType
  | ClickTrackerBannerWrapperType
  | DfpBannerType;

export type ListDataType = {
  title?: string,
  extraLinks?: ListExtraLinkType[],
  commercialLinks?: ListExtraLinkType[],
  // `commercialLinks` and `marketingTeaser` occupy the same
  // sapce, and should therefore be mutually exclusive, with
  // `marketingTeaser` taking precedence. So, if a list have both,
  // only `marketingTeaser` should be placed in the JSON
  marketingTeaser?: ListMarketingTeaserType,
  description?: string,
  urlDescription?: string,
  items: Array<ListItemType>,
  dfp?: Array<ListItemType>,
  clickTrackers?: Array<ListItemType>,
  contentId: string,
  contentName: string,
  hasPagination: boolean,
  inputTemplate: "com.tm.element.List" | "com.tm.ListElement",
  view: string,
  url?: string,
  description?: string,
  urlDescription?: string,
};
