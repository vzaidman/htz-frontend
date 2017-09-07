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
    page(pathname: String!, contentId: ID): Page
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
    # This is just one approach to slots in the schema. See above about objects
    # with arbitrary fields in GraphQL. Another approach might be to have a
    # \`Slots\` type with a field for every known slot. This approach has some
    # nice properties, like all the requested slots being one input argument.
    slots: [Slot]!
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

  type Slot {
    name: String!
    content: [Content]!
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
    page: (root, args, context) => {
      const { pathname, contentId, } = args;
      return context.pageLoader.load({
        pathname,
        contentId,
      });
    },
  },
  Content: {
    properties: (content, args, context) => {
      // Object Rest Spread syntax is used to pull out the remaining
      // `properties` from `content`, so `contentId` etc. are unused.
      // eslint-disable-next-line no-unused-vars
      const { contentId, contentName, inputTemplate, ...properties } = content;
      return properties;
    },
  },
  Page: {
    contentId: (page, args, context) => page.lineage[0].contentId,
    contentName: (page, args, context) => page.lineage[0].name,
    slots: (page, args, context) =>
      Object.keys(page.slots).map(name => ({
        name,
        content: page.slots[name] || [],
      })),
  },
  Properties: GraphQLJSON,
};

const schema = makeExecutableSchema({ typeDefs, resolvers, });

export default schema;
