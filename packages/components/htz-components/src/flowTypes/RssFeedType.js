// @flow

export type RssFeedItem = {
  title: string,
  creator: string,
  author: string,
  imageUrl: Array<string>,
  link: string,
  description: string,
  publishedDate: string,
};

export type RssFeedType = {
  contentId: string,
  inputTemplate: string,
  title: string,
  items: Array<RssFeedItem>,
};
