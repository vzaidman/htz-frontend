// @flow
import React from 'react';
import type { StatelessFunctionalComponent, ChildrenArray, } from 'react';

type Props = {
  className?: string,
  render?: string,
  children: ChildrenArray<any>,
}

const TabList: StatelessFunctionalComponent<Props> = ({ render, className, children, }) => {
  const TabListTag: string = render || 'ul';
  return (
    <TabListTag className={className} role="tablist">
      {children}
    </TabListTag>
  );
};

export default TabList;
