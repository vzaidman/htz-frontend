/* global window */

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, IconHtzLoader, IconTmLoader, } from '@haaretz/htz-components';
import Router from 'next/router';
import { FelaComponent, } from 'react-fela';
import Redirect from '../../Redirect/Redirect';

const PAY_WITH_EXISTING_CARD = gql`
  query payWithExistingCard(
    $ssoID: ID!
    $productID: Int!
    $firstName: String!
    $lastName: String!
    $saleCode: Int!
    $promotionNumber: Int!
    $email: String!
    $sumPayment: String!
    $thankYouEmailTemplate: String!
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

function DisplayError() {
  return (
    <FelaComponent
      style={theme => ({
        color: theme.color('tertiary'),
        marginTop: '2rem',
        fontWeight: 'bold',
      })}
      render={({
        className,
        theme: { stage5: { existingCreditCard: { buttonText, errorText, }, }, },
      }) => (
        <div className={className}>
          {errorText}
          <FelaComponent style={{ textAlign: 'center', marginTop: '4rem', }}>
            <Button
              onClick={() => {
                Router.back();
              }}
            >
              {buttonText}
            </Button>
          </FelaComponent>
        </div>
      )}
    />
  );
}

class Wrapper extends Component {
  static propTypes = {
    hostname: PropTypes.string.isRequired,
    paymentData: PropTypes.shape({}).isRequired,
    user: PropTypes.shape({}).isRequired,
    fourDigits: PropTypes.string.isRequired,
    thankYouEmailTemplate: PropTypes.string.isRequired,
  };

  state = {
    minTimePassed: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        minTimePassed: true,
      });
    }, 3000);
  }
  render() {
    const {
      hostname,
      paymentData,
      user,
      fourDigits,
      thankYouEmailTemplate,
    } = this.props;
    const queryVars = {
      ssoID: user.id,
      productID: paymentData.productID,
      firstName: user.firstName,
      lastName: user.lastName,
      saleCode: paymentData.saleCode,
      promotionNumber: paymentData.promotionNumber,
      email: user.email,
      sumPayment: paymentData.prices[0].toString(),
      thankYouEmailTemplate,
      description: paymentData.description,
      failure: false,
      // does not matter what we send so hardcoded
      connectionType: '764',
      lastFourDigits: fourDigits.toString(),
    };
    return (
      <Query
        query={PAY_WITH_EXISTING_CARD}
        variables={queryVars}
        fetchPolicy="network-only"
      >
        {({ data, loading, error, }) => {
          const LoaderIcon = hostname.includes('themarker')
            ? IconTmLoader
            : IconHtzLoader;
          // todo take care of errors
          if (loading || !this.state.minTimePassed) {
            return (
              <LoaderIcon
                size={10}
                color="primary"
                miscStyles={{
                  marginTop: '4rem',
                }}
              />
            );
          }
          if (error) {
            return <DisplayError />;
          }
          // todo: get productId from pay with existing card
          return data.payWithExistingCard ? (
            <Redirect
              destination={`/promotions-page/thankYou?msg=thank_user&product=${
                paymentData.productID
              }`}
              replace
            />
          ) : (
            <DisplayError />
          );
        }}
      </Query>
    );
  }
}

export default Wrapper;
