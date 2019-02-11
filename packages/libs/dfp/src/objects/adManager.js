/* global window, document,  googletag */
import isEqual from 'lodash/isEqual';
import { UserTypes, CookieUtils, } from '@haaretz/htz-user-utils';
import dispatchEvent from 'htz-dispatch-event';
import DfpUser from './user';
import ConflictResolver from './conflictResolver';
import AdSlot from './adSlot';
import { getBreakpoint, getBreakpointName, } from '../utils/breakpoints';
import { retrieveSsoGroupKey, storeSsoGroupKey, } from '../services/ssoGroup';
import { getCountry, } from '../services/ipInfo';
import { getCampaignId, } from '../services/gStat';

let breakpoints;
let debug = null;

const handleSsoGroupTargeting = (pubads, ssoUserId, isDebugMode) => {
  if (ssoUserId) {
    const ssoGroupKey = retrieveSsoGroupKey(ssoUserId);
    if (ssoGroupKey !== null) {
      if (isDebugMode) {
        console.log('[dfp] setting ssoGroupKey', ssoGroupKey);
      }
      pubads.setTargeting(ssoGroupKey, ssoUserId);
    }
    else {
      if (isDebugMode) {
        console.log(
          '[dfp] fetching ssoGroupKey of this user for later use'
        );
      }
      storeSsoGroupKey(ssoUserId);
    }
  }
};

// There are a total of 7 adTargets:
// "all","nonPaying","anonymous","registered","paying","digitalOnly" and "digitalAndPrint"
export const adPriorities = {
  high: 'high',
  normal: 'normal',
  low: 'low',
};

export const adTargets = {
  all: 'all',
  nonPaying: 'nonPaying',
  anonymous: 'anonymous',
  registered: 'registered',
  paying: 'paying',
  digitalOnly: 'digitalOnly',
  digitalAndPrint: 'digitalAndPrint',
};

export const adTypes = {
  maavaron: '.maavaron',
  popunder: '.popunder',
  talkback: '.talkback',
  regular: 'regular',
};

export default class AdManager {
  constructor(pageType, config) {
    this.config = Object.assign({}, config);
    this.pageType = pageType;
    breakpoints = breakpoints || this.config.breakpointsConfig.breakpoints;
    this.user = new DfpUser(config);
    this.conflictResolver = new ConflictResolver(
      config.conflictManagementConfig
    );
    /**
     * Avoid race conditions by making sure to respect the usual timing of GPT.
     * This DFP implementation uses Enable-Define-Display:
     * Define page-level settings
     * enableServices()
     * Define slots
     * Display slots
     */
    try {
      googletag.cmd.push(() => {
        this.initGoogleTargetingParams(); //  Define page-level settings
        this.initGoogleGlobalSettings(); //  enableServices()
        this.initSlotRenderedCallback(); //  Define callbacks
      });
      // Holds adSlot objects as soon as possible.
      googletag.cmd.push(() => {
        this.DEBUG
          && console.log(
            `3. Define slots - definition for ${
              adPriorities.high
            } priority slots`
          );
        this.adSlots = this.initAdSlots(config.adSlotConfig, adPriorities.high);
        googletag.cmd.push(() => {
          this.DEBUG
            && console.log(
              `3. Define slots - definition for ${
                adPriorities.normal
              } priority slots`
            );
          this.adSlots = this.initAdSlots(
            config.adSlotConfig,
            adPriorities.normal
          );
        });
      });
      // Once DOM ready, add more adSlots.
      // const onDomLoaded = () => {
      //   // eslint-disable-line no-inner-declarations
      //   try {
      //     googletag.cmd.push(() => {
      //       this.DEBUG
      //         && console.log(
      //           `3. Define slots - secondary definition for ${
      //             adPriorities.high
      //           } priority slots`
      //         );
      //       this.adSlots = this.initAdSlots(
      //         config.adSlotConfig,
      //         adPriorities.high
      //       );
      //     });
      //   }
      //   catch (err) {
      //     console.log(err); // eslint-disable-line no-console
      //   }
      // };
      // Once window was loaded, add the rest of the adSlots.
      // const onWindowLoaded = () => {
      //   // eslint-disable-line no-inner-declarations
      //   googletag.cmd.push(() => {
      //     this.DEBUG
      //       && console.log(
      //         `3. Define slots - definition for ${
      //           adPriorities.low
      //         } priority slots`
      //       );
      //     this.adSlots = this.initAdSlots(
      //       config.adSlotConfig,
      //       adPriorities.low
      //     );
      //     // Clean blocking adSlots that are not defined on this page
      //     for (const blockingAdSlotKey of this.conflictResolver.dependencyMap.keys()) {
      //       if (!this.adSlots.has(blockingAdSlotKey)) {
      //         this.conflictResolver.dependencyMap.delete(blockingAdSlotKey);
      //       }
      //     }
      //     this.showAllDeferredSlots();
      //   });
      // };
      /* switch (document.readyState) {
        case 'loading':
          document.addEventListener('DOMContentLoaded', onDomLoaded);
          window.addEventListener('load', onWindowLoaded);
          break;
        case 'interactive':
          window.addEventListener('load', () => {
            onDomLoaded();
            onWindowLoaded();
          });
          break;
        default:
          // 'complete' - no need for event listeners.
          onDomLoaded();
          onWindowLoaded();
      } */
    }
    catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  }

