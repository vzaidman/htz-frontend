module.exports = {
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    'react'
  ],
  plugins: ['transform-object-rest-spread'],
  // Here's why the following `BABEL_ENV` check exists.
  // (1) We don't want test files copied into `/dist` during `build`, but we do
  // want Jest to transpile tests as needed.
  // (2) You'd think that we could use the `env` config option to specify
  // `ignore` only in certain environments automatically, but you'd be wrong -
  // `ignore` doesn't work under `env` for some reason.
  // (3) We could pass `--ignore` to the Babel CLI in the `build` script instead
  // of putting it in the config, but the `--ignore` option doesn't support
  // normal glob syntax like `{js,jsx}` - it splits on `,` first, so the
  // argument ends up being unwieldy, unlike the simple glob below.
  // (4) Technically, `babel-jest` actually seems to ignore this `ignore` option
  // and use its own, so everything still works without any `BABEL_ENV` check,
  // but that's sketchy - it seems like something that could change, and also
  // affects the ability to load test files via other non-Jest means.
  ignore:
    process.env.BABEL_ENV === 'production' ? ['**/*.{spec,test}.{js,jsx}'] : []
}
