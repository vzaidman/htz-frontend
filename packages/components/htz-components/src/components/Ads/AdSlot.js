/* global window, document, googletag */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { instance, } from './DfpInjector';
import Debug from '../Debug/Debug';
import Zen from '../Zen/Zen';

const propTypes = {
  id: PropTypes.string.isRequired,
  audianceTarget: PropTypes.string.isRequired,
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

class AdSlot extends Component {
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
        <Zen hide>
          {this.state.debugJsx}
          <div
            id={this.props.id}
            className={`js-dfp-ad ${this.props.className}`}
            data-audtarget={audianceTarget}
          />
        </Zen>
      );
    }
    return null;
  }
}

AdSlot.propTypes = propTypes;
AdSlot.defaultProps = defaultProps;
// const WrappedAdSlot = compose(
//   graphql(UPDATE_USER),
//   graphql(GET_USER, {
//     props: ({ data, }) => data,
//   })
// )(AdSlot);

export default AdSlot;
