import React from 'react';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import MastheadSearch from '../MastheadSearch';

describe('<MastheadSearch>', () => {
  it('render correctly', () => {
    const snapshot = felaSnapshotter(
      <MastheadSearch
        searchIsOpen={false}
        onClick={() => console.log('change state')}
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
