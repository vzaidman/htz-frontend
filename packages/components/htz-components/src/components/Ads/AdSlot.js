/* global window */
import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';

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
      const debugJsx = window.location.search.includes('debug') ? (
        <h1
          style={{
            fontSize: '20px',
            color: 'red',
            textAlign: 'center',
            margin: '12px',
          }}
        >
          AdUnit: {this.props.id}
        </h1>
      ) : null;
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
        <Fragment>
          {this.state.debugJsx}
          <div
            id={this.props.id}
            className={`js-dfp-ad ${this.props.className}`}
            data-audtarget={audianceTarget}
          />
        </Fragment>
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
