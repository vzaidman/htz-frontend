import React from 'react';
import { FelaComponent, } from 'react-fela';
import rtlFelaSnapshotter from '../../test-helpers/rtlFelaSnapshotter';
import ltrFelaSnapshotter from '../../test-helpers/ltrFelaSnapshotter';

describe('renderer', () => {
  describe('plugins', () => {
    describe('fela-plugin-bidi', () => {
      it('converts logical values', () => {
        const rtlResult = rtlFelaSnapshotter(
          <FelaComponent
            style={{
              backgroundPosition: 'logical 77% 44%',
            }}
          />
        );

        const ltrResult = ltrFelaSnapshotter(
          <FelaComponent
            style={{
              backgroundPosition: 'logical 77% 44%',
            }}
          />
        );

        expect(rtlResult.styles).toMatchSnapshot();
        expect(ltrResult.styles).toMatchSnapshot();
      });

      it('converts prefixed logical values', () => {
        const rtlResult = rtlFelaSnapshotter(
          <FelaComponent
            style={{
              transform: 'logical translateX(77%)',
            }}
          />
        );

        const ltrResult = ltrFelaSnapshotter(
          <FelaComponent
            style={{
              transform: 'logical translateX(77%)',
            }}
          />
        );

        expect(rtlResult.styles).toMatchSnapshot();
        expect(ltrResult.styles).toMatchSnapshot();
      });
    });

    describe('fela-plugin-prefixer', () => {
      it('correctly prefixes fallback values', () => {
        const rtlResult = rtlFelaSnapshotter(
          <FelaComponent
            style={{
              display: 'flex',
            }}
          />
        );
        expect(rtlResult.styles).toMatchSnapshot();
      });
    });
  });
});
