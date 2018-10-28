/* global window */

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, IconHtzLoader, IconTmLoader, } from '@haaretz/htz-components';
import Router from 'next/router';
import ReactGA from 'react-ga';
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
        theme: {
          stage5: {
            existingCreditCard: { buttonText, errorText, },
          },
        },
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
    chosenPaymentArrangement: PropTypes.string.isRequired,
    chosenProductContentName: PropTypes.string.isRequired,
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
      chosenPaymentArrangement,
      chosenProductContentName,
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
      lastFourDigits: fourDigits.toString(),
    };
    return (
      <Query query={PAY_WITH_EXISTING_CARD} variables={queryVars}>
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
          if (data.payWithExistingCard) {
            ReactGA.ga('ec:addProduct', {
              id: paymentData.saleCode,
              name: `${chosenPaymentArrangement}-${chosenProductContentName}`,
              // category: offer.title,
              brand: `brand-salecode[${paymentData.saleCode}]`,
              price: paymentData.prices[0].toString(),
              variant: `promotionNumber-${paymentData.promotionNumber}`,
            });
            ReactGA.ga('ec:setAction', 'purchase', {
              id: paymentData.saleCode, // (Required) Transaction id (string).
              list: 'Product Stage Results',
              revenue: paymentData.prices[0].toString(),
              coupon: paymentData.saleCode,
            });
            return (
              <Redirect
                destination="thankYou"
                paramString={`msg=thank_user&product=${paymentData.productID}`}
                replace
              />
            );
          }
          return <DisplayError />;
        }}
      </Query>
    );
  }
}

export default Wrapper;
