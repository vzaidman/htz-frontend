import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import { renderToString, } from 'fela-tools';

/**
 * A factory for creating a per-package configured function that snapshots
 * styled Fela components.
 *
 * @param {Component} StyleProvider - The Fela `StyleProvider` used in the target package
 * @param {function} testRenderer - The Fela renderer used in the targes package's tests
 * @param {Object} [theme] - The `theme` object used in the target package
 *
 * @return {function} - a `felaSnapshotter` function that creates a snapshot of a
 *   styled Fela componet html as well as its styles
 */
export default function createFelaSnapshotter(
  StyleProvider,
  testRenderer,
  theme
) {
  return function felaSnapshotter(component) {
    const testObj = {
      // Output an object with both the component snapshot and raw styles.
      component: renderer
        .create(
          <StyleProvider renderer={testRenderer} theme={theme}>
            <div>{component}</div>
          </StyleProvider>
        )
        .toJSON(),
      styles: renderToString(testRenderer),
    };

    testRenderer.clear();
    return testObj;
  };
}