  /**
   * Memoized DEBUGGING flag to show debugging information
   */
  // eslint-disable-next-line class-methods-use-this
  get DEBUG() {
    if (debug !== null) {
      return debug;
    }
    debug = window.location.search.includes('debug') || false;
    return debug;
  }

  /**
   * Shows all of the adSlots that can be displayed, if they haven't been shown already.
   * @param {string} priorityFilter an optional ad priority to filter slots to show
   */
  showAllSlots(priorityFilter) {
    for (const adSlotKey of this.adSlots.keys()) {
      const adSlot = this.adSlots.get(adSlotKey);
      const adSlotMatchPriorityFilter = adSlot.priority === priorityFilter;
      if (
        // adSlot.type !== adTypes.talkback &&
        adSlotMatchPriorityFilter
        && this.shouldSendRequestToDfp(adSlot)
      ) {
        this.DEBUG
          && console.log(
            `${
              adSlot.id
            } this.shouldSendRequestToDfp(adSlot) is: ${!!this.shouldSendRequestToDfp(
              adSlot
            )}`
          );
        if (!adSlot.shown) {
          adSlot.show();
        }
      }
    }
  }

  /**
   * Gets all adSlots that has a certain priority
   * @param {adPriority} priority - the priority of the ad {high, normal, low}
   * @return {Array<AdSlot>} adSlots - all of the defined adSlots that matches
   * the given priority
   */
  getAdSlotsByPriority(priority) {
    function priorityFilter(adSlot) {
      return adSlot.priority === priority;
    }
    return Array.from(this.adSlots.values()).filter(priorityFilter);
  }

  showAllDeferredSlots() {
    for (const deferredSlotId of this.conflictResolver.deferredSlots) {
      if (this.adSlots.has(deferredSlotId)) {
        if (!this.conflictResolver.isBlocked(deferredSlotId)) {
          const deferredAdSlot = this.adSlots.get(deferredSlotId);
          if (this.shouldSendRequestToDfp(deferredAdSlot)) {
            deferredAdSlot.show();
          }
        }
      }
    }
  }

  /**
   * Refreshes all responsive adSlots
   */
  refreshAllSlots() {
    const currentBreakpoint = getBreakpoint(breakpoints);
    for (const adSlotKey of this.adSlots.keys()) {
      const adSlot = this.adSlots.get(adSlotKey);
      if (adSlot.responsive && adSlot.type !== adTypes.maavaron) {
        if (
          adSlot.lastResolvedWithBreakpoint !== currentBreakpoint
          && this.shouldSendRequestToDfp(adSlot)
        ) {
          this.DEBUG && console.log(`calling refresh for adSlot: ${adSlot.id}`);
          adSlot.refresh();
        }
        else {
          adSlot.hide();
        }
      }
    }
  }

