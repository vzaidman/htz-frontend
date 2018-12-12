// @flow

import type { ClickTrackerBannerType } from './ClickTrackerBannerType';

export type ClickTrackerBannerWrapperType = {
  inputTemplate: string,
  contentName: string,
  contentId: string,
  totalPercentage: number,
  viewModes: {
    viewModeHtzMobile: string,
    viewModeTmMobile: string,
    viewModeHtz: string,
    viewModeJson: string,
  },
  banners: Array<ClickTrackerBannerType>,
}
