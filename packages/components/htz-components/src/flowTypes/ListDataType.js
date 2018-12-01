// @flow

import type { TeaserDataType, } from './TeaserDataType';
import type { ListExtraLinkType, } from './ListExtraLinkType';

export type ListDataType = {
  title?: string,
  extraLinks?: ListExtraLinkType[],
  commercialLinks?: ListExtraLinkType[],
  marketingTeaser?: {
    title: string,
    href: string,
    subtitle?: string,
    CTA: string,
  },
  items: TeaserDataType[],
  contentId: string,
  contentName: string,
  hasPagination: boolean,
  inputTemplate: string, // TODO: is this always 'com.tm.ListElement',
  view: string,
  url?: string,
};