  /**
   * Refreshes all adSlots
   */
  refreshAllSlotsInPage() {
    for (const adSlotKey of this.adSlots.keys()) {
      const adSlot = this.adSlots.get(adSlotKey);
      if (this.shouldSendRequestToDfp(adSlot)) {
        // console.log(`calling refresh for adSlot: ${adSlot.id}`);
        adSlot.refresh();
      }
      else {
        adSlot.hide();
      }
    }
  }

  /**
   * Refreshes adSlot
   */

  refreshSlot(adUnitName) {
    const adSlot = this.adSlots.get(adUnitName);
    if (this.shouldSendRequestToDfp(adSlot)) {
      // console.log(`calling refresh for adSlot: ${adSlot.id}`);
      adSlot.refresh();
    }
    else {
      adSlot.hide();
    }
  }

  /**
   * Initializes adSlots based on the currently found slot markup (HTML page specific),
   * and the predefined configuration for the slots.
   * @param {Object} adSlotConfig - the AdSlots configuration object (see: globalConfig)
   * @param {String} filteredPriority - filters out all adSlots that does not match
   * a given adPriority. This is used to cherry pick the init process of ads.
   * @returns {Map}
   */
  initAdSlots(adSlotConfig, filteredPriority) {
    const adSlots = new Map(this.adSlots);
    for (const adSlotId in adSlotConfig) {
      if (adSlotConfig[adSlotId].priority === filteredPriority) {
        try {
          const adSlotHtmlElement = document.getElementById(adSlotId);
          // adSlotConfig is built from globalConfig, but can be overridden by markup
          const computedAdSlotConfig = Object.assign(
            {},
            adSlotConfig[adSlotId],
            {
              id: adSlotId,
              target: adSlotHtmlElement
                ? adSlotHtmlElement.attributes['data-audtarget']
                  ? adSlotHtmlElement.attributes['data-audtarget'].value
                  : adTargets.all
                : adTargets.all,
              type: this.getAdType(adSlotId),
              responsive: adSlotConfig[adSlotId].responsive,
              fluid: adSlotConfig[adSlotId].fluid || false,
              user: this.user,
              adManager: this,
              htmlElement: adSlotHtmlElement,
              department: this.config.department,
              network: this.config.adManagerConfig.network,
              adUnitBase: this.config.adManagerConfig.adUnitBase,
              deferredSlot: this.conflictResolver.isBlocked(adSlotId),
              priority: adSlotConfig[adSlotId].priority || adPriorities.normal,
            }
          );
          const adSlotInstance = new AdSlot(computedAdSlotConfig);
          adSlots.set(adSlotId, adSlotInstance);
          if (
            adSlotInstance.type !== adTypes.talkback
            && adSlotInstance.priority === adPriorities.high
            && this.shouldSendRequestToDfp(adSlotInstance)
          ) {
            /*
              console.log('calling show for high priority slot', adSlotInstance.id, ' called @',
              window.performance.now());
              */
            adSlotInstance.show();
          }
        }
        catch (err) {
          console.error(err); // eslint-disable-line no-console
        }
      }
    }
    return adSlots;
  }

  // eslint-disable-next-line class-methods-use-this
  isPriority(adSlotId) {
    return (
      typeof adSlotId === 'string'
      && (adSlotId.indexOf('plazma') > 0
        || adSlotId.indexOf('maavaron') > 0
        || adSlotId.indexOf('popunder') > 0)
    );
  }

  /**
   * Returns the adType based on the adSlot name.
   * @param {String} adSlotId - the adSlot's identifier.
   * @returns {*} enumerated export 'adTypes'
   */
  // eslint-disable-next-line class-methods-use-this
  getAdType(adSlotId) {
    if (!adSlotId) {
      throw new Error(
        'Missing argument: a call to getAdType must have an adSlotId'
      );
    }
    if (adSlotId.indexOf(adTypes.maavaron) > -1) return adTypes.maavaron;
    if (adSlotId.indexOf(adTypes.popunder) > -1) return adTypes.popunder;
    if (adSlotId.indexOf(adTypes.talkback) > -1) return adTypes.talkback;
    return adTypes.regular;
  }

