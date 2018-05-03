import React, { Fragment, } from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, UserDispenser, } from '@haaretz/htz-components';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import PaymentStage from '../../components/OfferPage/Stages/PaymentStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';

const GET_PROMOTIONS_STATE = gql`
  query {
    promotionsPageState @client {
      stage
      chosenOfferIndex
      chosenProductIndex
      chosenSlotIndex
      couponProduct
    }
    loggedInOrRegistered @client
  }
`;

function Stage4() {
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
                    chosenOfferIndex,
                    chosenProductIndex,
                    chosenSlotIndex,
                    couponProduct,
                  },
                  loggedInOrRegistered,
                } = clientData;
                const parsedCouponProduct = JSON.parse(couponProduct);

                // if couponProduct is chosen use the couponProduct from local state
                const chosenOffer =
                  chosenProductIndex === 'couponProduct'
                    ? parsedCouponProduct.offerList[chosenOfferIndex]
                    : data.purchasePage.slots[chosenSlotIndex].products[
                        chosenProductIndex
                      ].offerList[chosenOfferIndex];
                const paymentData = chosenOffer.paymentData;

                const chosenSubscription =
                  data.purchasePage.slots[chosenSlotIndex].subscriptionName;

                const chosenPaymentArrangement = chosenOffer.type;

                return (
                  <FelaComponent
                    style={{ textAlign: 'center', }}
                    render={({
                      className,
                      theme: { stage4: { header, details, }, },
                    }) => (
                      <div className={className}>
                        <StageCounter stage={4} />
                        <LayoutContainer
                          bgc="white"
                          miscStyles={{ paddingTop: '1.5rem', }}
                        >
                          <UserDispenser
                            render={({ user, isLoggedIn, }) => (
                              <StageTransition
                                chosenSubscription={chosenSubscription}
                                stage={4}
                                user={user}
                                isLoggedIn={isLoggedIn}
                                headerElement={
                                  <StageHeader
                                    headerElements={[
                                      ...(loggedInOrRegistered
                                        ? [
                                          <Fragment>
                                            <span>
                                              {header.textBeforeName}
                                            </span>{' '}
                                            <span>{user.firstName}</span>
                                            {', '}
                                            <span>
                                              {
                                                  header[
                                                    loggedInOrRegistered ||
                                                      'connected'
                                                  ].textAfterName
                                                }
                                            </span>
                                          </Fragment>,
                                          <span>
                                            {
                                                header[
                                                  loggedInOrRegistered ||
                                                    'connected'
                                                ].textNewLine
                                              }
                                          </span>,
                                          ]
                                        : [
                                          <Fragment>
                                            <span>
                                              {details.textBeforeChosen}
                                            </span>{' '}
                                            <FelaComponent
                                              style={{ fontWeight: 'bold', }}
                                              render="span"
                                            >
                                              {
                                                  details
                                                    .chosenSubscriptionText[
                                                    chosenSubscription
                                                  ]
                                                }{' '}
                                              {
                                                  details
                                                    .chosenPaymentArrangementText[
                                                    chosenPaymentArrangement
                                                  ]
                                                }
                                            </FelaComponent>
                                          </Fragment>,
                                          <span>{details.textNewLine}</span>,
                                          ]),
                                    ]}
                                  />
                                }
                                stageElement={
                                  <PaymentStage
                                    hasDebt={!!data.purchasePage.pastDebts}
                                    creditCardsDetails={
                                      data.purchasePage.creditCardsDetails
                                    }
                                    chosenSubscription={chosenSubscription}
                                    chosenPaymentArrangement={
                                      chosenPaymentArrangement
                                    }
                                    firstPaymentAmount={paymentData.prices[0]}
                                    nextPaymentAmount={paymentData.prices[1]}
                                    displayPayPal={
                                      paymentData.paymentType === 'J4'
                                    }
                                  />
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

Stage4.propTypes = pagePropTypes;

Stage4.defaultProps = {};

export default withData(Stage4);
