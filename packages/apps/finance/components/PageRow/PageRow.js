// @flow
import React from 'react';
import type { ChildrenArray, Node, StatelessFunctionalComponent, } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

type Props = {
  children: ChildrenArray<Node> | Node,
  lines?: number,
  miscStyles? : Object,
}

// eslint-disable-next-line react/prop-types
const PageRow:StatelessFunctionalComponent<Props> = ({ children, miscStyles, lines, }) => (
  <FelaComponent
    style={theme => ({
      width: '127rem',
      marginBottom: `${lines || 4}rem`,
      extend: [
        ...(miscStyles
          ? parseStyleProps(miscStyles, theme.mq, theme.type)
          : []),
      ],
    })}
  >
    {children}
  </FelaComponent>
);

export default PageRow;
