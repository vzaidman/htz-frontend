/* global window */
/* eslint-disable import/no-named-as-default */
import React from 'react';
// TODO: uncomment once paulirish/matchMedia.js#82 is resolved
// import 'matchmedia-polyfill';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Grid from '../Grid';
import GridItem from '../GridItem';

describe('<Grid />', () => {
  it('spread the "attrs" prop on the Dom element', () => {
    const { component, } = felaSnapshotter(
      <Grid
        attrs={{
          tabIndex: '-1',
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('render children correctly', () => {
    const { component, styles, } = felaSnapshotter(
      <Grid>
        <GridItem>text</GridItem>
        <GridItem>text</GridItem>
      </Grid>
    );

    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('pass "id" prop to DOM element attribute', () => {
    const { component, } = felaSnapshotter(<Grid id="hasId" />);

    expect(component).toMatchSnapshot();
  });

  it('use non default "tagName" correctly', () => {
    const { component, } = felaSnapshotter(<Grid tagName="section" />);
    expect(component.children[0].type).toBe('section');
  });

  describe('passthrough gutter value to children', () => {
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        ...(width ? { innerWidth: width, outerWidth: width, } : {}),
        ...(height ? { innerHeight: height, outerHeight: height, } : {}),
      }).dispatchEvent(new this.Event('resize'));
    };

    it('correctly pass gutter value', () => {
      const { component, styles, } = felaSnapshotter(
        <Grid gutter={8}>
          <GridItem>text</GridItem>
          <GridItem>text</GridItem>
        </Grid>
      );

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    // TODO: uncomment once paulirish/matchMedia.js#82 is resolved
    // it('correctly pass gutter value based on window size', () => {
    //   const gutter = {
    //     gutter: {
    //       onServerRender: 2,
    //       queries: [ { until: 's', value: 4, }, { from: 's', value: 6, }, ],
    //     },
    //   };
    //
    //   {
    //     window.resizeTo(300);
    //     const { component, styles, } = felaSnapshotter(
    //       <Grid {...gutter}>
    //         <GridItem>text</GridItem>
    //         <GridItem>text</GridItem>
    //       </Grid>
    //     );
    //
    //     expect(component).toMatchSnapshot();
    //     expect(styles.replace(/\./g, '\n.')).toMatchSnapshot();
    //   }
    // });
  });

  describe('styles', () => {
    it('create correct default styels', () => {
      const { component, styles, } = felaSnapshotter(<Grid />);

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('set horizontal alignment of "<GridItem>"s correctly', () => {
      const { component, styles, } = felaSnapshotter(<Grid align="center" />);

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('set "gutter" correctly', () => {
      const { component, styles, } = felaSnapshotter(<Grid gutter={2} />);

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('reverse grid', () => {
      const { component, styles, } = felaSnapshotter(<Grid isRev />);

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('set row spacing', () => {
      const { component, styles, } = felaSnapshotter(
        <Grid rowSpacing={{ amount: 6, nUp: 2, }} />
      );

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('set vertical alignment correctly', () => {
      const { component, styles, } = felaSnapshotter(<Grid vAlign="bottom" />);

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('set misc styles correctly', () => {
      const { component, styles, } = felaSnapshotter(
        <Grid miscStyles={{ backgroundColor: 'red', }} />
      );

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
