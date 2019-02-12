// @flow
import type {
  ClickTrackerBannerWrapperType,
  DfpBannerType,
  GridElementType,
  ListDataType,
  MiddleRulerType,
  TabsElementType,
  RssFeedType,
  ErrorType,
} from '@haaretz/htz-components';

export type MainSlotElement =
  | ClickTrackerBannerWrapperType
  | DfpBannerType
  | GridElementType
  | ListDataType
  | MiddleRulerType
  | RssFeedType
  | TabsElementType
  | ErrorType

export type MainSlotType = Array<MainSlotElement>;
