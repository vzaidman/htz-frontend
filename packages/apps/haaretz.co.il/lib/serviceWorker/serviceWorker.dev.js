/**
 * This file will be used as a template by `workbox-webpack-plugin`. It will
 * NOT be transpiled, but it is guaranteed to be running in browsers that
 * support some modern syntax anyway. Just be careful what syntax you use here.
 * We could allow using any syntax here, but use a special `babel-preset-env`
 * config for Service Worker enabled browsers just for this file.
 */

// We could copy the `workbox-sw` distribution files to `.next` like `generateSW()`
// does, but the Application Server doesn't just automatically serve any file from
// `.next`, only the ones it's expecting. Instead of doing that copying and routing
// ourselves, for now we just load it from the handy unpkg CDN. We could also inline
// it instead of using `importScripts()`.
// NOTE: Can't use the shorthand `/package@version` URL here because
// `importScripts()` apparently disallows loading scripts from redirects.
importScripts(
  'https://unpkg.com/workbox-sw@2.0.1/build/importScripts/workbox-sw.dev.v2.0.1.js'
);

console.log('[Service Worker] Hello from sw.js!');

// In development, we want to take control and force any open pages to refresh.
const workboxSW = new self.WorkboxSW({ skipWaiting: true, });

// `workbox-webpack-plugin` will replace the following line with an asset list.
// In development, this should be empty.
workboxSW.precache([]);

self.addEventListener('activate', () => {
  console.log('[Service Worker] Activated!');
  self.clients.matchAll({ type: 'window', }).then(windowClients => {
    if (windowClients.length) {
      console.log(
        `[Service Worker] Reloading ${windowClients.length} other client(s).`
      );
    }
    for (const windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url);
    }
  });
});
