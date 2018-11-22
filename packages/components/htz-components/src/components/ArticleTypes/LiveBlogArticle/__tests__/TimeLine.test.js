import React from 'react';
// import { FelaTheme, } from 'react-fela';
import felaSnapshotter from '../../../../test-helpers/felaSnapshotter';
import TimeLine from '../LiveBlogElements/TimeLine';
import { keyEvents, } from '../liveBlogDummyData';

describe('TimeLine component', () => {
  it('renders TimeLine correctly', () => {
    const snapshot = felaSnapshotter(<TimeLine keyEvents={keyEvents} />);
    expect(snapshot).toMatchSnapshot();
  });
});
