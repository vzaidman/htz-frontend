import React from 'react';
import { FelaComponent, } from 'react-fela';
import Astronaut from '../../illustrations/Astronaut/Astronaut';

const RulerAstronaut = () => (
  <FelaComponent
    style={theme => ({
        position: 'relative',
        ...theme.mq({ until: 'm', }, {
          top: '2rem',
          left: '-10rem',
          transform: 'scaleX(-1)', // mirror horizontal
        }),
        ...theme.mq({ from: 'm', }, {
        top: '-20%',
      }),
    })}
    render={
      ({ className, }) => (
        <div className={className} >
          <Astronaut
            size={[
              { until: 's', value: 20, },
              { from: 's', until: 'l', value: 35, },
              { from: 'l', value: 60, },
            ]}
          />
        </div>
      )
    }
  />
);

export default RulerAstronaut;
