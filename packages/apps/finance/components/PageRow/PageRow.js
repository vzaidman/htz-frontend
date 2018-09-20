// @flow
import React from 'react';
import type { ChildrenArray, Node, StatelessFunctionalComponent } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

type Props = {
  children: ChildrenArray<Node> | Node,
  miscStyles? : Object,
}

const PageRow:StatelessFunctionalComponent<Props> = ({ children, miscStyles, }) => (
  <FelaComponent
    style={theme => ({
      width: '127rem',
      marginBottom: '4rem',
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
