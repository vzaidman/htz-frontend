// @flow
import React from 'react';

import type { ChildrenArray, Node, } from 'react';

import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';

type Props = {
  children: ChildrenArray<Node> | Node,
};

function ListItem({ children, }: Props): Node {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export default ListItem;
