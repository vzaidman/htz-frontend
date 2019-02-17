// @flow

import type { TeaserDataType, } from './TeaserDataType';
import type { ListExtraLinkType, } from './ListExtraLinkType';
import type { ListMarketingTeaserType, } from './ListMarketingTeaserType';
import type { ClickTrackerBannerWrapperType, } from './ClickTrackerBannerWrapperType';
import type { DfpBannerType, } from './DfpBannerType';

export type ListDataType = {
  title?: string,
  extraLinks?: ListExtraLinkType[],
  // `commercialLinks` and `marketingTeaser` occupy the same
  // sapce, and should therefore be mutually exclusive, with
  // `marketingTeaser` taking precedence. So, if a list have both,
  // only `marketingTeaser` should be placed in the JSON
  commercialLinks?: ListExtraLinkType[],
  marketingTeaser?: ListMarketingTeaserType,
  isLazyloadImages: boolean,
  loadPriority: "ssr" | "client" | "lazy",
  description?: string,
  items: Array<TeaserDataType>,
  dfp?: Array<DfpBannerType>,
  clickTrackers?: Array<ClickTrackerBannerWrapperType>,
  contentId: string,
  contentName: string,
  hasPagination: boolean,
  inputTemplate: "com.tm.element.List" | "com.tm.ListElement",
  view: string,
  url?: string,
  description?: string,
  urlDescription?: string,
  lazyloadDistance?: number,
  lazyLoadImages: boolean,
  loadPriority?: "ssr" | "client" | "lazy",
};
