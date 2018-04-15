import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import NavigationSearch from '../NavigationSearch';

it('Navigation Search ', () => {
  const snapshot = felaSnapshotter(<NavigationSearch />);
  expect(snapshot).toMatchSnapshot();
});
