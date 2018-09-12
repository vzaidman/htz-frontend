/* globals window, googletag */
import AdManager from './objects/adManager';
import globalConfig from './globalConfig';
import { getBreakpoint, debounce, } from './utils/breakpoints';

const resizeTimeout = 250;
let breakpoints;

export default class DFP {
  constructor(config) {
    this.config = Object.assign({}, globalConfig({}), config);
    breakpoints = breakpoints || this.config.breakpointsConfig.breakpoints;
    this.wasInitialized = false;
    this.initStarted = false;
    this.breakpoint = getBreakpoint(breakpoints);
    this.initWindowResizeListener();
  }

  /**
   * This part of the object's construction is dependent on the call to 'init'
   */
  resumeInit() {
    console.log('[dfp] resumeInit called');
    try {
      this.adManager = this.adManager || new AdManager(this.config);
    }
    catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }

  /**
   *  Returns true iff googletag was properly initialized on the page
   * @returns {boolean}
   */
  isGoogleTagReady() {
    if (
      this.wasInitialized === true ||
      (window.googletag && window.googletag.apiReady)
    ) {
      this.wasInitialized = true;
    }
    return this.wasInitialized;
  }

  /**
   * Initializes the window resize listener to support responsive ad refreshes
   */
  initWindowResizeListener() {
    const dfpThis = this;
    function onResize() {
      const currentBreakpoint = getBreakpoint(breakpoints);
      if (dfpThis.breakpoint !== currentBreakpoint) {
        dfpThis.breakpoint = currentBreakpoint;
        if (dfpThis.adManager) {
          dfpThis.adManager.refreshAllSlots();
        }
        else {
          throw new Error(
            'initWindowResizeListener error - adManager instance is not available'
          );
        }
      }
    }
    const debouncedFunction = debounce(onResize, resizeTimeout);
    window.onresize = debouncedFunction;
  }
}
