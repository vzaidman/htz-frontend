import React from 'react';
import toJson from 'enzyme-to-json';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import RadioGroup from '../RadioGroup'; // eslint-disable-line import/no-named-as-default
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';

Math.random = jest.fn(() => 123456789);

describe('<RadioGroup>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup name="testName" radioButtons={[ { value: '1', }, { value: '2', }, ]} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with custom attr prop', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          attrs={{ testAttr: 'test', }}
          name="testName"
          radioButtons={[ { value: '1', }, { value: '2', }, ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with defaultValue prop', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          defaultValue="2"
          name="testName"
          radioButtons={[ { value: '1', }, { value: '2', }, ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a Note', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          name="testName"
          noteText="descritption"
          errorText="error"
          radioButtons={[ { value: '1', label: 'one', }, { value: '2', label: 'two', }, ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a Error Note', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          isError
          name="testName"
          noteText="descritption"
          errorText="error"
          radioButtons={[ { value: '1', label: 'one', }, { value: '2', label: 'two', }, ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a custom NoteId', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          isError
          name="testName"
          noteId="12345"
          noteText="descritption"
          errorText="error"
          radioButtons={[ { value: '1', label: 'one', }, { value: '2', label: 'two', }, ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('renders correctly with a value prop', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup value="2" name="testName" radioButtons={[ { value: '1', }, { value: '2', }, ]} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('handles change events correctly', () => {
      const output = felaMount(
        <RadioGroup name="testName" radioButtons={[ { value: '1', }, { value: '2', }, ]} />
      );

      expect(output.state().value).toBe(null);
      const input = output.find('input').at(1);
      input.simulate('change', { target: { value: '1', }, });
      expect(output.state().value).toBe('1');
    });
    it('handles change events correctly with custom onChange passed', () => {
      const onChange = jest.fn();
      const output = felaMount(
        <RadioGroup name="testName" onChange={onChange} radioButtons={[ { value: '1', }, { value: '2', }, ]} />
      );

      expect(output.state().value).toBe(null);
      const input = output.find('input').at(1);
      input.simulate('change', { target: { value: '1', }, });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(output.state().value).toBe('1');
    });
    // it('renders handles click events correctly when no onClick Func is passed', () => {
    //   const output = felaMount(<RadioGroup label="labelRed" />);

    //   expect(output.state().checked).toBe(false);
    //   const input = output.find('input');
    //   input.simulate('click');
    //   expect(output.state().checked).toBe(true);
    // });
    // it('renders handles click events correctly on a disabled RadioGroup', () => {
    //   const onClick = jest.fn();
    //   const output = felaMount(<RadioGroup isDisabled onClick={onClick} label="labelRed" />);

    //   expect(output.state().checked).toBe(false);
    //   const input = output.find('input');
    //   input.simulate('click');
    //   expect(onClick).toHaveBeenCalledTimes(0);
    //   expect(output.state().checked).toBe(false);
    // });
    // it('renders handles focus and blur events correctly', () => {
    //   const onFocus = jest.fn();
    //   const onBlur = jest.fn();
    //   const output = felaMount(<RadioGroup onFocus={onFocus} onBlur={onBlur} label="labelRed" />);

    //   expect(output.state().isFocused).toBe(false);
    //   const input = output.find('input');
    //   input.simulate('focus');
    //   expect(onFocus).toHaveBeenCalledTimes(1);
    //   expect(output.state().isFocused).toBe(true);
    //   input.simulate('blur');
    //   expect(onBlur).toHaveBeenCalledTimes(1);
    //   expect(output.state().isFocused).toBe(false);
    // });
    // it('renders handles focus and blur events correctly when no focus and blur functions are passed', () => {
    //   const output = felaMount(<RadioGroup label="labelRed" />);

    //   expect(output.state().isFocused).toBe(false);
    //   const input = output.find('input');
    //   input.simulate('focus');
    //   expect(output.state().isFocused).toBe(true);
    //   input.simulate('blur');
    //   expect(output.state().isFocused).toBe(false);
    // });
  });
});
