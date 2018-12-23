// @flow
import React from 'react';
import type { Node, ChildrenArray, } from 'react';

type Props = {
  className?: ?string,
  render: string,
  id: string,
  children: ChildrenArray<any>,
};

const TabPanel = ({ render, id, className, children, }: Props): Node => {
  const TabPanelTag: string = render;
  return (
    <TabPanelTag
      id={id}
      className={className}
      role="tabpanel"
      aria-hidden="true"
    >
      {children}
    </TabPanelTag>
  );
};

TabPanel.defaultProps = {
  render: 'div',
  className: null,
};
export default TabPanel;
