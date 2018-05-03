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
                    render={({ className, theme: { stage2: { header, }, }, }) => (
                      <div className={className}>
                        <StageCounter stage={2} />
                        <LayoutContainer
                          bgc="white"
                          miscStyles={{ paddingTop: '1.5rem', }}
                        >
                          <UserDispenser
                            render={({ user, isLoggedIn, }) => {
                              const chosenSlot =
                                data.purchasePage.slots[chosenSlotIndex];
                              return (
                                <div>
                                  <StageTransition
                                    chosenSubscription={
                                      chosenSlot.subscriptionName
                                    }
                                    stage={2}
                                    user={user}
                                    isLoggedIn={isLoggedIn}
                                    headerElement={
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
                                    }
                                    stageElement={
                                      <ChooseProductStage
                                        isLoggedIn={isLoggedIn}
                                        fourDigits={
                                          data.purchasePage.fourDigits
                                        }
                                        subStage={subStage}
                                        refetch={refetch}
                                        chosenProductIndex={chosenProductIndex}
                                        couponExist={chosenSlot.couponExist}
                                        products={chosenSlot.products}
                                        couponProduct={couponProduct}
                                        userMessage={chosenSlot.userMessage}
                                      />
                                    }
                                  />
                                </div>
                              );
                            }}
                          />
                        </LayoutContainer>
                      </div>
                    )}
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
