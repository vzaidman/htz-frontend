import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Color from '../Color'; // eslint-disable-line import/no-named-as-default

describe('Color component', () => {
  it('renders a span tag,with \'primary\' color string', () => {
    const snapshot = felaSnapshotter(
      <Color color="primary">Primary color text</Color>
    )
    expect(snapshot).toMatchSnapshot();
  });

  it('renders a span tag,with \'primary\' color pair', () => {
    const snapshot = felaSnapshotter(
      <Color color={[ 'primary', '+1', ]}>Primary +1 color text</Color>
    )
    expect(snapshot).toMatchSnapshot();
  });

  it('renders a span tag,with "primary" color pair and "neutral" background-color', () => {
    const snapshot = felaSnapshotter(
      <Color color={[ 'primary', '+1', ]} bgColor="neutral">Primary +1 color with Neutral BG color text</Color>
    )
    expect(snapshot).toMatchSnapshot();
  });

  it('renders a strong tag,with "primary" color', () => {
    const snapshot = felaSnapshotter(
      <Color color="primary" tagName="strong">Primary color text in strong</Color>
    )
    expect(snapshot).toMatchSnapshot();
  });
});
