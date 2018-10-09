import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import Tags from './Tags';

it('MobileQuickRegistration ', () => {
  const snapshot = felaSnapshotter(
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
  expect(snapshot).toMatchSnapshot();
});