  /**
   * @param {object} adSlot the AdSlot
   * @returns {boolean|*}
   */
  shouldSendRequestToDfp(adSlot) {
    // Conflict management check
    return (
      adSlot !== undefined
      // Has a required DOM Element
      && adSlot.htmlElement
      // Isn't blocked by another adSlot
      && this.conflictResolver.isBlocked(adSlot.id) === false
      // Valid Referrer check
      && adSlot.isWhitelisted()
      // Not in referrer Blacklist
      && adSlot.isBlacklisted() === false
      && this.shouldDisplayAdAfterAdBlockRemoval(adSlot)
      //  if a paywall pop-up is shown And the number is 12 or more - SHOW MAAVRON
      && this.shouldDisplayAdMaavaronAfterPayWallBanner(adSlot)
      // Mobile device detection (responsive)
      // && this.isMobile(adSlot)
      // Responsive: breakpoint contains ad?
      && this.doesBreakpointContainAd(adSlot)
      // check in case of Smartphoneapp
      && this.haveValidCookieForSmartphoneapp()
      // Targeting check (userType vs. slotTargeting)
      && this.doesUserTypeMatchBannerTargeting(adSlot)
      // Impressions Manager check (limits number of impressions per slot)
      && this.user.impressionManager.reachedQuota(adSlot.id) === false
    );
  }

  shouldDisplayAdAfterAdBlockRemoval(adSlot) {
    return !(
      this.config.adBlockRemoved === true
      && (adSlot.type === adTypes.maavaron || adSlot.type === adTypes.popunder)
    );
  }

  shouldDisplayAdMaavaronAfterPayWallBanner(adSlot) {
    let shouldDisplay = true;
    if (this.config.site === 'haaretz' && adSlot.type === adTypes.maavaron) {
      try {
        const paywallBanner = JSON.parse(window.localStorage.getItem('_cobj'));
        shouldDisplay = !paywallBanner
          || ((paywallBanner.mc && paywallBanner.mc >= 12)
            || (paywallBanner.nextslotLocation
              && !paywallBanner.nextslotLocation.includes('pop')));
      }
      catch (err) {
        /* eslint-disable no-console */
        console.error('ERROR ON shouldDisplayAdMaavaronAfterPayWallBanner');
        /* eslint-enable no-console */
      }
    }
    return shouldDisplay;
  }

  /**
   * Check whether or not an ad slot should appear for the current user type
   * @param {String} adSlotOrTarget the adSlot to check or the target as a string
   * @returns {boolean} true iff the slot should appear for the user type
   */

  haveValidCookieForSmartphoneapp() {
    return this.config.isValidForsmartPhone;
  }

  /**
   * Check whether or not an ad slot should appear for the current user type
   * @param {String} adSlotOrTarget the adSlot to check or the target as a string
   * @returns {boolean} true iff the slot should appear for the user type
   */
  doesUserTypeMatchBannerTargeting(adSlotOrTarget) {
    const cookieMap = CookieUtils.getCookieAsMap();
    if (cookieMap.login === 'pilosmadar@gmail.com') {
      return true;
    }

    const userType = this.user.type;
    const adTarget = typeof adSlotOrTarget === 'string'
      ? adSlotOrTarget
      : adSlotOrTarget.target;

    switch (adTarget) {
      case adTargets.all:
        return true;
      case adTargets.nonPaying:
        return (
          userType === UserTypes.anonymous || userType === UserTypes.registered
        );
      case adTargets.anonymous:
        return userType === UserTypes.anonymous;
      case adTargets.registered:
        return userType === UserTypes.registered;
      case adTargets.paying:
        return userType === UserTypes.paying;
      case adTargets.digitalOnly:
        return userType === UserTypes.paying;
      case adTargets.digitalAndPrint:
        return userType === UserTypes.paying;
      default:
        return false;
    }
  }

