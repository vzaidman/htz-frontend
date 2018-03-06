import React from 'react';
import toJson from 'enzyme-to-json';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import StyledRadioButton, { RadioButton, } from '../RadioButton'; // eslint-disable-line import/no-named-as-default
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';

Math.random = jest.fn(() => 123456789);

describe('<RadioButton>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<StyledRadioButton />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with an attrs prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledRadioButton attrs={{ testAttr: 'customAttr', }} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with isDisabled prop', () => {
      const { component, styles, } = felaSnapshotter(<StyledRadioButton isDisabled />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with label prop', () => {
      const { component, styles, } = felaSnapshotter(<StyledRadioButton label="customLabel" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with miscStyles prop', () => {
      const { component, styles, } = felaSnapshotter(
        <StyledRadioButton miscStyles={{ color: 'red', }} label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with name prop', () => {
      const { component, styles, } = felaSnapshotter(<StyledRadioButton name="customName" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a value prop', () => {
      const { component, styles, } = felaSnapshotter(<StyledRadioButton value="customValue" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a checked and onChange func passed', () => {
      const onChange = jest.fn();
      const { component, styles, } = felaSnapshotter(
        <StyledRadioButton checked onChange={onChange} label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('handles click events correctly', () => {
      const onClick = jest.fn();
      const output = felaMount(<RadioButton onClick={onClick} label="labelRed" />);

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(output.state().checked).toBe(true);
    });
    it('renders handles click events correctly when no onClick Func is passed', () => {
      const output = felaMount(<RadioButton label="labelRed" />);

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('click');
      expect(output.state().checked).toBe(true);
    });
    it('renders handles click events correctly on a disabled RadioButton', () => {
      const onClick = jest.fn();
      const output = felaMount(<RadioButton isDisabled onClick={onClick} label="labelRed" />);

      expect(output.state().checked).toBe(false);
      const input = output.find('input');
      input.simulate('click');
      expect(onClick).toHaveBeenCalledTimes(0);
      expect(output.state().checked).toBe(false);
    });
    it('renders handles focus and blur events correctly', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const output = felaMount(<RadioButton onFocus={onFocus} onBlur={onBlur} label="labelRed" />);

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
      const output = felaMount(<RadioButton label="labelRed" />);

      expect(output.state().isFocused).toBe(false);
      const input = output.find('input');
      input.simulate('focus');
      expect(output.state().isFocused).toBe(true);
      input.simulate('blur');
      expect(output.state().isFocused).toBe(false);
    });
  });
});
