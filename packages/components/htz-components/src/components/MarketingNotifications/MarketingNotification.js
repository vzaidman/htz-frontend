// @flow
import React from 'react';
import type { Node, } from 'react';
import dynamic from 'next/dynamic';

type NotificationType =
  | "Strip"
  | "Roller"
  | "Popup"
  | "Popup2"
  | "BottomStrip"
  | "EmailConfirmation"
  | "Weekly";

type Props = {
  icon: "IconHourglass" | "IconHourglassRunningOut" | null,
  buttonText: ?string,
  buttonUrl: ?string,
  color: "yellow" | "blue" | "lightblue" | null,
  notificationType: NotificationType,
  onClose: ?() => void,
  text1: string,
  text2: ?string,
};
MarketingNotification.defaultProps = {
  icon: null,
  buttonText: null,
  buttonUrl: null,
  color: null,
  notificationType: 'Strip',
  onClose: null,
  text1: null,
  text2: null,
};
export default function MarketingNotification({
  icon,
  buttonText,
  buttonUrl,
  color,
  notificationType,
  onClose,
  text1,
  text2,
}: Props): Node {
  let Element;
  switch (notificationType) {
    case 'Strip':
      Element = dynamic(() => import('./Strip/StripNotification'));
      break;
    case 'Popup':
      Element = dynamic(() => import('./Popup/PopupNotification'));
      break;
    case 'Popup2':
      Element = dynamic(() => import('./Popup2/Popup2Notification'));
      break;
    case 'Weekly':
      Element = dynamic(() => import('./Weekly/WeeklyNotification'));
      break;
    case 'BottomStrip':
      Element = dynamic(() => import('./BottomStrip/BottomStripNotification'));
      break;
    case 'EmailConfirmation':
      Element = dynamic(() => import('./EmailConfirmation/EmailConfirmationNotification')
      );
      break;
    default:
      return null;
  }

  return (
    <Element
      {...{
        buttonText,
        text1,
        text2,
        icon,
        buttonUrl,
        onClose,
        color,
      }}
    />
  );
}
