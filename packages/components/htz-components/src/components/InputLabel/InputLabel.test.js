import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import InputLabel from './InputLabel';

it('should correctly render a InputLabel without any props or styles', () => {
  const snapshot = felaSnapshotter(<InputLabel />);
  expect(snapshot).toMatchSnapshot();
});
it('should correctly render a InputLabel with custom text passed as a prop ', () => {
  const snapshot = felaSnapshotter(<InputLabel text="this is a test text passed through a prop" />);
  expect(snapshot).toMatchSnapshot();
});
it('should correctly render a InputLabel with custom labelFor passed as a prop ', () => {
  const snapshot = felaSnapshotter(<InputLabel labelFor="ID12345" />);
  expect(snapshot).toMatchSnapshot();
});

it('should render a Input Label with styles and text matching styleObject and text props', () => {
  const snapshot = felaSnapshotter(
    <InputLabel
      text="a text prop"
      styleObject={{
        fontSize: '4rem',
        color: 'blue',
        backgroundColor: 'red',
      }}
    />
  );
  expect(snapshot).toMatchSnapshot();
});
