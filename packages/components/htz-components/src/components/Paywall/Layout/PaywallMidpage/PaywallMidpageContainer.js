// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';

type Props = {
  /** the content of the container */
  children: React.Node,
  /** height cleared of the container */
  clearHeight: string,
  /** height of the gradient part of the container */
  gradientHight: string,
};


export default function PaywallMidpageContainer({
  children,
  clearHeight,
  gradientHight,
}: Props): React.Node {
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
          // opacity: 0.95,
          backgroundColor: 'white',
        })}
      />
    </FelaComponent>
  );
}
