/* global window document */
import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import queryCommandStatePolyFill from '../../../test-helpers/queryCommandStatePolyFill';
import execCommandPolyfill from '../../../test-helpers/execCommandPolyfill';
import TextInput from '../TextInput';

// Math random used to generate random ids in TextInput,
// next row is used to produce same id everytime so tests wont fail
Math.random = jest.fn(() => 123456789);

describe('<TextInput>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<TextInput />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with attrs prop', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput attrs={{ 'aria-label': 'A input with custom attributes', }} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with defaultValue prop', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput defaultValue="defalut value given" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with isError and errorText prop', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput isError errorText="אנא הזינו כתובת תקינה" noteText="i shouldnt render" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly without isError, noteText and errorText prop', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput errorText="i shouldnt render" noteText="description note" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with custom inputId, labelId and noteId', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput inputId="customInputId" labelId="customLabelId" noteId="customNoteId" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with labelHidden', () => {
      const { component, styles, } = felaSnapshotter(<TextInput label="label" labelHidden />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a contentEditable div', () => {
      const { component, styles, } = felaSnapshotter(<TextInput isContentEditable />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a contentEditable div with label', () => {
      const { component, styles, } = felaSnapshotter(<TextInput isContentEditable label="label" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a disabled input', () => {
      const { component, styles, } = felaSnapshotter(<TextInput isDisabled />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a disabled input', () => {
      const { component, styles, } = felaSnapshotter(<TextInput isDisabled />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a textarea', () => {
      const { component, styles, } = felaSnapshotter(<TextInput isTextArea />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a textarea with max and min length', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput isTextArea maxLength={100} minLength={2} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a input with a onInput function', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput onInput={() => console.log('got input')} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a input with a placeholder', () => {
      const { component, styles, } = felaSnapshotter(<TextInput placeholder="im a placeholder" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a input with a requiredText', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput
          requiredText={{
            long: 'im required',
            short: '*',
            miscStyles: { color: 'green', },
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a input with a requiredText that is rendered as sup', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput
          requiredText={{
            isSup: true,
            long: 'im required',
            short: '*',
            miscStyles: { color: 'green', },
          }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a type=email prop', () => {
      const { component, styles, } = felaSnapshotter(<TextInput type="email" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a input with a value prop', () => {
      const { component, styles, } = felaSnapshotter(<TextInput value="value from parent" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a input with a variant prop', () => {
      const { component, styles, } = felaSnapshotter(<TextInput variant="primaryInverse" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a input with a miscStyles prop', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput miscStyles={{ padding: '5.32rem', }} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly a textArea with a simple height prop', () => {
      const { component, styles, } = felaSnapshotter(<TextInput isTextArea height={5} />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('changes isFocused state correctlly when focusing and bluring the input', () => {
      const output = felaMount(<TextInput label="label" />);
      expect(output.state().isFocused).toEqual(false);
      const input = output.find('input');
      input.simulate('focus');
      expect(output.state().isFocused).toEqual(true);
      expect(output).toMatchSnapshot();
      input.simulate('blur');
      expect(output.state().isFocused).toEqual(false);
      expect(output).toMatchSnapshot();
    });
    it('changes isFocused state correctlly when focusing and bluring the input and fires custom onFocus and onBlur from props', () => {
      const output = felaMount(
        <TextInput
          label="label"
          onFocus={() => console.log('focusing')}
          onBlur={() => console.log('bluring')}
        />
      );
      expect(output.state().isFocused).toEqual(false);
      const input = output.find('input');
      input.simulate('focus');
      expect(output.state().isFocused).toEqual(true);
      input.simulate('blur');
      expect(output.state().isFocused).toEqual(false);
    });
    it('changes isFocused state correctlly when focusing and bluring with isContent Editable input and fires custom onFocus and onBlur from props', () => {
      const output = felaMount(<TextInput label="label" isContentEditable />);
      expect(output.state().isFocused).toEqual(false);
      const contentEditable = output.find({ role: 'textbox', });
      contentEditable.simulate('focus');
      expect(output).toMatchSnapshot();
      expect(output.state().isFocused).toEqual(true);
      contentEditable.simulate('blur');
      expect(output.state().isFocused).toEqual(false);
    });
    it('doesnt focus on a disabled contentEditable', () => {
      const output = felaMount(<TextInput label="label" isContentEditable isDisabled />);
      expect(output.state().isFocused).toEqual(false);
      const label = output.find('label');
      label.simulate('click');
      expect(output.state().isFocused).toEqual(false);
      const contentEditable = output.find({ role: 'textbox', });
      contentEditable.simulate('mouseDown');
      expect(output.state().isFocused).toEqual(false);
    });
    it('changes boldActive state correctlly when clicking bold button', () => {
      const output = felaMount(<TextInput label="label" isContentEditable />);
      expect(output.state().boldActive).toEqual(false);
      const boldButton = output.find('button').last();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      boldButton.simulate('mouseDown');
      boldButton.simulate('click');
      expect(output.state().boldActive).toEqual(true);
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
    it('changes italicActive state correctlly when clicking italic button', () => {
      const output = felaMount(<TextInput label="label" isContentEditable />);
      expect(output.state().italicActive).toEqual(false);
      const italicButton = output.find('button').first();
      const oldExecCommand = execCommandPolyfill();
      const oldQueryCommandState = queryCommandStatePolyFill();
      italicButton.simulate('mouseDown');
      italicButton.simulate('click');
      expect(output.state().italicActive).toEqual(true);
      document.execCommand = oldExecCommand;
      document.queryCommandState = oldQueryCommandState;
    });
    it('onInput function gets called by InputElement when input happens', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <TextInput label="label" onInput={mockCallback} />
      );
      const input = output.find('input');
      input.simulate('focus');
      input.simulate('input', { which: 'a', });

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
    it('onChange function gets called by InputElement when change happens', () => {
      const mockCallback = jest.fn();
      const output = felaMount(
        <TextInput label="label" onChange={mockCallback} />
      );
      const input = output.find('input');
      input.simulate('focus');
      input.simulate('change', { which: 'a', });

      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
    it('renders correctly a textArea with a responsive height prop', () => {
      const { component, styles, } = felaSnapshotter(
        <TextInput isTextArea height={[ { from: 's', value: 17.5, }, { from: 'l', value: 37, }, ]} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});

