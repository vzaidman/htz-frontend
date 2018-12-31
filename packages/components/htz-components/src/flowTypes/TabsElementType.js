// @flow

import type { ListDataType, } from './ListDataType';
import type { DfpBannerType, } from './DfpBannerType';
import type { ClickTrackerBannerWrapperType, } from './ClickTrackerBannerWrapperType';

export type TabItemType =
  | ListDataType
  | DfpBannerType
  | ClickTrackerBannerWrapperType

export type TabsElementType = {
  inputTemplate: "com.tm.TabViewElement",
  contentId: string,
  contentName: string,
  title: string,
  type: string,
  viewMode: string,
  elements: Array<TabItemType>,
}
