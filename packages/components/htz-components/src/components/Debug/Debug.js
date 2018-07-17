/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

class Debug extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

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
