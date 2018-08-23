import pushCommand from '../utils/pushCommand';
import { isDebugMode, } from '../utils/debugMode';

/**
 * Set 'anonymousIdKey' targeting parameter (async via googletag api)
 * @param {string} anonymousId - unique anonymous user identifier
 */
export const setAnonymousIdKey = anonymousId => {
  pushCommand(googletag => {
    const pubads = googletag.pubads();
    if (isDebugMode()) {
      console.log('[dfp] setting targeting of anonymousId: %o', anonymousId);
    }
    pubads.setTargeting('anonymousIdKey', anonymousId);
  });
};
