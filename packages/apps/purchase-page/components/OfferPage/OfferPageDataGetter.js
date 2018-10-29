import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withRouter, } from 'next/router';
import { extractParamFromUrl, Query, } from '@haaretz/htz-components';

const GET_PURCHASE_PAGE_DATA = gql`
  query PageData($path: String!) {
    purchasePage(path: $path)
  }
`;

const propTypes = {
  render: PropTypes.func.isRequired,
  router: PropTypes.shape().isRequired,
};

export function getCampaignFromPath(path) {
  const offer = `/${extractParamFromUrl('offer', path) || ''}`;
  return offer;
}

function OfferPageDataGetter({ render, router, }) {
  return (
    <Fragment>
      <Query
        query={GET_PURCHASE_PAGE_DATA}
        variables={{ path: getCampaignFromPath(router.asPath), }}
      >
        {({ loading, error, data, refetch, client, }) =>
          render({ data, loading, error, refetch, client, })
        }
      </Query>
    </Fragment>
  );
}

OfferPageDataGetter.propTypes = propTypes;

export default withRouter(OfferPageDataGetter);
