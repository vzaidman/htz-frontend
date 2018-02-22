import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import LayoutRow from '../LayoutRow'; // eslint-disable-line import/no-named-as-default

describe('<LayoutRow>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(<LayoutRow>Hello LayoutRow</LayoutRow>);
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with custom attrs', () => {
      const { component, styles, } = felaSnapshotter(
        <LayoutRow attrs={{ ariaLabel: 'I am custom', }}>Customizing attrs</LayoutRow>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly  with a custom backgroundColor', () => {
      const { component, styles, } = felaSnapshotter(
        <LayoutRow bgc="green">Customizing backgroundColor</LayoutRow>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly  with custom miscStyles', () => {
      const { component, styles, } = felaSnapshotter(
        <LayoutRow miscStyles={{ paddingTop: '5rem', }}>Customizing miscStyles</LayoutRow>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
