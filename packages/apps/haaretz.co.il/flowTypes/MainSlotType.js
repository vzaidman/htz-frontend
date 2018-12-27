// @flow
import type {
  ClickTrackerBannerWrapperType,
  DfpBannerType,
  ListDataType,
} from '@haaretz/htz-components';

type MainSlotElement =
  | ClickTrackerBannerWrapperType
  | DfpBannerType
  | ListDataType

export type MainSlotType = Array<MainSlotElement>;
