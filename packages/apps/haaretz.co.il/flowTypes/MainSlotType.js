// @flow
import type {
  ClickTrackerBannerWrapperType,
  DfpBannerType,
  GridElementType,
  ListDataType,
  TabsElementType,
} from '@haaretz/htz-components';

type MainSlotElement =
  | ClickTrackerBannerWrapperType
  | DfpBannerType
  | GridElementType
  | ListDataType
  | TabsElementType

export type MainSlotType = Array<MainSlotElement>;
