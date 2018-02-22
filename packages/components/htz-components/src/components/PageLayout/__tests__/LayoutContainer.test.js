import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import LayoutContainer from '../LayoutContainer'; // eslint-disable-line import/no-named-as-default

describe('<LayoutContainer>', () => {
  describe('DOM element', () => {
    it('renders correctly with minimal required props', () => {
      const { component, styles, } = felaSnapshotter(
        <LayoutContainer>Hello LayoutContainer</LayoutContainer>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly with custom attrs', () => {
      const { component, styles, } = felaSnapshotter(
        <LayoutContainer attrs={{ ariaLabel: 'I am custom', }}>Customizing attrs</LayoutContainer>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly  with a custom backgroundColor', () => {
      const { component, styles, } = felaSnapshotter(
        <LayoutContainer bgc="green">Customizing backgroundColor</LayoutContainer>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
    it('renders correctly  with custom miscStyles', () => {
      const { component, styles, } = felaSnapshotter(
        <LayoutContainer miscStyles={{ paddingTop: '5rem', }}>
          Customizing miscStyles
        </LayoutContainer>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
