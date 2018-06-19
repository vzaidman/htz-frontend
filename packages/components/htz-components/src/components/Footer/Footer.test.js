/* global window */
import React from 'react';
import matchMediaPolyfill from 'mq-polyfill';
import { ApolloProvider, } from 'react-apollo';
import client from '../../../styleguide/ApolloMockClient';
import felaSnapshotter from '../../test-helpers/felaSnapshotter';
import Footer from './Footer';

describe('<Footer /> ', () => {
  describe('Desktop view DOM elements ', () => {
    it('Render desktop Footer element correctly', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <Footer contentId="dfsf" />
        </ApolloProvider>
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
        <ApolloProvider client={client}>
          <Footer contentId="dfsf" />
        </ApolloProvider>
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
