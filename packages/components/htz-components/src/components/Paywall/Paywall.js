// @flow
import * as React from 'react';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import type { StyleProps, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import PaywallDataProvider from './PaywallDataProvider';
import PaywallBottom from './Layout/PaywallBottom/PaywallBottom';
import PaywallTop from './Layout/PaywallTop/PaywallTop';
import PaywallPopup from './Layout/PaywallPopup/PaywallPopup';
import PaywallMidpage from './Layout/PaywallMidpage/PaywallMidpage';
import type { SlotLocation, PaywallData, } from './PaywallDataProvider';

type PaywallLayout = React.ComponentType<PaywallData>;


const mapper = {
  'bot-persist': PaywallBottom,
  top: PaywallTop,
  popup: PaywallPopup,
  'mid-page': PaywallMidpage,
};

function selectLayout(slotLocation: SlotLocation): ?PaywallLayout {
  return slotLocation in mapper
    ? mapper[slotLocation]
    : null; // default
}


type Props = {
  /** list of allowed layouts that could be rendered */
  layouts: SlotLocation[],
  /** function that specifies how to render the selected layout */
  miscStyles: StyleProps,
};

Paywall.defaultProps = {
  miscStyles: null,
};


/**
 * Requests paywall data and renders a matching layout if is specified in `layouts` prop
 *
 * @export
 * @param {Props} { layouts, miscStyles, }
 * @returns {React.Node}
 * @example ```<Paywall layout=['top', 'bot-persist'] />```
    will either render <PaywallTop /> or <PaywallBottom /> according to the response
 */
export default function Paywall({ layouts, miscStyles, }: Props): React.Node {
  return (
    <PaywallDataProvider>
      {paywallData => {
        const Layout = selectLayout(paywallData.slotLocation);
        if (Layout != null) {
          const renderedLayout = (<Layout {...paywallData} />);
          // render selected layout only if it was specified in the `layout` prop
          if (layouts.includes(paywallData.slotLocation)) {
            return miscStyles != null
              ? (
                <FelaComponent
                  style={theme => ({
                    extend: parseStyleProps(miscStyles, theme.mq, theme.type),
                  })}
                >
                  {renderedLayout}
                </FelaComponent>
              )
              : renderedLayout;
          }
        }
        return null;
      }}
    </PaywallDataProvider>
  );
}
