import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Kicker from '../Kicker'; // eslint-disable-line import/no-named-as-default

describe('Kicker component', () => {
  it('renders correctly a span tag for kicker', () => {
    const snapshot = felaSnapshotter(
      <Kicker
        fontSize={[
          { until: 'm', value: 3, },
          { from: 'm', until: 'l', value: 4, },
          { from: 'l', value: 5, },
        ]}
        text="פרשנות"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('renders correctly a div tag for kicker', () => {
    const snapshot = felaSnapshotter(
      <Kicker
        isBlock={true}
        fontSize={[
          { until: 'm', value: 3, },
          { from: 'm', until: 'l', value: 4, },
          { from: 'l', value: 5, },
        ]}
        text="פרשנות"
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
