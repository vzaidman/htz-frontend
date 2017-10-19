import React from 'react';
import renderer from 'react-test-renderer';
// eslint-disable-next-line import/no-extraneous-dependencies
import { renderToString, } from 'fela-tools';

// function Wrapper({children,}) {
//   return children;
// }
export default function createFelaSnapshotter(StyleProvider, testRenderer) {
  return function testFelaSnapshot(component) {
    const testObj = {
      // Output an object with both the component snapshot and raw styles.
      component: renderer
        .create(
          <StyleProvider renderer={testRenderer}>
            <div>{component}</div>
          </StyleProvider>
        )
        .toJSON(),
      styles: renderToString(testRenderer),
    };

    return testObj;
  };
}
