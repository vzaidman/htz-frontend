// @flow
import * as React from 'react';
import MarketingNotification from '../../../MarketingNotifications/MarketingNotification';
import type { PaywallData, } from '../../PaywallDataProvider';

export default function PaywallEmailActivation({
  title,
  text,
  confirm,
}: PaywallData): React.Node {
  return (
    <MarketingNotification
      notificationType="EmailConfirmation"
      buttonText={confirm.text}
      text1={title}
      text2={text}
    />
  );
}
