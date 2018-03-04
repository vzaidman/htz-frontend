import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Time from '../Time'; // eslint-disable-line import/no-named-as-default

describe('Simple Time component', () => {
  it('renders correctly with default format DD.MM.YYYY HH:mm', () => {
    const snapshot = felaSnapshotter(
      <Time time="Wed, 31 Jan 2018 13:24:04 GMT" />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('renders correctly with format prop', () => {
    const snapshot = felaSnapshotter(
      <Time time="01/02/2018 16:30" format="DD-MM-YYYY hh:mm" />
    );
    expect(snapshot).toMatchSnapshot();
  });
});

describe('Time component with DateFormatRule', () => {
  // eslint-disable-line no-global-assign
  Date.now = jest.fn(() => 247788000000);

  it('renders correctly using [Last hour] format', () => {
    const snapshot = felaSnapshotter(
      <Time
        time="1977/11/07 23:30"
        format={[
          { from: '-1h', format: '[Last hour]', },
          { from: '-7h', until: '-1h', format: 'HH:mm', },
          { until: '-7h', format: 'DD.MM.YYYY HH:mm', },
        ]}
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('renders correctly using HH:mm format', () => {
    const snapshot = felaSnapshotter(
      <Time
        time="1977/11/07 21:30"
        format={[
          { from: '-1h', format: '[Last hour]', },
          { from: '-7h', until: '-1h', format: 'HH:mm', },
          { until: '-7h', format: 'DD.MM.YYYY HH:mm', },
        ]}
      />
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('renders correctly using HH:mm format', () => {
    const snapshot = felaSnapshotter(
      <Time
        time="1977/11/07 21:30"
        format={[
          { format: 'HH:mm', },
          { until: '-1d', format: 'DD.MM.YYYY HH:mm', },
        ]}
      />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
