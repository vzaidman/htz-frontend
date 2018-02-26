import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import Tags from './Tags';

it('MobileQuickRegistration ', () => {
  const snapshot = felaSnapshotter(
    <Tags
      tagsList={[
        {
          url: 'http://eran.themarker.com:8080/hayehudim-baim-1.2670',
          contentName: 'היהודים באים',
        },
        {
          url: '/food/dairy-1.2429',
          contentName: 'חלבי',
        },
        {
          url: '/news/terror-1.2603',
          contentName: 'טרור',
        },
      ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
