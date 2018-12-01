// @flow
import type { ImageDataType, } from './ImageDataType';

export type AuthorDataType =
  | {
      contentName: "com.tm.Author",
      contentId: string,
      inputTemplate: string,
      authorType?: string,
      email?: string,
      facebook?: string,
      twitter?: string,
      gplus?: string,
      image?: ImageDataType,
      hasEmailAlerts?: boolean,
      url?: string,
    }
  | { name: string, };
