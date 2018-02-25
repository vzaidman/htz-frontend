import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import AlertsDesktopButton from '../AlertsDesktopButton'; // eslint-disable-line import/no-named-as-default

describe('AlertsDesktopButton component', () => {
  it('renders correctly', () => {
    const author = {
      name: 'Avi Kaufman',
    };

    const snapshot = felaSnapshotter(
      <AlertsDesktopButton author={author}>
        This is a subtitle
      </AlertsDesktopButton>
    );
    expect(snapshot).toMatchSnapshot();
  });
});
