/* global window */

/**
 * Execute a given command when googletag is ready.
 * does the same thing as `window.googletag.push()` does
 * @param {function(googletag)} cmd - callback that is invoked when googletag is ready
 */
const pushCommand = cmd => {
  window.googletag = window.googletag || {};
  const googletag = window.googletag;
  googletag.cmd = googletag.cmd || [];
  return googletag.cmd.push(() => cmd(googletag));
};

export default pushCommand;
