/* global window */
import React, { Component, } from 'react';
import { pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, UserDispenser, Query, pixelEvent, } from '@haaretz/htz-components';
import gql from 'graphql-tag';
import config from 'config';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import CreditCardIframeStage from '../../components/OfferPage/Stages/CreditCardIframeStage';
import PayPalStage from '../../components/OfferPage/Stages/PayPalStage';
import ExistingCreditCardStage from '../../components/OfferPage/Stages/ExistingCreditCardStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';
import checkSessionForPurchase from '../../utils/checkSessionForPurchase';

const paymentService = config.get('service.payment');

const GET_PROMOTIONS_STATE = gql`
  query {
    hostname @client
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

function buildCreditGuardSrc(paymentData, approveDebtClaim, thankYouEmailTemplate) {
  if (!(window && window.location && window.location.hostname)) {
    throw new Error('Tried creating a config with no window.location.hostname context!');
  }

  return `${paymentService}/creditGuard/CreditGuardBridgeServlet?productID=${
    paymentData.productID
  }&saleCode=${paymentData.saleCode}&promotionNumber=${
    paymentData.promotionNumber
  }&cgtype=payment_heb2&approveDebtClaim=${approveDebtClaim}&thankYouEmailTemplate=${thankYouEmailTemplate}`;
}

class Stage5 extends Component {
  componentDidMount() {
    pixelEvent('track', 'PageView');
    checkSessionForPurchase();
  }

  render() {
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
                    hostname,
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

                  if (
                    typeof window !== 'undefined'
                    && paymentType !== 'PayPal'
                    && (window.sessionStorage.getItem('htz-revenue')
                      || window.sessionStorage.getItem('htz-paypal'))
                  ) {
                    window.sessionStorage.removeItem('htz-paypal');
                    window.sessionStorage.removeItem('htz-revenue');
                    window.sessionStorage.removeItem('htz-add-product');
                  }

                  const parsedCouponProduct = JSON.parse(couponProduct);

                  // if couponProduct is chosen use the couponProduct from local state
                  const chosenProduct = chosenProductIndex === 'couponProduct'
                    ? parsedCouponProduct
                    : data.purchasePage.slots[chosenSlotIndex].products[chosenProductIndex];
                  const chosenOffer = chosenProduct.offerList[chosenOfferIndex];
                  const chosenProductContentName = chosenProduct.contentName;
                  const paymentData = chosenOffer.paymentData;

                  const thankYouEmailTemplate = chosenProduct.thankYouEmailTemplate;

                  const creditGuardSrc = buildCreditGuardSrc(
                    paymentData,
                    approveDebtClaim,
                    thankYouEmailTemplate
                  );

                  const chosenSubscription = data.purchasePage.slots[chosenSlotIndex].subscriptionName;

                  const chosenPaymentArrangement = chosenOffer.type;

                  return (
                    <FelaComponent
                      style={{ textAlign: 'center', }}
                      render={({
                        className,
                        theme: {
                          stage5: { header, details, },
                        },
                      }) => (
                        <div className={className}>
                          <StageCounter stage={5} />
                          <LayoutContainer bgc="white" miscStyles={{ paddingTop: '1.5rem', }}>
                            <UserDispenser
                              render={({ user, }) => (
                                <StageTransition
                                  chosenSubscription={chosenSubscription}
                                  headerElement={(
                                    <StageHeader
                                      headerElements={[
                                        <FelaComponent style={{ fontWeight: 'bold', }}>
                                          {header.textTopLine}
                                        </FelaComponent>,
                                        <span>{header.textNewLine[paymentType]}</span>,
                                      ]}
                                    />
)}
                                  stageElement={
                                    paymentType === 'PayPal' ? (
                                      <PayPalStage creditGuardSrc={creditGuardSrc} />
                                    ) : paymentType === 'existingCreditCard' ? (
                                      <ExistingCreditCardStage
                                        chosenSubscription={chosenSubscription}
                                        chosenPaymentArrangement={chosenPaymentArrangement}
                                        chosenProductContentName={chosenProductContentName}
                                        hostname={hostname}
                                        user={user}
                                        fourDigits={
                                          data.purchasePage.creditCardsDetails[paymentMethodIndex]
                                            .fourDigits
                                        }
                                        paymentData={paymentData}
                                        thankYouEmailTemplate={thankYouEmailTemplate}
                                      />
                                    ) : (
                                      <CreditCardIframeStage
                                        creditGuardSrc={creditGuardSrc}
                                        chosenSubscription={chosenSubscription}
                                        chosenPaymentArrangement={chosenPaymentArrangement}
                                        chosenProductContentName={chosenProductContentName}
                                        firstPaymentAmount={paymentData.prices[0]}
                                        nextPaymentAmount={paymentData.prices[1]}
                                        paymentData={paymentData}
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
}

Stage5.propTypes = pagePropTypes;

Stage5.defaultProps = {};

export default Stage5;