  /**
   * Report to the AdManager that a breakpoint has been switched (passed from one break to
   * another). Should there be a responsive slot with a
   * @param {Breakpoint} breakpoint - the breakpoint that is currently being displayed
   * @returns {Integer} affected - the number of adSlots affected by the change
   */
  switchedToBreakpoint(breakpoint) {
    if (!breakpoint) {
      throw new Error(
        'Missing argument: a call to switchedToBreakpoint must have an breakpoint'
      );
    }
    let count = 0;
    for (const adSlotKey of this.adSlots.keys()) {
      const adSlot = this.adSlots.get(adSlotKey);
      if (adSlot.responsive === true && adSlot.lastResolvedWithBreakpoint) {
        if (adSlot.lastResolvedWithBreakpoint !== breakpoint) {
          adSlot.refresh();
          count += 1;
        }
      }
    }
    return count;
  }

  /**
   * Checks whether an adSlot is defined for a given breakpoint (Default: current breakpoint)
   * @param {AdSlot} adSlot - the adSlot to check.
   * @param {Breakpoint} [breakpoint=currentBreakpoint] - the breakpoint to check this ad in.
   * @returns {boolean} true iff the adSlot is defined for the given breakpoint.
   */
  doesBreakpointContainAd(adSlot, breakpoint = getBreakpoint(breakpoints)) {
    if (!adSlot) {
      throw new Error(
        'Missing argument: a call to doesBreakpointContainAd must have an adSlot'
      );
    }
    let containsBreakpoint = true;
    if (adSlot.responsive === true) {
      const mapping = adSlot.responsiveAdSizeMapping[
        getBreakpointName(breakpoint, breakpoints)
      ];
      if (Array.isArray(mapping) === false) {
        throw new Error(
          `Invalid argument: breakpoint:${breakpoint} doesn't exist!`,
          this
        );
      }
      containsBreakpoint = mapping.length > 0 && !isEqual(mapping, [ [ 0, 0, ], ]);
    }
    return containsBreakpoint;
  }

  /**
   * Checks whether an adSlot should be loaded on mobile or desktop.
   * If the adSlot is for mobile, only load it when the user is on mobile devices.
   * If the adSlot isn't for mobile, make sure it doesn't load on mobile devices.
   * @param {AdSlot} adSlot - the adSlot to check.
   * @returns {boolean} true iff the adSlot should be displayed.
   */
  /* isMobile(adSlot) {
    if (!adSlot) {
      throw new Error(
        'Missing argument: a call to isMobile must have an adSlot'
      );
    }
    const isMobileAdSlot = adSlot.id.includes('mobile_web');
    const isOnMobile = this.config.isMobile;
    return isMobileAdSlot === isOnMobile;
  } */

  /**
   * Initializes the callback from the 'slotRenderEnded' event for each slot
   */
  initSlotRenderedCallback() {
    if (window.googletag && window.googletag.apiReady) {
      const pubads = window.googletag.pubads();
      pubads.addEventListener('slotRenderEnded', event => {
        const id = event.slot.getAdUnitPath().split('/')[3];
        // const isEmpty = event.isEmpty;
        // const resolvedSize = event.size;
        if (id.toLowerCase().indexOf('inread') >= 0) {
          const element = document.getElementById(id);
          if (element) {
            dispatchEvent(element, 'inreadBannerSlotRendered', { id, isEmpty: event.isEmpty, size: event.size, });
          }
        }
        this.DEBUG
          && console.log(
            'slotRenderEnded for slot',
            id,
            ' called @',
            window.performance.now()
          );

        if (this.adSlots && this.adSlots.has(id)) {
          const adSlot = this.adSlots.get(id);
          this.user.impressionManager.registerImpression(`${adSlot.id}${this.config.department}`);
          this.user.impressionManager.registerImpression(`${adSlot.id}_all`);
        }
        // if (this.adSlots.has(id)) {
        //   const adSlot = this.adSlots.get(id);
        //   adSlot.lastResolvedSize = resolvedSize;
        //   adSlot.lastResolvedWithBreakpoint = getBreakpoint(breakpoints);
        //   if (isEmpty) {
        //     adSlot.lastResolvedSize = ConflictResolver.EMPTY_SIZE;
        //     adSlot.hide();
        //     this.releaseSlotDependencies(adSlot);
        //   }
        //   else {
        //     this.releaseSlotDependencies(adSlot, adSlot.lastResolvedSize);
        //   }
        //   this.user.impressionManager.registerImpression(
        //     `${adSlot.id}${this.config.department}`
        //   );
        //   this.user.impressionManager.registerImpression(`${adSlot.id}_all`);
        //   this.DEBUG && console.log('registered impression for ', adSlot.id);
        //   // console.trace();
        // }
        // else {
        //   this.DEBUG &&
        //     console.error(`Cannot find an adSlot with id: ${id} - Ad Unit path is
        //    ${event.slot.getAdUnitPath()}`);
        // }
      });
    }
    else {
      throw new Error(
        "googletag api was not ready when 'initSlotRenderedCallback' was called!"
      );
    }
  }

