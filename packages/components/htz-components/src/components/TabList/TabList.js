// @flow
import React, { Children, isValidElement, cloneElement, } from 'react';
import type { ChildrenArray, Node, } from 'react';

type Props = {
  className?: ?string,
  render?: string,
  children: ChildrenArray<Node> | Node,
  activeTab?: ?number,
  setActiveTab?: ?(number) => void,
};

const TabList = ({
  render,
  className,
  children,
  activeTab,
  setActiveTab,
}: Props): Node => {
  const TabListTag: string = render || 'ul';
  return (
    <TabListTag className={className} role="tablist">
      {Children.map(
        children,
        (child, index) => (isValidElement(child)
          ? cloneElement(child, {
            isActive: index === activeTab,
            setActiveTab,
          })
          : child)
      )}
    </TabListTag>
  );
};

TabList.defaultProps = {
  className: null,
  render: 'ul',
  activeTab: null,
  setActiveTab: null,
};

export default TabList;
