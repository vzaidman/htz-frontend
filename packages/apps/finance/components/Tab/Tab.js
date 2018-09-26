// @flow
import React from 'react';
import type { StatelessFunctionalComponent, ChildrenArray, Node, ComponentType, } from 'react';
import { FelaComponent, } from 'react-fela';

type Props = {
  render?: string | ComponentType<any>,
  children: ChildrenArray<Node> | Node,
  isActive?: boolean,
  index: number,
  controls: string,
  presentation: boolean,
  rule?: Object,
  setActiveTab?: number => void,
  onClick?: Function,
}

/* eslint-disable react/prop-types */
const Tab: StatelessFunctionalComponent<Props> = ({
  render,
  children,
  isActive,
  index,
  controls,
  presentation,
  rule,
  setActiveTab,
  onClick,
  ...props
}) => {
/* eslint-enable react/prop-types */
  const TabTag: string | ComponentType<any> = render || 'button';
  return (
    <FelaComponent
      rule={rule}
      isActive={isActive}
      {...props}
      render={({ className, }) => (presentation ? (
        <li role="presentation" className={className}>
          <TabTag
            onClick={() => { if (setActiveTab) setActiveTab(index); if (onClick) onClick(); }}
            tabIndex={isActive ? '0' : '-1'}
            role="tab"
            aria-controls={controls}
            aria-selected={isActive}
          >
            {children}
          </TabTag>
        </li>
      ) : (
        <TabTag
          onClick={() => { if (setActiveTab) setActiveTab(index); if (onClick) onClick(); }}
          className={className}
          tabIndex={isActive ? '0' : '-1'}
          role="tab"
          aria-controls={controls}
          aria-selected={isActive}
        >
          {children}
        </TabTag>
      ))}
    />
  );
};

export default Tab;
