/* global window */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import GridItem from '../GridItem';

describe('<GridItem />', () => {
  it('spread the "attrs" prop on the Dom element', () => {
    const { component, } = felaSnapshotter(
      <GridItem
        attrs={{
          tabIndex: '-1',
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('set the "id" prop on the Dom element', () => {
    const { component, } = felaSnapshotter(<GridItem id="hasId" />);

    expect(component).toMatchSnapshot();
  });

  it('change the DOM element\'s tagName based on the "tagName" prop', () => {
    const { component, } = felaSnapshotter(<GridItem tagName="article" />);

    expect(component.children[0].type).toBe('article');
  });

  describe('styles', () => {
    it('create correct default styels', () => {
      const { component, styles, } = felaSnapshotter(<GridItem />);

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('apply correct gutter styles', () => {
      const { component, styles, } = felaSnapshotter(<GridItem gutter={8} />);

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('apply correct offset styles', () => {
      const { component, styles, } = felaSnapshotter(
        <GridItem offset={1 / 4} />
      );

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('apply correct default rule styles', () => {
      const { component, styles, } = felaSnapshotter(<GridItem rule />);

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('apply correct rule styles when ruleWidth is even', () => {
      const { component, styles, } = felaSnapshotter(
        <GridItem rule={{ width: 2, color: [ 'primary', 'base', ], }} />
      );

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('apply correct rule styles when ruleWidth is odd', () => {
      const { component, styles, } = felaSnapshotter(
        <GridItem rule={{ width: 5, color: [ 'primary', 'base', ], }} />
      );

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('apply correct rule styles when rule color is a string', () => {
      const { component, styles, } = felaSnapshotter(
        <GridItem rule={{ width: 2, color: 'black', }} />
      );

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('apply correct width styles (relative width)', () => {
      const { component, styles, } = felaSnapshotter(<GridItem width={1 / 4} />);

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('apply correct width styles (fixed width)', () => {
      const { component, styles, } = felaSnapshotter(<GridItem width={20} />);

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });

    it('set misc styles correctly', () => {
      const { component, styles, } = felaSnapshotter(
        <GridItem miscStyles={{ backgroundColor: 'red', }} />
      );

      expect(component).toMatchSnapshot();
      expect(
        styles.replace(/(\.|@)/g, (match, g1) => `\n${g1}`)
      ).toMatchSnapshot();
    });
  });
});
