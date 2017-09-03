/**
 * Defines the GraphQL schema that components will query against.
 * TODO: It is inefficient to need `makeExecutableSchema` on the client; a
 * better approach would be to build it using `GraphQLSchema` directly from
 * `graphql`, or perhaps load it from a JSON definition if possible. But this
 * gets us up and running quickly.
 */
import { makeExecutableSchema, } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';

const typeDefs = `
  type Query {
    page: Page
  }

  type Mutation {
    changePage(pathname: String!, section: String, contentId: ID): Boolean
  }

  interface ContentInterface {
    contentId: ID!
    contentName: String
    inputTemplate: String
  }

  type Content implements ContentInterface {
    contentId: ID!
    contentName: String
    inputTemplate: String
    # Content elements can have arbitrary additional properties depending on
    # the element type. In order to void making a custom GraphQL type for each
    # element type with the properties it supports, we instead encapsulate the
    # remaining properties in the \`Properties\` type. Since GraphQL does not
    # support types with arbitrary fields (in TypeScript terms, “Indexable
    # Types”), the \`Properties\` type is a scalar that can contain an arbitrary
    # JavaScript object. These properties cannot be individually specified in a
    # GraphQL query, but all of them can be accessed on the \`properties\` field.
    properties: Properties!
  }

  type Page implements ContentInterface {
    contentId: ID!
    contentName: String
    inputTemplate: String
    lineage: [TaxonomyItem]!
    pageType: String!
    seoData: SeoData!
    # This is just one approach to slots in the schema. Another might involve
    # having a \`Slots\` type with a field for every known slot. But that seems
    # redundant, since there is nothing unique schema-wise about each slot
    # besides the name. A single query can still retrieve multiple slots using
    # aliases.
    slotContent(slot: String!): [Content]
  }

  type SeoData {
    canonicalLink: String
    metaDescription: String
    metaImage: String
    metaKeywords: [String]
    metaTitle: String
    obTitle: String
    ogImages: [String]
    socialDescription: String
    socialTitle: String
  }

  type TaxonomyItem {
    contentId: ID!
    name: String!
    pathSegment: String!
    url: String!
  }

  scalar Properties

`;

const resolvers = {
  Query: {
    page: (source, args, context) => {
      const { pathname, query, } = context.url;
      if (pathname === '/article') {
        if (query.contentId === '.premium-1.5527') {
          return context.pageLoader.load('article');
        }
      }
      else if (pathname === '/') {
        return context.pageLoader.load('home');
      }
      if (process.browser) {
        // Give the user a server error page with real HTTP 404.
        window.location.reload();
      }
      // Don't know if this error is actually accessible to components.
      const err = new Error('Not Found');
      err.statusCode = 404;
      return Promise.reject(err);
    },
  },
  Mutation: {
    // We don't actually do anything with the input args.
    changePage: (source, args, context) => true,
  },
  Content: {
    properties: source => {
      const { contentId, contentName, inputTemplate, ...properties } = source;
      return properties;
    },
  },
  Page: {
    contentId: source => source.lineage[0].contentId,
    contentName: source => source.lineage[0].name,
    slotContent: (source, args) => source.slots[args.slot],
  },
  Properties: GraphQLJSON,
};

const schema = makeExecutableSchema({ typeDefs, resolvers, });

export default schema;
