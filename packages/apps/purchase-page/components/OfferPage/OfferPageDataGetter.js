import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, } from 'next/router';
// import dummyData from './dummyData';

const GET_PURCHASE_PAGE_DATA = gql`
  query PageData($path: String!) {
    purchasePage(path: $path)
  }
`;

const propTypes = {
  render: PropTypes.func.isRequired,
  router: PropTypes.shape().isRequired,
};

function OfferPageDataGetter({ render, router, }) {
  return (
    <Fragment>
      <Query query={GET_PURCHASE_PAGE_DATA} variables={{ path: router.asPath, }}>
        {({ loading, error, data, refetch, client, }) =>
          render({ data, loading, error, refetch, client, })
        }
        {/* {({ loading, error, data, refetch, client, }) =>
          render({ data: dummyData, loading, error, refetch, client, })
        } */}
      </Query>
    </Fragment>
  );
}

OfferPageDataGetter.propTypes = propTypes;

export default withRouter(OfferPageDataGetter);
