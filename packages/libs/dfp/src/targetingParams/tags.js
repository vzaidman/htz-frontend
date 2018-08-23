import pushCommand from '../utils/pushCommand';
import { isDebugMode, } from '../utils/debugMode';

/**
 * Set 'tags' targeting parameter (async via googletag api)
 * @param {string[]} tags - array of tags
 */
export const setTags = tags => {
  pushCommand(googletag => {
    const pubads = googletag.pubads();
    if (isDebugMode()) {
      console.log('[dfp] setting targeting of tags: %o', tags);
    }
    pubads.setTargeting('tags', tags);
  });
};
