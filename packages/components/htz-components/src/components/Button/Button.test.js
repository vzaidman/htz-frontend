import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import StyledButton from './Button';

it('renders correctly', () => {
  const tree = felaSnapshotter(<StyledButton>Click here</StyledButton>);
  expect(tree).toMatchSnapshot();
});
