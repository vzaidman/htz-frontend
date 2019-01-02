import React from 'react';
import { FelaComponent, } from 'react-fela';


export default function PaywallMidpageContainer({ children, clearHeight, gradientHight, }) {
  return (
    <FelaComponent
      style={theme => ({
        position: 'absolute',
        flexDirection: 'column',
        top: clearHeight,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.getZIndex('above', 1),
        overflow: 'hidden',
      })}
    >
      <FelaComponent
        style={theme => ({
          position: 'relative',
          width: '100%',
          height: gradientHight,
          backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.92))',
        })}
      />
      <FelaComponent
        style={theme => ({
          position: 'absolute',
          top: gradientHight,
          width: '100%',
          zIndex: theme.getZIndex('above', 2),
        })}
      >
        {children}
      </FelaComponent>
      <FelaComponent
        style={theme => ({
          position: 'relative',
          width: '100%',
          height: '100%',
          opacity: 0.95,
          backgroundColor: 'white',
        })}
      />
    </FelaComponent>
  );
}
