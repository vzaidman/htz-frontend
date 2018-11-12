/* global window sessionStorage fbq */

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Button, IconHtzLoader, IconTmLoader, Query, } from '@haaretz/htz-components';
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
    ) {
      success
      pId
    }
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
    chosenSubscription: PropTypes.string.isRequired,
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
      chosenSubscription,
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

          if (data.payWithExistingCard.success) {
            if (fbq) {
              fbq('track', `Purchase_${chosenSubscription}`);
              fbq('track', 'Subscribe', {
                value: paymentData.prices[0].toString(),
                currency: 'ILS',
                subscription_id: `${Math.floor(Math.random() * 1000000000000)}`,
                offer_id: paymentData.saleCode,
              });
            }
else {
              console.warn('tried to fire a facebook pixel event but fbq is not defined');
            }
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
            sessionStorage.setItem('userProduct', data.payWithExistingCard.pId);
            return (
              <Redirect
                destination="thankYou"
                paramString={`msg=thank_user&product=${data.payWithExistingCard.pId}`}
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
