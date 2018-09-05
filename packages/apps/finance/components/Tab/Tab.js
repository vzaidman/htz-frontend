// @flow
import React from 'react';
import type { StatelessFunctionalComponent, ChildrenArray, Node, } from 'react';

type Props = {
  className?: string,
  render?: string,
  children: ChildrenArray<Node> | Node,
  selected: boolean,
  controls: string,
  presentation: boolean,
}

const Tab: StatelessFunctionalComponent<Props> = ({
  render,
  className,
  children,
  selected,
  controls,
  presentation,
  ...props
}) => {
  const TabTag: string = render || 'button';
  return presentation ? (
    <li role="presentation" className={className}>
      <TabTag
        tabindex={selected ? '0' : '-1'}
        role="tab"
        aria-controls={controls}
        aria-selected={selected}
        {...props}
      >
        {children}
      </TabTag>
    </li>
  ) : (
    <TabTag
      className={className}
      tabindex={selected ? '0' : '-1'}
      role="tab"
      aria-controls={controls}
      aria-selected={selected}
      {...props}
    >
      {children}
    </TabTag>
  );
};

export default Tab;
