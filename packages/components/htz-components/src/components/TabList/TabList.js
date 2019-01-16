// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import type { ChildrenArray, Node, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';

type Props = {
  render?: string,
  children: ChildrenArray<Node> | Node,
  miscStyles?: StyleProps,
};

TabList.defaultProps = {
  render: 'ul',
  miscStyles: null,
};

function TabList({ render, children, miscStyles, }: Props): Node {
  const TabListTag: string = render || 'ul';
  return (
    <FelaComponent
      style={theme => ({
        extend: [
          ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
        ],
      })}
      render={({ className, }) => (
        <TabListTag className={className} role="tablist">
          {children}
        </TabListTag>
      )}
    />
  );
}

export default TabList;
