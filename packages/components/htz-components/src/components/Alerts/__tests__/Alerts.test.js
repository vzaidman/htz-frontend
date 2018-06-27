/** @jest-environment node */
import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Alerts from '../Alerts';

describe('Alerts component', () => {
  it('renders correctly', () => {
    const author = {
      name: 'Avi Kaufman',
    };

    const snapshot = felaSnapshotter(<Alerts author={author} />);
    expect(snapshot).toMatchSnapshot();
  });
});
