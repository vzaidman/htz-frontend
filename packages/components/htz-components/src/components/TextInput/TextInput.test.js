import React from 'react';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import TextInput from './TextInput';

describe('InputTest', () => {
  it('should correctly render a input component with default style', () => {
    const snapshot = felaSnapshotter(<TextInput />);
    expect(snapshot).toMatchSnapshot();
  });
  it('should correctly render a input component with error state style', () => {
    const snapshot = felaSnapshotter(<TextInput isError />);
    expect(snapshot).toMatchSnapshot();
  });
  it('render the component as a "textarea" element when the "isTextArea" prop is passed', () => {
    const snapshot = felaSnapshotter(<TextInput isTextArea />);
    expect(snapshot).toMatchSnapshot();
  });
  it('render the component as a input element with a custom yellow border color when isError is false', () => {
    const snapshot = felaSnapshotter(
      <TextInput inputBorderColor="yellow" inputBorderColorError="purple" />
    );
    expect(snapshot).toMatchSnapshot();
  });
});
it('render the component as a input element with a custom purple border color when isError', () => {
  const snapshot = felaSnapshotter(
    <TextInput isError inputBorderColor="yellow" inputBorderColorError="purple" />
  );
  expect(snapshot).toMatchSnapshot();
});
it('correctly render element and style based on styleObj prop', () => {
  const snapshot = felaSnapshotter(
    <TextInput
      styleObject={{
        height: '7em',
        width: '70%',
        borderWidth: '5px',
        color: 'purple',
        borderStyle: 'dashed',
      }}
    />
  );

  expect(snapshot).toMatchSnapshot();
});
