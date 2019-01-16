// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { StyleProps, } from '@haaretz/htz-css-tools';

type Props = {
  activeTab: number,
  render: ?string,
  miscStyles?: StyleProps,
  children: ({
    activeTab: number,
    setActiveTab: number => void,
  }) => Node,
}

type State = {
  activeTab: number,
}

class Tabs extends React.Component<Props, State> {
  static defaultProps = {
    render: null,
    miscStyles: null,
  };

  state = {
    activeTab: this.props.activeTab,
  };

  setActiveTab: number => void = tabIndex => (
    this.setState({
      activeTab: tabIndex,
    })
  );

  render(): Node {
    const { render, miscStyles, children, } = this.props;
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
              children({ activeTab, setActiveTab: this.setActiveTab, })
            }
          </TabTag>
        )}
      />
    );
  }
}

export default Tabs;
