import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';

export default function Separator({ color, marginLeft, marginRight, }) {
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
