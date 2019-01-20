// @flow
import type {
  ClickTrackerBannerWrapperType,
  DfpBannerType,
  GridElementType,
  ListDataType,
  TabsElementType,
  ErrorType,
} from '@haaretz/htz-components';

type MainSlotElement =
  | ClickTrackerBannerWrapperType
  | DfpBannerType
  | GridElementType
  | ListDataType
  | TabsElementType
  | ErrorType

export type MainSlotType = Array<MainSlotElement>;
