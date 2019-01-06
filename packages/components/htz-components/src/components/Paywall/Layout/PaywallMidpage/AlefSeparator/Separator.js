// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';

type Props = {
  color: string,
  marginLeft: string,
  marginRight: string,
};

export default function Separator({ color, marginLeft, marginRight, }: Props): React.Node {
  return (
    <FelaComponent
      style={{
        flexGrow: 1,
        marginLeft,
        marginRight,
        ...borderTop({
          width: '2px',
          lines: '1',
          style: 'solid',
          color,
        }),
      }}
    />
  );
}
