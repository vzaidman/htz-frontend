// @flow

import type { ListDataType, } from './ListDataType';
import type { DfpBannerType, } from './DfpBannerType';
import type { ClickTrackerBannerWrapperType, } from './ClickTrackerBannerWrapperType';
import type { TabsElementType, } from './TabsElementType';

type GridItemType = {
  content:
    | ListDataType
    | DfpBannerType
    | ClickTrackerBannerWrapperType
    | TabsElementType,
  width: {
    from?: ?string,
    until?: ?string,
    value: number,
  },
  miscStyles: ?Object,
}


export type GridElementType = {
  inputTemplate: "com.tm.GridElementGroup",
  contentId: string,
  contentName: string,
  title?: string,
  items: Array<GridItemType>,
}
