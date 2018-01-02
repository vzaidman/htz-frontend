import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import Caption from './Caption';

it('should correctly render a Caption bar with both credit and caption ', () => {
  const snapshot = felaSnapshotter(
    <Caption
      caption="The Caption"
      credit="me"
    />
  );
  expect(snapshot).toMatchSnapshot();
});
it('should correctly render a Caption bar with only the caption, Left to right, and with dynamic background ', () => {
  const snapshot = felaSnapshotter(
    <Caption
      caption="The Caption"
      direction="ltr"
      bgc={[ { until: 'xl', value: [ 'tertiary', '-3', ], }, { from: 'xl', value: 'primary', }, ]}
      color={[ { until: 'xl', value: 'primary', }, { from: 'xl', value: [ 'tertiary', '-3', ], }, ]}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
it('should correctly render a Caption bar with only the credit ', () => {
  const snapshot = felaSnapshotter(
    <Caption
      credit="me"
      creditPrefix="Credit"
    />
  );
  expect(snapshot).toMatchSnapshot();
});

it('should render no Caption bar', () => {
  const snapshot = felaSnapshotter(
    <Caption />
  );
  expect(snapshot).toMatchSnapshot();
});
