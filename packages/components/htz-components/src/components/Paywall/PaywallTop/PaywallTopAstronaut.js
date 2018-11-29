import React from 'react';
import { FelaComponent, } from 'react-fela';
import Astronaut from '../../illustrations/Astronaut/Astronaut';

const outerStyle = theme => ({ mq, shift, size, }) => theme.mq(mq, {
  top: `${shift.top}`,
  height: `calc(100% - ${shift.top})`,
  marginLeft: `-${shift.right}`,
  fontSize: size, // astronaut size
});

const innerStyle = theme => ({ mq, shift, }) => theme.mq(mq, {
  right: `-${shift.right}`,
});

const PaywallTopAstronaut = ({ style, }) => (
  <FelaComponent
    style={theme => ({
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0, // prevent flex container from changing width
        extend: style.map(outerStyle(theme)),
    })}
  >
    <FelaComponent
      style={theme => ({
          position: 'relative',
          extend: style.map(innerStyle(theme)),
      })}
    >
      <Astronaut />
    </FelaComponent>
  </FelaComponent>
);

export default PaywallTopAstronaut;
