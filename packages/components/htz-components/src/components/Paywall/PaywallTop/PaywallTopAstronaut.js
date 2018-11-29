import React from 'react';
import { FelaComponent, } from 'react-fela';
import Astronaut from '../../illustrations/Astronaut/Astronaut';

const PaywallTopAstronaut = ({ shift, }) => (
  <FelaComponent
    style={theme => ({
        position: 'relative',
        ...theme.mq({ from: 'm', }, {
          overflow: 'hidden',
          top: `${shift.top}`,
          height: `calc(100% - ${shift.top})`,
          marginLeft: `-${shift.right}`,
        }),
    })}
  >
    <FelaComponent
      style={theme => ({
          position: 'relative',
          ...theme.mq({ from: 'm', }, {
            right: `-${shift.right}`,
          }),
      })}
    >
      <Astronaut
        size={[
          { until: 's', value: 20, },
          { from: 's', until: 'l', value: 35, },
          { from: 'l', value: 50, },
        ]}
      />
    </FelaComponent>
  </FelaComponent>
);

export default PaywallTopAstronaut;
