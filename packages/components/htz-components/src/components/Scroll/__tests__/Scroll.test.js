import React from 'react';
import { ApolloProvider, } from 'react-apollo';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
import { Scroll, } from '../Scroll';
import client from '../../../../styleguide/ApolloMockClient';

describe('<Scroll>', () => {
  describe('DOM element', () => {
    it('correctly renders x y and velocity from store', () => {
      const { component, styles, } = felaSnapshotter(
        <ApolloProvider client={client}>
          <Scroll
            loading
            render={({ x, y, velocity, }) => (
              <div>
                x:
                {' '}
                {x}
                {' '}
y:
                {' '}
                {y}
                {' '}
velocity:
                {' '}
                {velocity}
              </div>
            )}
          />
        </ApolloProvider>
      );
      expect(component).toMatchSnapshot();
      expect(styles).toMatchSnapshot();
    });
  });
});
