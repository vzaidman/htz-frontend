/* global window */
import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import ClickTrackerElement from './ClickTrackerElement';
import logger from '../../componentsLogger';

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
      chance: PropTypes.number,
      title: PropTypes.string,
      link: PropTypes.string,
      linkTarget: PropTypes.string,
      replaceDomainForAdBlocker: PropTypes.bool,
      clicktrackerimage: PropTypes.shape({}),
      advertiserCamp: PropTypes.string,
    })
  ).isRequired,
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
    this.viewMode = this.props.viewModes && this.props.viewModes.viewModeHtz
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
      const DEBUG = typeof window !== 'undefined'
        && window.location.search.includes('debug');
      if (Array.isArray(this.banners) && this.banners.length > 0) {
        let selectedBanner = this.getSelectedBanner();
        if (!selectedBanner) {
          selectedBanner = this.banners[0];
          DEBUG
            && logger.debug(
              'ClickTrackerWrapper: selection of banner failed, falling back to the first one'
            );
        }
        else {
          DEBUG
            && logger.debug(
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

  getSelectedBanner = () => {
    if (this.banners.length === 1) { return this.banners[0]; }
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let incrementChance = 0;
    return this.banners.find(banner => {
      incrementChance += banner.chance;
      return randomNumber <= incrementChance;
    });
  };

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
