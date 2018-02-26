import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import AriaDescription from '../AriaDescription';

describe('AriaDescription component', () => {
  it('renders correctly', () => {
    const snapshot = felaSnapshotter(
      <AriaDescription id="my-div-description">
        This text describes the container
      </AriaDescription>
    );
    expect(snapshot).toMatchSnapshot();
  });
});
