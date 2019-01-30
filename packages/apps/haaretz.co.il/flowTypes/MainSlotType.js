// @flow
import type {
  ClickTrackerBannerWrapperType,
  DfpBannerType,
  GridElementType,
  ListDataType,
  MiddleRulerType,
  TabsElementType,
  ErrorType,
} from '@haaretz/htz-components';

export type MainSlotElement =
  | ClickTrackerBannerWrapperType
  | DfpBannerType
  | GridElementType
  | ListDataType
  | MiddleRulerType
  | TabsElementType
  | ErrorType

export type MainSlotType = Array<MainSlotElement>;
