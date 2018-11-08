/* global window, document */
import React from 'react';
import PaywallBottomRuler from './PaywallBottomRuler/index';

const data = {
  slotLocation: 'bot-persist',
  title: 'כל התכנים, בכל מכשיר, בכל זמן',
  text: 'הארץ בדיגיטל החל מ-4.90שח בחודש הראשון',
  confirm: {
    text: 'לרכישה',
    url: 'https://promotions.haaretz.co.il/promotions-page/sale-htz',
  },
};

const componentFromLocation = location => {
  const map = {
    'bot-persist': PaywallBottomRuler,
  };
  return location in map
    ? map[location]
    : null;
};


class PaywallDbg extends React.Component {
  componentDidMount() {
    const display = val => {
      document.getElementById('paywall').style.display = val;
    };
    const paywall = {
      show: () => display('block'),
      hide: () => display('none'),
      update: () => this.forceUpdate(),
      data,
    };
    if (typeof window !== 'undefined') {
      window.paywall = paywall;
    }
  }

  render() {
    const Component = componentFromLocation(data.slotLocation);
    return (
      <div id="paywall" >
        {
          Component === null
            ? null
            : (
              <Component
                title={data.title}
                text={data.text}
                confirm={data.confirm}
              />
            )
        }
      </div>
    );
  }
}

export default PaywallDbg;
