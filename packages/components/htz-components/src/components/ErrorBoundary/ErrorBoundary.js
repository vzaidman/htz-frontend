import PropTypes from 'prop-types';
import React from 'react';

import Debug from '../Debug/Debug';
import logger from '../../componentsLogger';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    FallbackComponent: PropTypes.node,
  };

  static defaultProps = {
    FallbackComponent: null,
  };

  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo, });
    logger.error(error, errorInfo);
  }

  render() {
    const { children, FallbackComponent, } = this.props;

    if (this.state.error) {
      return FallbackComponent ? (
        <FallbackComponent />
      ) : (
        <Debug>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: '2em', lineHeight: 1.5, }}>
              Oops... Something went wrong
            </h2>
            <p style={{ color: 'red', }}>{this.state.error.toString()}</p>
            <h3>Component Stack Error Details: </h3>
            <p className="red">{this.state.errorInfo.componentStack}</p>
          </div>
        </Debug>
      );
    }
    return children;
  }
}
