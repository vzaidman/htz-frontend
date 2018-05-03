/* global window */

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

const PAY_WITH_EXISTING_CARD = gql`
  query payWithExistingCard(
    $ssoID: ID!
    $productID: Int!
    $firstName: String!
    $lastName: String!
    $saleCode: Int!
    $promotionNumber: Int!
    $email: String!
    $sumPayment: Int!
    $thankYouEmailTemplate: Int!
    $description: String!
    $failure: Boolean!
    $connectionType: Int!
    $lastFourDigits: String!
  ) {
    payWithExistingCard(
      ssoID: $ssoID
      productID: $productID
      firstName: $firstName
      lastName: $lastName
      saleCode: $saleCode
      promotionNumber: $promotionNumber
      email: $email
      sumPayment: $sumPayment
      thankYouEmailTemplate: $thankYouEmailTemplate
      description: $description
      failure: $failure
      connectionType: $connectionType
      lastFourDigits: $lastFourDigits
    )
  }
`;

class PaymentStage extends Component {
  static propTypes = {
    success: PropTypes.bool.isRequired,
    pid: PropTypes.string.isRequired,
  };

  componentDidMount() {
    if (this.props.success) {
      Router.replace(
        `/promotions-page/thankYou?msg=thank_user&product=${this.props.pid}`
      );
    }
  }

  render() {
    return <div>Got Error?</div>;
  }
}

const propTypes = {
  paymentData: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  fourDigits: PropTypes.number.isRequired,
  thankYouEmailTemplate: PropTypes.number.isRequired,
};

function Wrapper({ paymentData, user, fourDigits, thankYouEmailTemplate, }) {
  const queryVars = {
    ssoID: user.id,
    productID: paymentData.productID,
    firstName: user.firstName,
    lastName: user.lastName,
    saleCode: paymentData.saleCode,
    promotionNumber: paymentData.promotionNumber,
    email: user.email,
    sumPayment: paymentData.prices[0],
    thankYouEmailTemplate,
    description: paymentData.description,
    failure: false,
    // doesnt matter what we send so hardcoded
    connectionType: 764,
    lastFourDigits: fourDigits,
  };
  return (
    <Query query={PAY_WITH_EXISTING_CARD} variables={queryVars}>
      {({ data, loading, error, }) => {
        // todo take care of errors
        if (loading) return <div>loading...</div>;
        if (error) return <div>error... {JSON.stringify(error, null, 2)}</div>;
        // todo: get productId from pay with existing card
        return (
          <PaymentStage
            success={data.payWithExistingCard}
            pid={paymentData.productID}
          />
        );
      }}
    </Query>
  );
}

Wrapper.propTypes = propTypes;

export default Wrapper;
