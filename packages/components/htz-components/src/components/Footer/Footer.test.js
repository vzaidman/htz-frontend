/* global window */
import React from 'react';
import matchMediaPolyfill from 'mq-polyfill';
import { withTheme, } from 'react-fela';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
// import { felaMount, felaShallow, } from '../../test-helpers/felaEnzymeRenderers';
import { Footer, } from './Footer';

const FooterDesktopMock = {
  /** Indicates data loading state */
  loading: false,
  /** Indicates data error state */
  error: false,
  /** Footer data */
  footer: {
    head: [
      { contentName: 'מערכת', value: 'https://www.haaretz.co.il/misc/editors', },
    ],
    columns: [
      {
        contentName: 'מדורים',
        combineWithNextColumn: true,
        row: [
          {
            contentName: 'חדשות',
            value: 'https://www.haaretz.co.il/news',
          },
        ],
      },
      {
        contentName: 'Haaretz.com',
        combineWithNextColumn: false,
        row: [
          {
            contentName: 'Israel - Syria rebels',
            value:
              'https://www.haaretz.com/israel-news/with-eye-on-iran-israel-increases-military-support-for-syrian-rebels-1.5826348',
          },
          {
            contentName: 'Freemasons',
            value:
              'https://www.haaretz.com/israel-news/MAGAZINE-not-a-cult-the-freemasons-want-you-unless-you-you-1.5824127',
          },
        ],
      },
    ],
    credit: [
      { contentName: 'מערכת', value: 'https://www.haaretz.co.il/misc/editors', },
    ],
    toolbox: [
      { contentName: 'מערכת', value: 'https://www.haaretz.co.il/misc/editors', },
    ],
  },
};
const FooterWithTheme = withTheme(Footer);

describe('<Footer /> ', () => {
  describe('Desktop view DOM elements ', () => {
    it('Render desktop Footer element correctly', () => {
      const { component, styles, } = felaSnapshotter(
        <FooterWithTheme Footer={FooterDesktopMock} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
  describe('Mobile view DOM elements ', () => {
    it('Render mobile Footer element correctly', () => {
      matchMediaPolyfill(window);
      window.resizeTo = resizeTo;
      window.resizeTo(350, 768);
      const { component, styles, } = felaSnapshotter(
        <FooterWithTheme Footer={FooterDesktopMock} />
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});

function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
}
