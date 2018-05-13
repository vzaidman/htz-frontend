/* global window */
import React from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, UserDispenser, } from '@haaretz/htz-components';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import CreditCardIframeStage from '../../components/OfferPage/Stages/CreditCardIframeStage';
import PayPalStage from '../../components/OfferPage/Stages/PayPalStage';
import ExistingCreditCardStage from '../../components/OfferPage/Stages/ExistingCreditCardStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';

const GET_PROMOTIONS_STATE = gql`
  query {
    promotionsPageState @client {
      approveDebtClaim
      chosenOfferIndex
      chosenProductIndex
      chosenSlotIndex
      couponProduct
      paymentMethodIndex
      paymentType
    }
  }
`;

function buildCreditGuardSrc(
  paymentData,
  approveDebtClaim,
  thankYouEmailTemplate
) {
  if (!(window && window.location && window.location.hostname)) {
    throw new Error(
      'Tried creating a config with no window.location.hostname context!'
    );
  }
  const devPrefix = window.location.hostname.startsWith('promotions')
    ? ''
    : 'dev-';
  console.log('DEV-PREFIX', devPrefix);

  return `https://${devPrefix}payment.haaretz.co.il/creditGuard/CreditGuardBridgeServlet?productID=${
    paymentData.productID
  }&saleCode=${paymentData.saleCode}&promotionNumber=${
    paymentData.promotionNumber
  }&cgtype=payment_heb2&approveDebtClaim=${approveDebtClaim}&thankYouEmailTemplate=${thankYouEmailTemplate}`;
}

function Stage5() {
  return (
    <MainLayout>
      <OfferPageDataGetter
        render={({ data, loading, error, refetch, client, }) => {
          if (loading) return <div> Loading...</div>;
          if (error) return <div> Error...</div>;
          return (
            <Query query={GET_PROMOTIONS_STATE}>
              {({ data: clientData, }) => {
                const {
                  promotionsPageState: {
                    approveDebtClaim,
                    chosenOfferIndex,
                    chosenProductIndex,
                    chosenSlotIndex,
                    couponProduct,
                    paymentMethodIndex,
                    paymentType,
                  },
                } = clientData;

                const parsedCouponProduct = JSON.parse(couponProduct);

                // if couponProduct is chosen use the couponProduct from local state
                const chosenProduct =
                  chosenProductIndex === 'couponProduct'
                    ? parsedCouponProduct
                    : data.purchasePage.slots[chosenSlotIndex].products[
                        chosenProductIndex
                      ];
                const chosenOffer = chosenProduct.offerList[chosenOfferIndex];

                const paymentData = chosenOffer.paymentData;

                const thankYouEmailTemplate =
                  chosenProduct.thankYouEmailTemplate;

                const creditGuardSrc = buildCreditGuardSrc(
                  paymentData,
                  approveDebtClaim,
                  thankYouEmailTemplate
                );

                const chosenSubscription =
                  data.purchasePage.slots[chosenSlotIndex].subscriptionName;

                const chosenPaymentArrangement = chosenOffer.type;

                return (
                  <FelaComponent
                    style={{ textAlign: 'center', }}
                    render={({
                      className,
                      theme: { stage5: { header, details, }, },
                    }) => (
                      <div className={className}>
                        <StageCounter stage={5} />
                        <LayoutContainer
                          bgc="white"
                          miscStyles={{ paddingTop: '1.5rem', }}
                        >
                          <UserDispenser
                            render={({ user, isLoggedIn, }) => (
                              <StageTransition
                                chosenSubscription={chosenSubscription}
                                stage={5}
                                user={user}
                                isLoggedIn={isLoggedIn}
                                headerElement={
                                  <StageHeader
                                    headerElements={[
                                      <FelaComponent
                                        style={{ fontWeight: 'bold', }}
                                      >
                                        {header.textTopLine}
                                      </FelaComponent>,
                                      <span>{header.textNewLine}</span>,
                                    ]}
                                  />
                                }
                                stageElement={
                                  paymentType === 'PayPal' ? (
                                    <PayPalStage
                                      creditGuardSrc={creditGuardSrc}
                                    />
                                  ) : paymentType === 'existingCreditCard' ? (
                                    <ExistingCreditCardStage
                                      paymentData={paymentData}
                                      user={user}
                                      fourDigits={
                                        data.purchasePage.creditCardsDetails[
                                          paymentMethodIndex
                                        ].fourDigits
                                      }
                                      thankYouEmailTemplate={
                                        thankYouEmailTemplate
                                      }
                                    />
                                  ) : (
                                    <CreditCardIframeStage
                                      creditGuardSrc={creditGuardSrc}
                                      chosenSubscription={chosenSubscription}
                                      chosenPaymentArrangement={
                                        chosenPaymentArrangement
                                      }
                                      firstPaymentAmount={paymentData.prices[0]}
                                      nextPaymentAmount={paymentData.prices[1]}
                                    />
                                  )
                                }
                              />
                            )}
                          />
                        </LayoutContainer>
                      </div>
                    )}
                  />
                );
              }}
            </Query>
          );
        }}
      />
    </MainLayout>
  );
}

Stage5.propTypes = pagePropTypes;

Stage5.defaultProps = {};

export default withData(Stage5);
