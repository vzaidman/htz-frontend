// eslint-disable-next-line import/no-extraneous-dependencies
import { schema, } from '@haaretz/app-utils';
import { ApolloLink, } from 'apollo-link';
import { ApolloClient, } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher, } from 'apollo-cache-inmemory';
import { withClientState, } from 'apollo-link-state';
import { SchemaLink, } from 'apollo-link-schema';
import { addMockFunctionsToSchema, } from 'graphql-tools';
import gql from 'graphql-tag';
import mocks from './mocks';
import mockContext from './mockContext';
import { userScheme, } from '../src/components/User/UserDispenser';

addMockFunctionsToSchema({
  schema,
  mocks,
  preserveResolvers: true,
});
const link = new SchemaLink({ schema, context: mockContext, });

const customFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
});

const cache = new InMemoryCache({ fragmentMatcher: customFragmentMatcher, });

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
      email: 'email@haaretz.co.il',
      firstName: 'FIRSTNAME',
      lastName: 'LASTNAME',
      emailStatus: null,
      token: 'imatoken',
      anonymousId: '22',
      __typename: 'User',
    },
    a11yToggle: false,
    articleId: '1.2345',
    commentsElementId: '1.2345',
    platform: 'web',
    hostname: 'www.haaretz.co.il',
    readingListArray: [],
    // ids of representedContent already rendered by a list on the page
    listDuplicationIds: [],
  },
  resolvers: {
    Mutation: {
      updateListDuplication: (_, variables, { cache, }) => {
        const query = gql`
          query {
            listDuplicationIds @client
          }
        `;
        const response = cache.readQuery({ query, });
        const ids = [ ...response.listDuplicationIds, ];
        variables.ids.forEach(id => {
          // check if item already exists in list and if not push it in
          if (ids.indexOf(id) === -1) ids.push(id);
        });
        const data = {
          listDuplicationIds: ids,
        };
        cache.writeData({ data, });
        // resolver needs to return something / null https://github.com/apollographql/apollo-link-state/issues/160
        return { ids, };
      },
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

export default client;
