/* global window */
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
  /** A render prop that by default is set to be:
   *
   * ```
   * (banner, viewMode) => <ClickTrackerElement banner={banner} view={viewMode} />
   * ```
   *
   * can be overriden for custom banner views */
  render: PropTypes.func,
};
const defaultProps = {
  render: (banner, viewMode) => (
    <ClickTrackerElement banner={banner} view={viewMode} />
  ),
};

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
 * A wrapper container for a ClickTracker ad-slot.
 * It is a logical unit that decides which banner and in which view mode
 * it should be displayed.
 * @class ClickTrackerWrapper
 * @extends {Component}
 */
class ClickTrackerWrapper extends Component {
  constructor(props) {
    super(props);
    this.banners = this.props.banners || [];
    const hasBanners = this.banners.length > 0;
    this.viewMode =
      this.props.viewModes && this.props.viewModes.viewModeHtz
        ? this.props.viewModes.viewModeHtz
        : '';
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
      const DEBUG =
        typeof window !== 'undefined' &&
        window.location.search.includes('debug');
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
          DEBUG &&
            console.log(
              'ClickTrackerWrapper: selection of banner failed, falling back to the first one'
            );
        }
        else {
          DEBUG &&
            console.log(
              `ClickTrackerWrapper: selection of banner was successfull, selected ${this.banners.indexOf(
                selectedBanner
              ) + 1} out of ${this.banners.length}`
            );
        }
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
          shouldRender: true,
          banner: selectedBanner,
          viewMode: this.viewMode,
        });
      }
    }
  }

  render() {
    if (this.state.shouldRender) {
      const { banner, viewMode, } = this.state;
      return this.props.render(banner, viewMode);
    }
    return null;
  }
}

ClickTrackerWrapper.propTypes = propTypes;
ClickTrackerWrapper.defaultProps = defaultProps;

export default ClickTrackerWrapper;
