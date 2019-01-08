import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { breadcrumbs, } from '@haaretz/app-utils';
import Query from '../ApolloBoundary/Query';
import { doStat, } from './statutil';
import UserDispenser from '../User/UserDispenser';
import NoSSR from '../NoSSR/NoSSR';


const AuthorId = gql`
  fragment AuthorId on AuthorObject {
    contentId
  }
`;

const GET_DOSTAT_DATA = gql`
  query BIRequestData($path: String!) {
    page(path: $path) @client {
      ...PageBreadcrumbs
      slots {
        article {
          ... on ArticleHeader {
            data {
              authors {
                ... on AuthorObject {
                  ...AuthorId
                }
              }
            }
          }
        }
      }
    }
  }
  ${breadcrumbs}
  ${AuthorId}
`;

function BIRequest({ articleId, authors, }) {
  return (
    <NoSSR>
      <UserDispenser
        render={({ user, }) => {
          if (articleId) {
            return (
              <Query query={GET_DOSTAT_DATA} variables={{ path: articleId, }} errorPolicy="all">
                {({ data, loading, error, }) => {
                  if (loading) return null;
                  if (error) return console.error(error);
                  doStat(user, data.page.lineage, authors);
                  return null;
                }}
              </Query>
            );
          }
          doStat(user);
          return null;
        }}
      />
    </NoSSR>
  );
}

BIRequest.propTypes = {
  articleId: PropTypes.string,
  authors: PropTypes.string,
};

BIRequest.defaultProps = {
  articleId: null,
  authors: null,
};

export default BIRequest;
