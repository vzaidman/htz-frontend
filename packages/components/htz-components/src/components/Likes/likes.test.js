import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import Likes from './Likes';

test('should correctly render Likes Component with 0 rate when no props are passed', () => {
  const snapshot = felaSnapshotter(<Likes />);
  expect(snapshot).toMatchSnapshot();
});
test('should correctly render Likes Component with correct rates when passing props ', () => {
  const snapshot = felaSnapshotter(<Likes upVotes={13} downVotes={5} />);

  expect(snapshot).toMatchSnapshot();
});
