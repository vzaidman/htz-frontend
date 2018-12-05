// @flow
import type { ChildrenArray, Node, Element, } from 'react';

// Should be the type definition of `miscStyles`.
type StyleObj = Object;

type CommonButtonProps = {
  buttonStyles: StyleObj,
  size: number,
  iconStyles: StyleObj,
  props: Object,
};

type ActionButtonRenderObject = {
  platform: string,
  biAction: Object => void,
  biActionMapper: Object,
  host: string,
  hostname: string,
  articleId: string,
  userId: string,
};

export type ActionButtonProps = {
  render: ActionButtonRenderObject => Node,
};

export type ButtonProps = {
  children: ChildrenArray<Element<any> | null>,
  miscStyles?: StyleObj,
  href?: string | null,
  title?: ?string,
  props?: Object,
  onClick?: any => any,
};

export type CommentButtonProps = {
  ...CommonButtonProps,
};

export type FacebookButtonProps = {
  ...CommonButtonProps,
  buttonText: string | number,
  elementUrl: string,
  round: boolean,
};

export type FacebookLogoProps = {
  ...CommonButtonProps,
  elementUrl: string,
};

export type FacebookLogoState = {
  facebookCount?: number | string,
  host: ?string,
};

export type GooglePlusButtonProps = {
  ...CommonButtonProps,
  buttonText: string,
  elementUrl: string,
};

export type MailButtonProps = {
  ...CommonButtonProps,
  elementName: string,
  elementUrl: string,
};

export type MailAlertButtonProps = {
  ...CommonButtonProps,
  elementName: string,
  elementUrl: string,
};

export type MessengerButtonProps = {
  ...CommonButtonProps,
  buttonText: string,
  elementUrl: string,
};

export type PrintButtonProps = {
  ...CommonButtonProps,
};

export type TwitterButtonProps = {
  ...CommonButtonProps,
  elementName: string,
  elementUrl: string,
};

export type WhatsappButtonProps = {
  ...CommonButtonProps,
  elementUrl: string,
};

export type ZenButtonProps = {
  ...CommonButtonProps,
  buttonText: string | number,
  elementUrl: string,
};
