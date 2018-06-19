import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';
import Select from '../Select'; // eslint-disable-line import/no-named-as-default

Math.random = jest.fn(() => 123456789);

describe('<Select>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <Select items={[ { value: 1, }, { value: 2, }, { value: 3, }, ]} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with custom attrs prop', () => {
      const { component, styles, } = felaSnapshotter(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
          attrs={{ 'aria-hidden': true, }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with default selected item', () => {
      const { component, styles, } = felaSnapshotter(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
          defaultSelectedItem={{ value: 2, display: 'שתיים', }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with custom miscStyles', () => {
      const { component, styles, } = felaSnapshotter(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
          miscStyles={{ color: 'red', }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a placholder prop', () => {
      const { component, styles, } = felaSnapshotter(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
          placeholder="custom placholder"
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a controlled selected item', () => {
      const { component, styles, } = felaSnapshotter(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
          controlledSelectedItem={{ value: 3, display: 'שלוש', }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly without display key in item', () => {
      const { component, styles, } = felaSnapshotter(
        <Select
          items={[ { value: 1, }, { value: 2, }, { value: 3, }, ]}
          controlledSelectedItem={{ value: 3, }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a Note', () => {
      const { component, styles, } = felaSnapshotter(
        <Select
          noteText="text"
          errorText="error"
          items={[ { value: 1, }, { value: 2, }, { value: 3, }, ]}
          controlledSelectedItem={{ value: 3, }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a Error', () => {
      const { component, styles, } = felaSnapshotter(
        <Select
          isError
          noteText="text"
          errorText="error"
          items={[ { value: 1, }, { value: 2, }, { value: 3, }, ]}
          controlledSelectedItem={{ value: 3, }}
        />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('lists items with a keydown of ArrowDown on the input', () => {
      const output = felaMount(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
        />
      );
      const button = output.find('button');
      // check that dropdown menu isnt rendered before clicking the arrow down
      expect(output.find({ 'data-test': 'dropdown-menu', }).length).toEqual(0);
      button.simulate('keydown', { key: 'ArrowDown', });
      // check that dropdown menu is rendered after clicking the arrow down
      expect(output.find({ 'data-test': 'dropdown-menu', }).length).toEqual(1);
      // check if the 3 items render as children
      expect(
        output.find({ 'data-test': 'dropdown-menu', }).children().length
      ).toEqual(3);
    });
    it('can select an item', () => {
      const onChange = jest.fn();
      const output = felaMount(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
          onChange={onChange}
        />
      );
      const button = output.find('button');
      button.simulate('change');
      button.simulate('keydown', { key: 'ArrowDown', });
      button.simulate('keydown', { key: 'ArrowDown', });
      button.simulate('keydown', { key: 'Enter', });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ value: 2, display: 'שתיים', });
    });
    it('can select an item without onChange function', () => {
      const output = felaMount(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
        />
      );
      const button = output.find('button');
      button.simulate('change');
      expect(output.find({ 'data-test': 'dropdown-menu', }).length).toEqual(0);
      button.simulate('keydown', { key: 'ArrowDown', });
      expect(output.find({ 'data-test': 'dropdown-menu', }).length).toEqual(1);
      expect(
        output.find({ 'data-test': 'dropdown-menu', }).children().length
      ).toEqual(3);
      button.simulate('keydown', { key: 'ArrowDown', });
      button.simulate('keydown', { key: 'Enter', });
      expect(
        output.find({ 'data-test': 'dropdown-menu', }).children().length
      ).toEqual(0);
      expect(output.state('selectedItem')).toEqual({
        value: 2,
        display: 'שתיים',
      });
    });
    it('can select an item with space key', () => {
      const onChange = jest.fn();
      const output = felaMount(
        <Select
          items={[
            { value: 1, display: 'אחד', },
            { value: 2, display: 'שתיים', },
            { value: 3, display: 'שלוש', },
          ]}
          onChange={onChange}
        />
      );
      const button = output.find('button');
      button.simulate('change');
      button.simulate('keydown', { key: 'ArrowDown', });
      button.simulate('keydown', { key: 'ArrowDown', });
      button.simulate('keydown', { key: 'ArrowDown', });
      button.simulate('keydown', { keyCode: 32, });
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ value: 3, display: 'שלוש', });
      expect(output.state('selectedItem')).toEqual({
        value: 3,
        display: 'שלוש',
      });
      button.simulate('keydown', { key: 'ArrowDown', });
    });
    it('closes menu when pressing tab key', () => {
      const output = felaMount(
        <Select
          items={[ { value: 1, }, { value: 2, }, { value: 3, display: 'שלוש', }, ]}
        />
      );
      const button = output.find('button');

      button.simulate('keydown', { key: 'ArrowDown', });
      expect(output.find({ 'data-test': 'dropdown-menu', }).length).toEqual(1);
      button.simulate('keydown', { keyCode: 9, });
      expect(output.find({ 'data-test': 'dropdown-menu', }).length).toEqual(0);
    });
  });
});
