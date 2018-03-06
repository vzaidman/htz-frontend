/* global window */
import React from 'react';
import matchMediaPolyfill from 'mq-polyfill';
import { withTheme, } from 'react-fela';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
// import { felaMount, felaShallow, } from '../../test-helpers/felaEnzymeRenderers';
import { DesktopView, } from './elemets/Desktop/DesktopView';
import MobileView from './elemets/MobileView';

const FooterDesktopMock = {
  /** Indicates data loading state */
  loading: false,
  /** Indicates data error state */
  error: false,
  /** Footer data */
  footer: {
    head: [ { text: 'מערכת', href: 'https://www.haaretz.co.il/misc/editors', }, ],
    columns: [
      {
        title: 'מדורים',
        combineWithNextColumn: true,
        items: [
          {
            text: 'חדשות',
            href: 'https://www.haaretz.co.il/news',
          },
        ],
      },
      {
        title: 'Haaretz.com',
        combineWithNextColumn: false,
        items: [
          {
            text: 'Israel - Syria rebels',
            href:
              'https://www.haaretz.com/israel-news/with-eye-on-iran-israel-increases-military-support-for-syrian-rebels-1.5826348',
          },
          {
            text: 'Freemasons',
            href:
              'https://www.haaretz.com/israel-news/MAGAZINE-not-a-cult-the-freemasons-want-you-unless-you-you-1.5824127',
          },
        ],
      },
    ],
    credit: [ { text: 'מערכת', href: 'https://www.haaretz.co.il/misc/editors', }, ],
    toolbox: [ { text: 'מערכת', href: 'https://www.haaretz.co.il/misc/editors', }, ],
  },
};
const DesktopFooterWithTheme = withTheme(DesktopView);
const MobileViewWithTheme = withTheme(MobileView);

describe('<Footer /> ', () => {
  describe('Desktop view DOM elements ', () => {
    it('Render desktop Footer element correctly', () => {
      const { component, styles, } = felaSnapshotter(
        <DesktopFooterWithTheme Footer={FooterDesktopMock} />
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
      const { component, styles, } = felaSnapshotter(<MobileViewWithTheme />);
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
