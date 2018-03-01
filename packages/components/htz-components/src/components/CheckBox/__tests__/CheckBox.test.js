import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import CheckBox from '../CheckBox'; // eslint-disable-line import/no-named-as-default
import { felaMount, } from '../../../test-helpers/felaEnzymeRenderers';

Math.random = jest.fn(() => 123456789);

describe('<CheckBox>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<CheckBox />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with an attrs prop', () => {
      const { component, styles, } = felaSnapshotter(<CheckBox attrs={{ name: 'customName', }} />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with defaultValue prop', () => {
      const { component, styles, } = felaSnapshotter(<CheckBox defaultValue />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with isDisabled prop', () => {
      const { component, styles, } = felaSnapshotter(<CheckBox isDisabled />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with label prop', () => {
      const { component, styles, } = felaSnapshotter(<CheckBox label="customLabel" />);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with miscStyles prop', () => {
      const { component, styles, } = felaSnapshotter(
        <CheckBox miscStyles={{ color: 'red', }} label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with a checked and onChange func passed', () => {
      const onChange = jest.fn();
      const { component, styles, } = felaSnapshotter(
        <CheckBox checked onChange={onChange} label="labelRed" />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    // todo: add onChange test
    // it('renders handles click events correctly', () => {
    //   const onChange = jest.fn();
    //   const { component, styles, } = felaMount(
    //     <CheckBox checked onChange={onChange} label="labelRed" />
    //   );
    //   expect(component).toMatchSnapshot();
    //   expect(styles).toMatchSnapshot();
    // });
  });
});
