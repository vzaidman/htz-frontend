import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import AlertsButton from '../AlertsButton'; // eslint-disable-line import/no-named-as-default

describe('AlertsButton component', () => {
  const author = {
    name: 'Avi Kaufman',
  };

  it('renders correctly', () => {
    const snapshot = felaSnapshotter(
      <AlertsButton author={author}>Follow me</AlertsButton>
    );
    expect(snapshot).toMatchSnapshot();
  });

  it('check button aria-expanded toggling', () => {
    const wrapper = felaMount(
      <AlertsButton author={author}>Follow me</AlertsButton>
    );

    wrapper.find('button').simulate('click');
    expect(wrapper.state('isExpanded')).toBeTruthy();
    expect(wrapper.find('button').prop('aria-expanded')).toEqual(true);

    wrapper.find('button').simulate('click');
    expect(wrapper.state('isExpanded')).toBeFalsy();
    expect(wrapper.find('button').prop('aria-expanded')).toEqual(false);
  });
});
