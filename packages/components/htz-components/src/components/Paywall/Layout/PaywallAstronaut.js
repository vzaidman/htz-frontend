// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import type { StyleProps, } from '@haaretz/htz-css-tools';
import Astronaut from '../../illustrations/Astronaut/Astronaut';

const outerStyle = theme => ({ mq, shift, size, other, }) => theme.mq(mq, {
  fontSize: size,
  ...(shift
    ? {
      top: `${shift.top}`,
      height: `calc(100% - ${shift.top})`,
      marginLeft: `-${shift.right}`,
    }
    : {}
  ),
  ...other,
});


const innerStyle = theme => ({ mq, shift, }) => theme.mq(mq, shift
  ? {
    right: `-${shift.right}`,
  }
  : {}
);


type CustomStyle = {
  /** media query */
  mq: {
    from?: string,
    until?: string,
    misc?: string,
  },
  /** shift the astronaut as follows: */
  shift?: {
    /** shift top with overflow (overflow is hidden on all other directions) */
    top: string,
    /** shift right with margin correction on the left */
    right: string,
  },
  /** astronaut size */
  size: string,
  /** regular style options */
  other?: StyleProps,
};

type Props = {
  style: CustomStyle[],
};

export default function PaywallAstronaut({ style, }: Props): React.Node {
  return (
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
}
