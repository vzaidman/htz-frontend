import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import RespView282 from './views/RespView282';

const propTypes = {
  view: PropTypes.string.isRequired,
  banner: PropTypes.shape({
    percentage: PropTypes.number,
    title: PropTypes.string,
    link: PropTypes.string,
    linkTarget: PropTypes.string,
    replaceDomainForAdBlocker: PropTypes.bool,
    clicktrackerimage: PropTypes.shape({}),
    advertiserCamp: PropTypes.string,
  }).isRequired,
};
const defaultProps = {};

/**
 * This is a wrapper element for a single ClickTrackerElement.
 * It contains all of the information of the banner in the 'banner' prop,
 * and the selected view in the 'view' prop.
 * It's purpose is to load the appropriate view and pass down it's banner props.
 * @class ClickTrackerElement
 * @extends {Component}
 */
class ClickTrackerElement extends Component {
  state = {
    shouldRender: false,
  };

  componentWillMount() {
    if (!this.state.shouldRender) {
      this.setState({
        shouldRender: true,
      });
    }
  }

  render() {
    if (this.state.shouldRender) {
      const { banner, view, } = this.props;
      let clickTrackerView = null;
      // For Each View, create a JSX element with the appropriate banner props.
      switch (view) {
        case 'resp282':
          clickTrackerView = <RespView282 {...banner} />;
          break;

        default:
          clickTrackerView = null;
      }
      return clickTrackerView;
    }
    return null;
  }
}

ClickTrackerElement.propTypes = propTypes;
ClickTrackerElement.defaultProps = defaultProps;

export default ClickTrackerElement;
