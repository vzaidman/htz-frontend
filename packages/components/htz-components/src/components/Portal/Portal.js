/* global document */
import React from 'react';
import { createPortal, } from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.Component {
  static propTypes = {
    /**
     * Nodes rendered inside `hostElement`.
     */
    children: PropTypes.node,
    /**
     * Host element, can be passed as node or as node id (string).
     * If the string does not refer to any id,
     * default `div` element will be created and the string will be the new `div` id
     */
    host: PropTypes.oneOfType([ PropTypes.string, PropTypes.node, ]).isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = { hasDom: false, };

  componentDidMount = () => {
    this.setState({ hasDom: true, });
  };

  render() {
    if (!this.state.hasDom) return null;

    const { children, host, } = this.props;
    if (typeof host === 'string') {
      let hostElement = document.getElementById(host);

      if (!hostElement) {
        hostElement = document.createElement('div');
        hostElement.id = host;
        document.body.appendChild(hostElement);
      }

      return createPortal(children, hostElement);
    }

    return createPortal(children, host);
  }
}

export default Portal;
