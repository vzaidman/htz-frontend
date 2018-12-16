// @flow
import type { ImageDataType, } from './ImageDataType';

export type AuthorDataType = {
  contentName: string,
  contentId: string,
  inputTemplate: 'com.tm.Author',
  authorType?: string,
  email?: string,
  facebook?: string,
  twitter?: string,
  gplus?: string,
  image?: ImageDataType,
  hasEmailAlerts?: boolean,
  name: string,
  url?: string,
};
