// @flow
import React, { Children, isValidElement, cloneElement, } from 'react';
import type { ChildrenArray, Node, } from 'react';

type Props = {
  activeTab?: number, // eslint-disable-line react/no-unused-prop-types
  children: ChildrenArray<Node> | Node,
}
type State = {
  activeTab: number,
}

class Tabs extends React.Component<Props, State> {
  static defaultProps = {
    activeTab: 0,
    className: '',
    render: null,
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
    const { children, } = this.props;
    const { activeTab, } = this.state;
    return (
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
    );
  }
}

export default Tabs;
