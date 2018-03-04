import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import AlertsMobileButton from '../AlertsMobileButton'; // eslint-disable-line import/no-named-as-default

describe('AlertsMobileButton component', () => {
  it('renders correctly', () => {
    const author = {
      name: 'Avi Kaufman',
    };
    const snapshot = felaSnapshotter(
      <AlertsMobileButton author={author}>
        This is a subtitle
      </AlertsMobileButton>
    );
    expect(snapshot).toMatchSnapshot();
  });
});
