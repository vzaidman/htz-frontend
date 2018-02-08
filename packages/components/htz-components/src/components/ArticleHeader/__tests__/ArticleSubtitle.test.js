import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Subtitle from '../_Subtitle'; // eslint-disable-line import/no-named-as-default

describe('Subtitle component', () => {
  it('renders correctly a \'p\' tag', () => {
    const snapshot = felaSnapshotter(
      <Subtitle>This is a subtitle</Subtitle>
    );
    expect(snapshot).toMatchSnapshot();
  });
});
