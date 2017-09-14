/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
const WorkboxPlugin = require('workbox-webpack-plugin');

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */

module.exports = {
  webpack: (config, { dev, }) => {
    // Make sure `resolve.alias` exists.
    config.resolve.alias = config.resolve.alias || {};

    config.resolve.alias.config$ = require.resolve(
      '@haaretz/htz-react-base/webpack/configShim'
    );

    config.plugins.push(
      // See config options here:
      // https://workboxjs.org/reference-docs/latest/module-workbox-build.html#.Configuration
      new WorkboxPlugin({
        swSrc: dev
          ? './lib/serviceWorker/serviceWorker.dev.js'
          : './lib/serviceWorker/serviceWorker.prod.js',
        // In development, generate an empty precache manifest.
        globPatterns: dev ? [] : [ '**/*.js', ],
        globIgnores: [
          // `.next/dist` is for transpiled files that the Application Server will
          // run, not the client.
          'dist/**',
          // `_document.js` will never be requested by the browser.
          'bundles/pages/_document.js',
          // These are only loaded by the dev server and return 404 in production.
          // Why they are output by the production build anyway, I don't know.
          'commons.js',
          'main.js',
          'manifest.js',
        ],
        // Unfortunately, the files in `.next` don't map to the URLs that the
        // Application Server will serve them from. For example:
        //
        // * On disk:
        //     .next/app.js
        // * Workbox assumed URL, based on `config.output.publicPath`:
        //     /_next/:buildId/webpack/app.js
        // * Actual URL used by Next.js:
        //    /_next/:hash/app.js
        //
        // Page bundles have different rules as well. "Chunks" seem to be the
        // only files without a special URL mapping. The "manifest transform"
        // below fixes the URLs that Workbox guesses to those that Next.js uses.
        manifestTransforms: [
          manifestEntries =>
            // We can't access the build ID and app.js hash from `.next/BUILD_ID`
            // or `.next/build-stats.json`, because at this point in the build
            // those files don't exist yet. Instead, rely on the fact that each
            // input `entry` already has the build ID in the URL, and the
            // `revision` field for app.js will match the `hash` in
            // `.next/build-stats.json`.
            manifestEntries.map(entry => {
              const match = entry.url.match(
                /^\/_next\/([\w-]+)\/webpack(\/bundles\/pages(\/.+)|\/.+)$/
              );
              if (!match) {
                throw new Error(
                  `Failed to process an entry in manifestTransforms: ${entry.url}`
                );
              }
              const buildId = match[1];
              const filePath = match[2];
              const page = match[3];
              let { url, } = entry;
              if (filePath === '/app.js') {
                url = `/_next/${entry.revision}/app.js`;
              }
              else if (page === '/_error.js') {
                url = `/_next/${buildId}/page/_error/index.js`;
              }
              else if (page) {
                // NOTE! The .js file for each page doesn't really have a
                // single canonical URL, Next.js basically uses `require()`
                // semantics to find it. That means:
                //
                //   /foo
                //   /foo.js (if this is the actual file)
                //   /foo/
                //   /foo/index
                //   /foo/index.js (if this is the actual file)
                //
                // ...all load the same .js file from a `/_next/:buildId/page`
                // URL that matches how it was requested, not normalized to
                // match the actual path on disk! So this function basically
                // has to pick one as the "right" URL. We can make sure this
                // assumption is correct by diligently using the same form
                // in the `pathname` of any routing in `server.js` and `<Link>`
                // elements: strip .js off the filename, then shorten any
                // `/index` to `/`.
                const pathname = page
                  .replace(/\.js$/, '')
                  .replace(/(^|\/)index$/, '/');
                url = `/_next/${buildId}/page${pathname}`;
              }
              // Anything else not covered above is probably a chunk generated
              // from a dynamic `import()`, and the URL should pass through as-is.

              // Since the build ID and app.js `hash` are already in the
              // URL, we can tell Workbox that the URLs don't need extra
              // cache-busting by removing the `revision` field and just
              // including `url`.
              return { url, };
            }),
        ],
      })
    );

    return config;
  },
};
