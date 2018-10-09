import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import FileUpload from '../elements/FileUpload';

it('File upload ', () => {
  const snapshot = felaSnapshotter(
    <ApolloProvider client={client}>
      <FileUpload
        source="https://docs.google.com/document/d/1t7fYkPye3uwUnDnImV-1GqcLitnpNiCDc22k2TU9EoA/edit#heading=h.5x0d5h95i329"
        embedType="excel"
        contentName="gdfjgh"
      />
    </ApolloProvider>
  );
  expect(snapshot).toMatchSnapshot();
});
