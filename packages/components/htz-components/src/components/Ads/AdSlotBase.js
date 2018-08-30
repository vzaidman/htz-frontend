/* global window, document, googletag */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { instance, } from './DfpInjector';
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
      const debugJsx = <Debug>AdUnit: {this.props.id}</Debug>;
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
      if (window.googletag && window.googletag.cmd) {
        window.googletag.cmd.push(() => {
          if (instance.dfp) {
            let maxTries = 30;
            const pollForDomElement = setInterval(() => {
              const elem = document.getElementById(this.props.id);
              if (elem) {
                const adSlot = instance.dfp.adManager.adSlots.get(
                  this.props.id
                );
                if (adSlot) {
                  if (adSlot.shown) {
                    adSlot.refresh();
                  }
                  else {
                    adSlot.show();
                  }
                }
              }
              if (elem || maxTries < 0) {
                clearInterval(pollForDomElement);
              }
              maxTries -= 1;
            }, 150);
          }
        });
      }
      return (
        <React.Fragment>
          {this.state.debugJsx}
          <FelaComponent
            customClass={`js-dfp-ad ${this.props.className}`}
            rule={this.props.styleRule}
            render={
              ({ className, }) => (
                <div
                  id={this.props.id}
                  data-audtarget={audianceTarget}
                  className={className}
                />
              )
            }
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
