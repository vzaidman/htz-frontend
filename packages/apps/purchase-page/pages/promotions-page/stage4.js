import React, { Fragment, Component, } from 'react';
import { pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, Query, } from '@haaretz/htz-components';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import PaymentStage from '../../components/OfferPage/Stages/PaymentStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';
import checkSessionForPurchase from '../../utils/checkSessionForPurchase';

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

class Stage4 extends Component {
  componentDidMount() {
    checkSessionForPurchase();
  }
  static getInitialProps({ url, }) {
    return { url, };
  }

  render() {
    let isFbInstant;
    if (this.props.url.query) {
      const {
        url: {
          // eslint-disable-next-line
          query: { redirect_uri, account_linking_token },
        },
      } = this.props;
      // eslint-disable-next-line
      isFbInstant = !!(account_linking_token && redirect_uri);
    }
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

                  const chosenProduct =
                    chosenProductIndex === 'couponProduct'
                      ? parsedCouponProduct
                      : data.purchasePage.slots[chosenSlotIndex].products[chosenProductIndex];

                  const chosenOffer = chosenProduct.offerList[chosenOfferIndex];
                  const chosenProductContentName = chosenProduct.contentName;
                  const paymentData = chosenOffer.paymentData;
                  const chosenSubscription =
                    data.purchasePage.slots[chosenSlotIndex].subscriptionName;
                  const chosenPaymentArrangement = chosenOffer.type;

                  return (
                    <FelaComponent
                      style={{ textAlign: 'center', }}
                      render={({
                        className,
                        theme: {
                          stage4: { header, details, },
                        },
                      }) => (
                        <div className={className}>
                          <StageCounter stage={4} />
                          <LayoutContainer bgc="white" miscStyles={{ paddingTop: '1.5rem', }}>
                            <StageTransition
                              chosenSubscription={chosenSubscription}
                              headerElement={
                                <StageHeader
                                  headerElements={[
                                    ...(loggedInOrRegistered
                                      ? [
                                        <FelaComponent style={{ fontWeight: 'bold', }}>
                                          {`${
                                              header[loggedInOrRegistered || 'connected']
                                                .textTopLine
                                            }`}
                                        </FelaComponent>,
                                        <span>
                                          {
                                              header[loggedInOrRegistered || 'connected']
                                                .textNewLine
                                            }
                                        </span>,
                                        ]
                                      : [
                                        <Fragment>
                                          <FelaComponent
                                            style={{ fontWeight: 'bold', }}
                                            render="span"
                                          >
                                            {details.textBeforeChosen}{' '}
                                            {details.chosenSubscriptionText[chosenSubscription]}{' '}
                                            {`${
                                                details.chosenPaymentArrangementText[
                                                  chosenPaymentArrangement
                                                ]
                                              }.`}
                                          </FelaComponent>
                                        </Fragment>,
                                        <span>{details.textNewLine}</span>,
                                        ]),
                                  ]}
                                />
                              }
                              stageElement={
                                <PaymentStage
                                  // chosenOffer={chosenOffer} hope we wont use it
                                  chosenProductContentName={chosenProductContentName}
                                  hasDebt={!!data.purchasePage.pastDebts}
                                  creditCardsDetails={data.purchasePage.creditCardsDetails}
                                  chosenSubscription={chosenSubscription}
                                  chosenPaymentArrangement={chosenPaymentArrangement}
                                  firstPaymentAmount={paymentData.prices[0]}
                                  nextPaymentAmount={paymentData.prices[1]}
                                  paymentData={paymentData}
                                  displayPayPal={paymentData.paymentType === 'J4' && !isFbInstant}
                                />
                              }
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

Stage4.propTypes = pagePropTypes;

Stage4.defaultProps = {};

export default Stage4;
