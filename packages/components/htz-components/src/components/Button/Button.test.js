import React from 'react';
import { createSnapshotFn, } from '@haaretz/htz-react-base/test';
import Button from './Button';
import createRenderer from '../StyleProvider/createRenderer';
import StyleProvider from '../StyleProvider/StyleProvider';

const felaSnapshot = createSnapshotFn(
  <StyleProvider renderer={createRenderer()} />
);

it('renders correctly', () => {
  const tree = felaSnapshot(<Button>Click here</Button>);
  expect(tree).toMatchSnapshot();
});
