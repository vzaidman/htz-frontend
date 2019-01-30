// @flow
import React from 'react';
import type { Node, } from 'react';
import dynamic from 'next/dynamic';
import ReactGA from 'react-ga';
import * as GAPromo from './ga_data';

type NotificationType =
  | 'Strip'
  | 'Roller'
  | 'Popup'
  | 'Popup2'
  | 'BottomStrip'
  | 'EmailConfirmation'
  | 'MiddleRuller'
  | 'Weekly';

type Props = {
  icon: 'IconHourglass' | 'IconHourglassRunningOut' | null,
  buttonText: ?string,
  buttonUrl: ?string,
  color: 'yellow' | 'blue' | 'lightblue' | null,
  notificationType: NotificationType,
  onClose: ?() => void,
  text1: string,
  text2: ?string,
  promoCode: ?string,
  onSubmit: ?() => void,
};

class MarketingNotification extends React.Component<Props> {
  static defaultProps = {
    icon: null,
    buttonText: null,
    buttonUrl: null,
    color: null,
    notificationType: 'Strip',
    onClose: null,
    text1: null,
    text2: null,
    promoCode: null,
    onSubmit: null,
  };

  componentDidMount() {
    const { notificationType, promoCode, } = this.props;

    const promo = notificationType === 'popup'
      ? GAPromo[notificationType][promoCode]
      : GAPromo[notificationType];

    if (promo) {
      ReactGA.ga('ec:addPromo', { name: promo.name, id: promo.id, position: promo.position, });
    }
  }

  render(): Node {
    const {
      icon,
      buttonText,
      buttonUrl,
      color,
      notificationType,
      onClose,
      text1,
      text2,
      onSubmit,
    } = this.props;

    let Element;
    const importOptions = {
      loading: () => null,
      ssr: false,
    };
    switch (notificationType) {
      case 'Strip':
        Element = dynamic(() => import('./Strip/StripNotification'), importOptions);
        break;
      case 'MiddleRuller':
        Element = dynamic(() => import('./MiddleRuller/MiddleRullerNotification'), importOptions);
        break;
      case 'Popup':
        Element = dynamic(() => import('./Popup/PopupNotification'), importOptions);
        break;
      case 'Popup2':
        Element = dynamic(() => import('./Popup2/Popup2Notification'), importOptions);
        break;
      case 'Weekly':
        Element = dynamic(() => import('./Weekly/WeeklyNotification'), importOptions);
        break;
      case 'BottomStrip':
        Element = dynamic(() => import('./BottomStrip/BottomStripNotification'), importOptions);
        break;
      case 'EmailConfirmation':
        Element = dynamic(() => import('./EmailConfirmation/EmailConfirmationNotification'), importOptions);
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
          onSubmit,
        }}
      />
    );
  }
}

export default MarketingNotification;