  releaseSlotDependencies(adSlot) {
    try {
      const id = adSlot.id;
      this.conflictResolver.updateResolvedSlot(id, adSlot.lastResolvedSize);
      if (this.conflictResolver.isBlocking(id)) {
        // Hide all blocked adSlots
        for (const blockedSlot of this.conflictResolver.getBlockedSlotsIds(
          id
        )) {
          if (this.conflictResolver.isBlocked(blockedSlot)) {
            if (this.adSlots.has(blockedSlot)) {
              this.adSlots.get(blockedSlot).hide();
            }
          }
        }
        // Show the non blocked
        for (const deferredSlotKey of this.conflictResolver.deferredSlots.keys()) {
          const deferredAdSlot = this.adSlots.get(deferredSlotKey);
          if (deferredAdSlot && this.shouldSendRequestToDfp(deferredAdSlot)) {
            this.conflictResolver.deferredSlots.delete(deferredSlotKey);
            if (deferredAdSlot.deferredSlot) {
              this.DEBUG
                && console.log(
                  `Runtime Define slots - definition for a defered (blocked) slot ${
                    deferredAdSlot.id
                  }`
                );
              deferredAdSlot.defineSlot();
              deferredAdSlot.deferredSlot = false;
            }
            deferredAdSlot.show();
          }
        }
      }
    }
    catch (err) {
      this.DEBUG
        && console.error(`Cannot updateSlotDependencies for adSlot: ${adSlot.id}`);
    }
  }

