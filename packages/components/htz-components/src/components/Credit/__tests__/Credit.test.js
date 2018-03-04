import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Credit from '../Credit'; // eslint-disable-line import/no-named-as-default
import CreditArticle from '../CreditArticle'; // eslint-disable-line import/no-named-as-default

describe('Credit of article', () => {
  it('renders correctly with minimum required props', () => {
    const snapshot = felaSnapshotter(<Credit name="Test Name" />);
    expect(snapshot).toMatchSnapshot();
  });

  it('renders correctly with a url prop', () => {
    const snapshot = felaSnapshotter(
      <Credit name="test name" url="/misc/writers/1.593896" />
    );
    expect(snapshot).toMatchSnapshot();
  });
});

describe('CreditArticle themed credit of article', () => {
  it('renders correctly with a url prop', () => {
    const snapshot = felaSnapshotter(
      <CreditArticle name="test name" url="/misc/writers/1.593896" />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
