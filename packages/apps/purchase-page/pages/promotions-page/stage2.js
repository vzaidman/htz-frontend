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
        if (loading) return <div />;
        if (error) return <div> Error...</div>;
        const isFirstPage = Math.floor(data.purchasePage.pageNumber) === 3;
        return (
          <MainLayout displayBackButton={!isFirstPage}>
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
                      const campaignData =
                        chosenProductIndex === 'couponProduct'
                          ? couponProduct.campaignData
                          : chosenSlot.products[chosenProductIndex]
                              .campaignData;
                      return (
                        <div className={className}>
                          {campaignData ? (
                            <CampaignHeader campaignData={campaignData} />
                          ) : (
                            <StageCounter stage={2} />
                          )}
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
                                    user={user}
                                    isLoggedIn={isLoggedIn}
                                    skipTransition={
                                      !!campaignData || isFirstPage
                                    }
                                    headerElement={
                                      !campaignData ? (
                                        <StageHeader
                                          headerElements={
                                            isFirstPage
                                              ? [
                                                <Fragment>
                                                  <FelaComponent
                                                    style={{
                                                        fontWeight: 'bold',
                                                      }}
                                                    render="span"
                                                  >
                                                    {
                                                        header.isFirst
                                                          .textBeforeChosen
                                                      }{' '}
                                                    {
                                                        header.isFirst
                                                          .chosenSubscriptionText[
                                                          chosenSlot
                                                            .subscriptionName
                                                        ]
                                                      }
                                                    {'.'}
                                                  </FelaComponent>
                                                  <div>
                                                    {
                                                        header.isFirst
                                                          .textAfterChosen
                                                      }
                                                  </div>
                                                </Fragment>,
                                                ]
                                              : [
                                                <Fragment>
                                                  <FelaComponent
                                                    style={{
                                                        fontWeight: 'bold',
                                                      }}
                                                    render="span"
                                                  >
                                                    {
                                                        header.notFirst
                                                          .textBeforeChosen
                                                      }{' '}
                                                    {
                                                        header.notFirst
                                                          .chosenSubscriptionText[
                                                          chosenSlot
                                                            .subscriptionName
                                                        ]
                                                      }
                                                  </FelaComponent>
                                                  {'.'}
                                                  <div>
                                                    {
                                                        header.notFirst
                                                          .textAfterChosen
                                                      }
                                                  </div>
                                                </Fragment>,
                                                ]
                                          }
                                        />
                                      ) : null
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
