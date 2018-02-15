import React from 'react';
import renderer from 'react-test-renderer';
import { renderToString, } from 'fela-tools';

/**
 * @typedef {function} FelaSnapshotter - a function that creates a snapshot of a
 *   styled Fela component html as well as its styles
 * @param {Component} component - The React Element to take a snapshot of
 * @param {Object} [testRendererOptions]
 *   An object that allows for custom mocking behavior in the react-test-renderer.
 * @param {Function} [testRendererOptions.createNodeMock]
 *   A callback function is passed a dom element from a `ref` and should return a mock ref object.
 *   See: http://bit.ly/2BaUNQw and http://bit.ly/2AJ8fIT
 *
 * @example
 * felaSnapshotter(<MyComponent />, {
 *   createNodeMock: element => (element.type === 'div' ? { clientHeight: 1064, } : null),
 * });
 */

/**
 * A factory for creating a per-package configured function that snapshots
 * styled Fela components.
 *
 * @param {ReactComponent} StyleProvider - The Fela `StyleProvider` used in the target package
 * @param {function} testRenderer - The Fela renderer used in the targes package's tests
 * @param {Object} [theme] - The `theme` object used in the target package
 *
 * @return {FelaSnapshotter} - a `felaSnapshotter` function that creates a snapshot of a
 *   styled Fela componet html as well as its styles
 */
export default function createFelaSnapshotter(
  StyleProvider,
  testRenderer,
  theme
) {
  return function felaSnapshotter(component, testRendererOptions = {}) {
    const testObj = {
      // Output an object with both the component snapshot and raw styles.
      component: renderer
        .create(
          <StyleProvider renderer={testRenderer} theme={theme}>
            <div>{component}</div>
          </StyleProvider>,
          testRendererOptions
        )
        .toJSON(),
      styles: renderToString(testRenderer),
    };

    testRenderer.clear();
    return testObj;
  };
}
