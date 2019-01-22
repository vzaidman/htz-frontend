/* global window, document, googletag */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Debug from '../Debug/Debug';

const propTypes = {
  id: PropTypes.string.isRequired,
  audianceTarget: PropTypes.string.isRequired,
  className: PropTypes.string,
  styleRule: PropTypes.func,
};
const defaultProps = {
  className: '',
  styleRule: null,
};

class AdSlotBase extends Component {
  state = {
    shouldRender: false,
    debugJsx: null,
  };

  componentDidMount() {
    if (!this.state.shouldRender) {
      const debugJsx = (
        <Debug>
          AdUnit:
          {this.props.id}
        </Debug>
      );
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ shouldRender: true, debugJsx, });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !this.state.shouldRender;
  }

  render() {
    if (this.state.shouldRender) {
      const { audianceTarget, } = this.props;
      return (
        <React.Fragment>
          {this.state.debugJsx}
          <FelaComponent
            rule={this.props.styleRule}
            render={({ className, }) => (
              <div
                id={this.props.id}
                data-audtarget={audianceTarget}
                className={`js-dfp-ad ${this.props.className
                  || ''} ${className}`}
              />
            )}
          />
        </React.Fragment>
      );
    }
    return null;
  }
}

AdSlotBase.propTypes = propTypes;
AdSlotBase.defaultProps = defaultProps;

export default AdSlotBase;
