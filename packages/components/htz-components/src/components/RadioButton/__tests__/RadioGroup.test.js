import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import RadioGroup from '../RadioGroup'; // eslint-disable-line import/no-named-as-default
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';

Math.random = jest.fn(() => 123456789);

describe('<RadioGroup>', () => {
  describe('DOM element', () => {
    it.skip('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          name="testName"
          radioButtons={[
            { value: '1', label: 'label', },
            { value: '2', label: 'label', },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it.skip('renders correctly with custom attr prop', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          attrs={{ testAttr: 'test', }}
          name="testName"
          radioButtons={[
            { value: '1', label: 'label', },
            { value: '2', label: 'label', },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it.skip('renders correctly with defaultValue prop', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          defaultValue="2"
          name="testName"
          radioButtons={[
            { value: '1', label: 'label', },
            { value: '2', label: 'label', },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it.skip('renders correctly with a Note', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          name="testName"
          noteText="descritption"
          errorText="error"
          radioButtons={[
            { value: '1', label: 'one', },
            { value: '2', label: 'two', },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it.skip('renders correctly with a Error Note', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          isError
          name="testName"
          noteText="descritption"
          errorText="error"
          radioButtons={[
            { value: '1', label: 'one', },
            { value: '2', label: 'two', },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it.skip('renders correctly with a custom NoteId', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          isError
          name="testName"
          noteId="12345"
          noteText="descritption"
          errorText="error"
          radioButtons={[
            { value: '1', label: 'one', },
            { value: '2', label: 'two', },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it.skip('renders correctly with a value prop', () => {
      const { component, styles, } = felaSnapshotter(
        <RadioGroup
          value="2"
          name="testName"
          radioButtons={[
            { value: '1', label: 'label', },
            { value: '2', label: 'label', },
          ]}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('handles change events correctly', () => {
      const output = felaMount(
        <RadioGroup
          name="testName"
          radioButtons={[
            { value: '1', label: 'label', },
            { value: '2', label: 'label', },
          ]}
        />
      );

      expect(output.state().value).toBe(null);
      const input = output.find('input').at(1);
      input.simulate('change', { target: { value: '1', }, });
      expect(output.state().value).toBe('1');
    });
    it('handles change events correctly with custom onChange passed', () => {
      const onChange = jest.fn();
      const output = felaMount(
        <RadioGroup
          name="testName"
          onChange={onChange}
          radioButtons={[
            { value: '1', label: 'label', },
            { value: '2', label: 'label', },
          ]}
        />
      );

      expect(output.state().value).toBe(null);
      const input = output.find('input').at(1);
      input.simulate('change', { target: { value: '1', }, });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(output.state().value).toBe('1');
    });
  });
});
