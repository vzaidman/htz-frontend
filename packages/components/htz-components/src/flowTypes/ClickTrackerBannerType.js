// @flow

import type { ImageDataType } from './ImageDataType';

export type ClickTrackerBannerType = {
  priority: number,
  link: string,
  linkTarget: string,
  departments: Array<string>,
  replaceDomainForAdBlocker: boolean,
  clicktrackerimage: ImageDataType,
  advertiserCamp: string,
  percentage: number,
  minRange: number,
  maxRange: number,
  chance: number,
  inputTemplate: string,
  contentId: string,
  contentName: string,
}
