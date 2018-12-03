// @flow
import React from 'react';
import type { StatelessFunctionalComponent, ChildrenArray, } from 'react';

type Props = {
  className?: string,
  render?: string,
  id: string,
  children: ChildrenArray<any>,
}

const TabPanel: StatelessFunctionalComponent<Props> = ({
  render,
  id,
  className,
  children,
}) => {
  const TabPanelTag: string = render || 'div';
  return (
    <TabPanelTag id={id} className={className} role="tabpanel" aria-hidden="true">
      {children}
    </TabPanelTag>
  );
};

export default TabPanel;
