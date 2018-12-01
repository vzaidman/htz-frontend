// @flow

export type ListExtraLinkType = {
  contentId: string,
  contentName: string, // This is the actual content
  href?: string,
  inputTemplate: string, // TODO: is it always "com.tm.Link",
  toolTip?: string,
};
