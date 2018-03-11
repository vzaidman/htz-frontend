import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import htzTheme, { cssReset, } from '@haaretz/htz-theme';
import { schema, } from '@haaretz/app-utils';
import { ApolloClient, InMemoryCache, ApolloLink, } from 'apollo-client-preset';
import { withClientState, } from 'apollo-link-state';
import { ApolloProvider, } from 'react-apollo';
import { createRenderer, StyleProvider, } from '@haaretz/fela-utils';
import { SchemaLink, } from 'apollo-link-schema';
import { addMockFunctionsToSchema, } from 'graphql-tools';
import mocks from './mocks';
import { userScheme, } from '../src/components/User/UserDispenser';

addMockFunctionsToSchema({
  schema,
  mocks,
});
const link = new SchemaLink({ schema, });

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: {
    scroll: {
      velocity: null,
      x: 0,
      y: 0,
      __typename: 'Scroll',
    },
    user: {
      type: 'paying',
      id: '1',
      email: 'e@ma.il',
      firstName: 'null',
      lastName: 'undefined',
      emailStatus: null,
      token: 'imatoken',
      anonymousId: '22',
      __typename: 'User',
    },
  },
  resolvers: {
    Mutation: {
      // eslint-disable-next-line no-shadow
      updateScroll: (_, { x, y, direction, velocity, }, { cache, }) => {
        const data = {
          scroll: {
            velocity,
            x,
            y,
            __typename: 'Scroll',
          },
        };
        cache.writeData({ data, });
        // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
        return null;
      },
      updateUser: (_, { user, }, { cache, }) => {
        console.log('update User:', user);
        const data = {
          user: {
            ...userScheme,
            ...user,
            id: '1',
          },
        };
        cache.writeData({ data, });
        // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
        return null;
      },
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([ stateLink, link, ]),
  cache,
});

const styleRenderer = createRenderer({ isRtl: true, });

StyleGuideProvider.propTypes = {
  children: PropTypes.node,
};

StyleGuideProvider.defaultProps = {
  children: null,
};

export default function StyleGuideProvider({ children, }) {
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../src/fonts/OpenSansHebrewRegular.woff',
      '../src/fonts/OpenSansHebrewRegular.woff2',
    ],
    { fontWeight: 400, }
  );
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [
      '../src/fonts/OpenSansHebrewBold.woff',
      '../src/fonts/OpenSansHebrewBold.woff2',
    ],
    { fontWeight: 700, }
  );

  styleRenderer.renderStatic(cssReset);

  return (
    <ApolloProvider client={client}>
      <StyleProvider renderer={styleRenderer} theme={htzTheme}>
        <div>{children}</div>
      </StyleProvider>
    </ApolloProvider>
  );
}
