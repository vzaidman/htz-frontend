import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import ClickTrackerElement from './ClickTrackerElement';

const propTypes = {
  viewModes: PropTypes.shape({
    viewModeHtz: PropTypes.string,
    viewModeTM: PropTypes.string,
    viewModeHtzMobile: PropTypes.string,
    viewModeTmMobile: PropTypes.string,
    viewModeJson: PropTypes.string,
  }).isRequired,
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      percentage: PropTypes.number,
      title: PropTypes.string,
      link: PropTypes.string,
      linkTarget: PropTypes.string,
      replaceDomainForAdBlocker: PropTypes.bool,
      clicktrackerimage: PropTypes.shape({}),
      advertiserCamp: PropTypes.string,
    })
  ).isRequired,
  totalPercentage: PropTypes.number.isRequired,
};
const defaultProps = {};

const isValidViewMode = viewMode => true;

/**
 * This returns a random integer between the specified values.
 * The value is no lower than min (or the next integer greater than min if min isn't an integer),
 * and is less than (but not equal to) max.The maximum is inclusive and the minimum is inclusive.
 * @param {*} min the minimum integer of the range
 * @param {*} max the maximum integer of the range
 * @returns an integer between min and max [min, max]
 */
function getRandomIntInclusive(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  // Adding minCeil moves range from [0, max-min] to [min, max-min+min]
  // eslint-disable-next-line no-mixed-operators
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

/**
 * A wrapper container for a ClickTracker ad slot.
 * Logical unit that decides which banner (ClickTrackerElement) should be displayed.
 * It's purpose is to decide which banner and view should be displayed.
 * @class ClickTrackerWrapper
 * @extends {Component}
 */
class ClickTrackerWrapper extends Component {
  constructor(props) {
    super(props);
    this.banners = this.props.banners || [];
    const hasBanners = this.banners.length > 0;
    this.viewMode = this.props.viewModes.viewModeHtz || '';
    const hasValidViewMode = isValidViewMode(this.viewMode);
    if (hasBanners && hasValidViewMode) {
      this.banners = this.props.banners;
    }
  }

  state = {
    shouldRender: false,
  };

  componentDidMount() {
    if (!this.state.shouldRender) {
      if (Array.isArray(this.banners) && this.banners.length > 0) {
        const randomSelection = getRandomIntInclusive(
          0,
          this.props.totalPercentage
        );
        let selectedBanner = this.banners.find(
          banner =>
            randomSelection > banner.minRange &&
            randomSelection < banner.maxRange
        );
        if (!selectedBanner) {
          selectedBanner = this.banners[0];
          console.log(
            'selection of banner failed, falling back to the first one'
          );
        }
        else {
          console.log(
            `'selection of banner was successfull, selected ${this.banners.indexOf(
              selectedBanner
            ) + 1} out of ${this.banners.length}`
          );
        }
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          shouldRender: true,
          selectedBanner,
        });
      }
    }
  }

  render() {
    if (this.state.shouldRender) {
      return (
        <ClickTrackerElement
          banner={this.state.selectedBanner}
          view={this.viewMode}
        />
      );
    }
    return null;
  }
}

ClickTrackerWrapper.propTypes = propTypes;
ClickTrackerWrapper.defaultProps = defaultProps;

export default ClickTrackerWrapper;
