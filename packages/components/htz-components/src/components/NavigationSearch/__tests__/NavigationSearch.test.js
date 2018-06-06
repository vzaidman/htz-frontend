import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import NavigationSearch from '../NavigationSearch';

it('Navigation Search ', () => {
  const snapshot = felaSnapshotter(
    <NavigationSearch
      searchIsOpen={false}
      onClick={() => console.log('change state')}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
