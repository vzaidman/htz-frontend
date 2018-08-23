/* global window */

import { isDebugMode, } from './debugMode';

const setDfpTagsParam = ({ tagsList, }) => {
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.googletag.cmd.push(() => {
    const tags = tagsList.map(x => x.contentName);
    const pubads = window.googletag.pubads();
    if (isDebugMode()) {
      console.log('[dfp] setting targeting of tags: %o', tags);
    }
    pubads.setTargeting('tags', tags);
  });
};

export default setDfpTagsParam;
