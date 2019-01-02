/* eslint-disable quote-props */
import React from 'react';
import PaywallDataProvider from './PaywallDataProvider';
import PaywallBottom from './Layout/PaywallBottom/PaywallBottom';
import PaywallTop from './Layout/PaywallTop/PaywallTop';
import PaywallPopup from './Layout/PaywallPopup/PaywallPopup';
import PaywallMidpage from './Layout/PaywallMidpage/PaywallMidpage';


const mapper = {
  'bot-persist': PaywallBottom,
  'top': PaywallTop,
  'popup': PaywallPopup,
  'midpage': PaywallMidpage,
};

function selectLayout(slotLocation) {
  return slotLocation in mapper
    ? mapper[slotLocation]
    : null;
}


Paywall.defaultProps = {
  render: Layout => (<Layout />),
};

// render: Layout => React.Component
export default function Paywall({ layouts, render, }) {
  return (
    <PaywallDataProvider>
      {paywallData => {
        const Layout = selectLayout(paywallData.slotLocation);
        // render selected layout only if it was specified in the `layout` prop
        return layouts.includes(paywallData.slotLocation)
          ? (render(() => <Layout {...paywallData} />))
          : null;
      }}
    </PaywallDataProvider>
  );
}
