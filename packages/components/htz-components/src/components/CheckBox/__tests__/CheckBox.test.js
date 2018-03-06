import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import StyledCheckBox, { CheckBox, } from '../CheckBox'; // eslint-disable-line import/no-named-as-default
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';

Math.random = jest.fn(() => 123456789);

describe('<CheckBox>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<StyledCheckBox />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with an attrs prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox attrs={{ name: 'customName', }} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with defaultValue prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox defaultValue />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with isDisabled prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox isDisabled />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with label prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox label="customLabel" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with miscStyles prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox miscStyles={{ color: 'red', }} label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a checked and onChange func passed', () => {
      const onChange = jest.fn();
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox checked onChange={onChange} label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with Note', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox noteText="text" errorText="error" label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with Note in and error', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledCheckBox
          noteText="text"
          isError
          errorText="error"
          label="labelRed"
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('handles change events correctly', () => {
      const onChange = jest.fn();
      const output = felaMount(<CheckBox onClick={onChange} label="labelRed" />);

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('change', { target: { checked: true, }, });
      input.simulate('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(output.state().checked).toBe(true);
    });
    it('handles click events correctly when no onClick Func is passed', () => {
      const output = felaMount(<CheckBox label="labelRed" />);

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('change', { target: { checked: true, }, });
      expect(output.state().checked).toBe(true);
    });
    it('handles change events correctly on a disabled CheckBox', () => {
      const onClick = jest.fn();
      const output = felaMount(
        <CheckBox isDisabled onClick={onClick} label="labelRed" />
      );

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('click');
      input.simulate('change', { target: { checked: true, }, });
      expect(onClick).toHaveBeenCalledTimes(0);
      expect(output.state().checked).toBe(false);
    });
    it('renders handles focus and blur events correctly', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const output = felaMount(
        <CheckBox onFocus={onFocus} onBlur={onBlur} label="labelRed" />
      );

      expect(output.state().isFocused).toBe(false);
      const input = output.find('input');
      input.simulate('focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(output.state().isFocused).toBe(true);
      input.simulate('blur');
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(output.state().isFocused).toBe(false);
    });
    it('renders handles focus and blur events correctly when no focus and blur functions are passed', () => {
      const output = felaMount(<CheckBox label="labelRed" />);

      expect(output.state().isFocused).toBe(false);
      const input = output.find('input');
      input.simulate('focus');
      expect(output.state().isFocused).toBe(true);
      input.simulate('blur');
      expect(output.state().isFocused).toBe(false);
    });
  });
});
