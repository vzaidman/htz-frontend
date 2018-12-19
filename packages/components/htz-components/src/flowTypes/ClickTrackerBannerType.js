// @flow

import type { ImageDataType, } from './ImageDataType';

export type ClickTrackerBannerType = {
  priority: number,
  text?: string,
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
  inputTemplate: 'com.polobase.ClickTrackerBannerElement',
  contentId: string,
  contentName: string,
}
