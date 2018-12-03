// @flow
import React, { Children, isValidElement, cloneElement, } from 'react';
import type { StatelessFunctionalComponent, ChildrenArray, Node, } from 'react';

type Props = {
  className?: string,
  render?: string,
  children: ChildrenArray<Node> | Node,
  activeTab?: number,
  setActiveTab?: number => void,
}

const TabList: StatelessFunctionalComponent<Props> =
// eslint-disable-next-line react/prop-types
  ({ render, className, children, activeTab, setActiveTab, }) => {
    const TabListTag: string = render || 'ul';
    return (
      <TabListTag className={className} role="tablist">
        {
          Children.map(
          children,
          (child, index) => (
            (isValidElement(child))
              ? cloneElement(child, { isActive: index === activeTab, setActiveTab, })
              : child
          )
        )}
      </TabListTag>
    );
  };

export default TabList;
