import React, { Fragment, } from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, UserDispenser, } from '@haaretz/htz-components';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ChooseProductStage from '../../components/OfferPage/Stages/ChooseProductStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';
import CampaignHeader from '../../components/OfferPage/Stages/ChooseProductStageElements/CampaignHeader';

const GET_LOCAL_STATE = gql`
  query {
    promotionsPageState @client {
      subStage
      chosenSlotIndex
      chosenProductIndex
      couponProduct
    }
  }
`;

function Stage2() {
  return (
    <OfferPageDataGetter
      render={({ data, loading, error, refetch, }) => {
        if (loading) return <div> Loading...</div>;
        if (error) return <div> Error...</div>;
        return (
          <MainLayout>
            <Query query={GET_LOCAL_STATE}>
              {({ data: clientData, }) => {
                const {
                  promotionsPageState: {
                    subStage,
                    chosenProductIndex,
                    chosenSlotIndex,
                    couponProduct,
                  },
                } = clientData;
                return (
                  <FelaComponent
                    style={{ textAlign: 'center', }}
                    render={({ className, theme: { stage2: { header, }, }, }) => {
                      const chosenSlot =
                        data.purchasePage.slots[chosenSlotIndex];
                      const chosenProduct =
                        chosenSlot.products[chosenProductIndex];
                      return (
                        <div className={className}>
                          {chosenProduct.campaignData ? (
                            <CampaignHeader
                              campaignData={chosenProduct.campaignData}
                            />
                          ) : (
                            <StageCounter stage={2} />
                          )}
                          {/* <StageCounter stage={2} /> */}
                          <LayoutContainer
                            bgc="transparent"
                            miscStyles={{ paddingTop: '1.5rem', }}
                          >
                            <UserDispenser
                              render={({ user, isLoggedIn, }) => (
                                <div>
                                  <StageTransition
                                    chosenSubscription={
                                      chosenSlot.subscriptionName
                                    }
                                    stage={2}
                                    user={user}
                                    isLoggedIn={isLoggedIn}
                                    skipTransition={
                                      !!chosenProduct.campaignData
                                    }
                                    headerElement={
                                      !chosenProduct.campaignData && (
                                        <StageHeader
                                          headerElements={[
                                            <Fragment>
                                              <span>
                                                {header.textBeforeChosen}
                                              </span>{' '}
                                              <FelaComponent
                                                style={{ fontWeight: 'bold', }}
                                                render="span"
                                              >
                                                {
                                                  header.chosenSubscriptionText[
                                                    chosenSlot.subscriptionName
                                                  ]
                                                }
                                              </FelaComponent>
                                              {', '}
                                              <span>
                                                {header.textAfterChosen}
                                              </span>
                                            </Fragment>,
                                          ]}
                                        />
                                      )
                                    }
                                    stageElement={
                                      <ChooseProductStage
                                        chosenProductIndex={chosenProductIndex}
                                        couponExist={chosenSlot.couponExist}
                                        couponProduct={couponProduct}
                                        fourDigits={
                                          data.purchasePage.fourDigits
                                        }
                                        isLoggedIn={isLoggedIn}
                                        products={chosenSlot.products}
                                        refetch={refetch}
                                        subStage={subStage}
                                        userMessage={chosenSlot.userMessage}
                                      />
                                    }
                                  />
                                </div>
                              )}
                            />
                          </LayoutContainer>
                        </div>
                      );
                    }}
                  />
                );
              }}
            </Query>
          </MainLayout>
        );
      }}
    />
  );
}

Stage2.propTypes = pagePropTypes;

Stage2.defaultProps = {};

export default withData(Stage2);
