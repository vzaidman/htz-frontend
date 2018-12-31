// @flow
import React, { Children, isValidElement, cloneElement, } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import type { ChildrenArray, Node, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';

type Props = {
  activeTab?: number, // eslint-disable-line react/no-unused-prop-types
  children: ChildrenArray<Node> | Node,
  render: ?string,
  miscStyles?: StyleProps,
}

type State = {
  activeTab: number,
}

class Tabs extends React.Component<Props, State> {
  static defaultProps = {
    activeTab: 0,
    className: '',
    render: null,
    miscStyles: null,
  };

  state: State;

  static getDerivedStateFromProps(nextProps: Props) {
    return {
      activeTab: nextProps.activeTab,
    };
  }

  setActiveTab: number => void = tabIndex => (
    this.setState({
      activeTab: tabIndex,
    })
  );

  render(): Node {
    const { children, render, miscStyles, } = this.props;
    const { activeTab, } = this.state;
    const TabTag: string = render || 'div';
    return (
      <FelaComponent
        style={theme => ({
          extend: [
            ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
          ],
        })}
        render={({ className, }) => (
          <TabTag className={className}>
            {
              Children.map(
                children,
                child => {
                  const childName = child && child.type && child.type.name;
                  return (
                    (isValidElement(child) && [ 'TabList', 'TabPanels', ].includes(childName))
                      ? cloneElement(child, {
                        setActiveTab: this.setActiveTab,
                        activeTab,
                      })
                      : child
                  );
                }
              )
            }
          </TabTag>
        )}
      />
    );
  }
}

export default Tabs;
