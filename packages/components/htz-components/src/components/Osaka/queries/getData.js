// eslint-disable-next-line import/no-extraneous-dependencies
import gql from 'graphql-tag';

export const fromCache = gql`
  query OsakaCacheQuery {
    canonicalUrl @client
    articleId @client
    articleParent @client {
      name
      id
    }
    hostname @client
  }
`;

export const fromSolr = gql`
  query OsakaSolrQuery(
    $query: String!
    $filterQuery: [String]
    $sortBy: String
    $desc: Boolean
    $numOfResults: Int
    $fields: [String]
    $articleId: String!
  ) {
    solrQuery(
      query: $query
      filterQuery: $filterQuery
      sortBy: $sortBy
      desc: $desc
      numOfResults: $numOfResults
      fields: $fields
    ) {
      response {
        docs
      }
    }
    page(path: $articleId) {
      lineage {
        url
      }
    }
  }
`;
