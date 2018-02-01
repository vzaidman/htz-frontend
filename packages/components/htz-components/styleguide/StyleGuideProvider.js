import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import htzTheme, { cssReset, } from '@haaretz/htz-theme';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, } from 'apollo-client-preset';
import { withClientState, } from 'apollo-link-state';
import { ApolloProvider, } from 'react-apollo';
import config from 'config';
import { createRenderer, StyleProvider, } from '../src';

const hostIp = config.get('hostIp');

const link = new HttpLink({
  uri: `http://${hostIp}:3000/graphql`,
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  defaults: {
    // todo: remove after bug is fix, this is a workaround explained here:
    // https://github.com/apollographql/apollo-link-state/issues/187#issuecomment-361753208
    'scroll@client': {
      velocity: null,
      x: 0,
      y: 0,
      __typename: 'Scroll',
    },
  },
  resolvers: {
    Mutation: {
      updateScroll: (_, { x, y, direction, velocity, }, { cache, }) => {
        const data = {
          // todo: remove after bug is fix, this is a workaround explained here:
          // https://github.com/apollographql/apollo-link-state/issues/187#issuecomment-361753208
          'scroll@client': {
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
    [ '../src/fonts/OpenSansHebrewRegular.woff', '../src/fonts/OpenSansHebrewRegular.woff2', ],
    { fontWeight: 400, }
  );
  styleRenderer.renderFont(
    '"Open Sans Hebrew"',
    [ '../src/fonts/OpenSansHebrewBold.woff', '../src/fonts/OpenSansHebrewBold.woff2', ],
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
