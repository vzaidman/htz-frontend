// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';

import type { ChildrenArray, Node, } from 'react';

type Props = {
  children: ChildrenArray<Node> | Node,
}

type State = {
  window: boolean,
}

class Debug extends React.Component<Props, State> {
  state = {
    window: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ window: true, });
  }

  render() {
    const { children, } = this.props;
    return this.state.window && window.location.search.includes('debug') ? (
      <FelaComponent
        style={theme => ({
          fontSize: '20px',
          color: theme.color('input', 'primaryErrorTextLabel'),
          textAlign: 'center',
        })}
      >
        {children}
      </FelaComponent>
    ) : null;
  }
}

export default Debug;
