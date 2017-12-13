/** @jest-environment node */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import Grid from '../Grid';
import GridItem from '../GridItem';

describe('<Grid />', () => {
  describe('gutter value passthrough to children', () => {
    it('correctly pass gutter value when it is a "number"', () => {
      const { component, styles, } = felaSnapshotter(
        <Grid gutter={8}>
          <GridItem>text</GridItem>
          <GridItem>text</GridItem>
        </Grid>
      );

      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });

    it('correctly pass gutter value based on window size', () => {
      const gutter = {
        gutter: {
          onServerRender: 2,
          queries: [ { until: 's', value: 4, }, { from: 's', value: 6, }, ],
        },
      };

      {
        const { component, styles, } = felaSnapshotter(
          <Grid {...gutter}>
            <GridItem>text</GridItem>
            <GridItem>text</GridItem>
          </Grid>
        );

        expect(component).toMatchSnapshot();
        expect(styles).toMatchSnapshot();
      }
    });
  });
});
