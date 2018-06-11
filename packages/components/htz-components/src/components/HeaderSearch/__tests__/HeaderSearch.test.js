import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import HeaderSearch from '../HeaderSearch';

describe('<HeaderSearch>', () => {
  it('render correctly', () => {
    const snapshot = felaSnapshotter(
      <HeaderSearch
        searchIsOpen={false}
        onClick={() => console.log('change state')}
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
