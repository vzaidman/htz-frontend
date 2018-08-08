import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

import PlayBuzz from '../elements/PlayBuzz';

it('PlayBuzz ', () => {
  const snapshot = felaSnapshotter(
    <PlayBuzz
      settings={{
        'data-id': 'data-item="df25b0eb-1402-435d-a4f2-83ff06cf7b36"',
        facebook: false,
        share: false,
        recommendations: false,
        info: false,
      }}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