  /**
   * Initializes page-level targeting params.
   */
  initGoogleTargetingParams() {
    if (window.googletag && window.googletag.apiReady) {
      this.DEBUG && console.log('1. Define page-level settings');
      // Returns a reference to the pubads service.
      const pubads = googletag.pubads();
      // Environment targeting (dev, test, prod)
      if (this.config.environment) {
        pubads.setTargeting('stg', [ this.config.environment, ]);
      }

      // App targeting
      pubads.setTargeting('react', [ true, ]);

      pubads.setTargeting('pageType', [ this.pageType, ]);

      if (this.pageType.includes('hp')) {
        // Homepage targeting only
        pubads.setTargeting('country', getCountry());
        pubads.setTargeting('gstat_campaign_id', getCampaignId());
      }
      else if (this.pageType.includes('article')) {
        // Article page only
        if (this.user.type) {
          pubads.setTargeting('UserType', [ this.user.type, ]);
        }
        if (this.user.gender) {
          pubads.setTargeting('urgdr', [ this.user.gender, ]);
        }
      }

      // User targeting
      if (this.user.htz_type) {
        pubads.setTargeting('htz_user_type', [ this.user.htz_type, ]);
      }
      if (this.user.tm_type) {
        pubads.setTargeting('tm_user_type', [ this.user.tm_type, ]);
      }
      if (this.user.hdc_type) {
        pubads.setTargeting('hdc_user_type', [ this.user.hdc_type, ]);
      }
      if (this.user.age) {
        pubads.setTargeting('age', [ this.user.age, ]);
      }
      if (this.user.sso) {
        handleSsoGroupTargeting(pubads, this.user.sso.userId, this.DEBUG);
      }
      // Context targeting
      if (this.config.section) {
        pubads.setTargeting('section', [ this.config.section, ]);
      }
      if (this.config.subSection) {
        pubads.setTargeting('subsection', [ this.config.subSection, ]);
      }
      if (this.config.articleId) {
        pubads.setTargeting('articleId', [ this.config.articleId, ]);
      }
      if (
        this.config.gStatCampaignNumber
        && this.config.gStatCampaignNumber !== -1
      ) {
        pubads.setTargeting('gstat_campaign_id', [
          this.config.gStatCampaignNumber,
        ]);
      }
      if (this.config.proposalNumber) {
        pubads.setTargeting('proposaltype', [ this.config.proposalNumber, ]);
      }
      if (this.config.isWriterAlerts) {
        pubads.setTargeting('WriterAlerts', [ 'true', ]);
      }
      // UTM targeting
      /* eslint-disable no-underscore-dangle */
      if (this.config.utm_.content) {
        pubads.setTargeting('utm_content', [ this.config.utm_.content, ]);
      }
      if (this.config.utm_.source) {
        pubads.setTargeting('utm_source', [ this.config.utm_.source, ]);
      }
      if (this.config.utm_.medium) {
        pubads.setTargeting('utm_medium', [ this.config.utm_.medium, ]);
      }
      if (this.config.utm_.campaign) {
        pubads.setTargeting('utm_campaign', [ this.config.utm_.campaign, ]);
      }
      /* eslint-enable no-underscore-dangle */
      // AdBlock removal
      if (this.config.adBlockRemoved) {
        pubads.setTargeting('adblock_removed', [ this.config.adBlockRemoved, ]);
      }
      // University targeting - triggered via cookie
      if (this.config.wifiLocation) {
        pubads.setTargeting('wifi', [ this.config.wifiLocation, ]);
      }

      // Ads Centering
      pubads.setCentering(true);
      // Ads Collapsing
      pubads.collapseEmptyDivs();
    }
    else {
      throw new Error(
        "googletag api was not ready when 'initGoogleTargetingParams' was called!"
      );
    }
  }

  /**
   * Initializes googletag services.
   */
  initGoogleGlobalSettings() {
    if (window.googletag && window.googletag.apiReady) {
      this.DEBUG && console.log('2. enableServices()');
      const pubads = googletag.pubads();
      const googleGlobalSettings = Object.assign(
        {},
        this.config.googleGlobalSettings
      );
      // Enable GET parameter overrides
      if (window.location.search) {
        const search = window.location.search;
        if (search.indexOf('sraon') > 0) {
          this.DEBUG && console.log('Single Request Mode: active'); // eslint-disable-line no-console
          googleGlobalSettings.enableSingleRequest = true;
        }
        else if (search.indexOf('sraoff') > 0) {
          this.DEBUG && console.log('Single Request Mode: disabled'); // eslint-disable-line no-console
          googleGlobalSettings.enableSingleRequest = false;
        }
        if (search.indexOf('asyncrenderingon') > 0) {
          this.DEBUG && console.log('Async rendering mode: active'); // eslint-disable-line no-console
          googleGlobalSettings.enableAsyncRendering = true;
        }
        else if (search.indexOf('asyncrenderingonoff') > 0) {
          this.DEBUG && console.log('Sync rendering mode: active'); // eslint-disable-line no-console
          googleGlobalSettings.enableAsyncRendering = false;
        }
      }
      // Google services activation
      // Once we implement a single request compatible version, this can be enabled
      // if (googleGlobalSettings.enableSingleRequest === true) {
      //   googletag.pubads().enableSingleRequest();
      // }
      if (googleGlobalSettings.enableAsyncRendering === true) {
        pubads.enableAsyncRendering();
        // if (googleGlobalSettings.disableInitialLoad === true) {
        //   console.log('disabling initial load');
        //   pubads.disableInitialLoad();
        // }
      }
      else {
        pubads.enableSyncRendering();
      }
      // Enables all GPT services that have been defined for ad slots on the page.
      googletag.enableServices();
    }
    else {
      throw new Error(
        "googletag api wasn't ready when 'initGoogleGlobalSettings' was called!"
      );
    }
  }
}
