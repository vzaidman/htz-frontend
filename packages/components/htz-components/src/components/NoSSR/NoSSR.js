import React from 'react';
import PropTypes from 'prop-types';

class NoSSR extends React.Component {
  static propTypes = {
    /**
     * Nodes rendered inside `NoSSR`.
     * Passed to the underlying react element
     */
    children: PropTypes.node,
    /**
     * Render node on server side rendering.
     */
    onSSR: PropTypes.node,
  };

  static defaultProps = {
    children: null,
    onSSR: null,
  };

  state = {
    shouldRender: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ shouldRender: true, });
  }

  render() {
    const { children, onSSR, } = this.props;
    const { shouldRender, } = this.state;

    return shouldRender ? children : onSSR;
  }
}

export default NoSSR;
