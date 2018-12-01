import React, { Fragment, Component, } from 'react';
import { pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, Query, pixelEvent, } from '@haaretz/htz-components';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ChooseProductStage from '../../components/OfferPage/Stages/ChooseProductStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';
import CampaignHeader from '../../components/OfferPage/Stages/ChooseProductStageElements/CampaignHeader';
import checkSessionForPurchase from '../../utils/checkSessionForPurchase';

const GET_LOCAL_STATE = gql`
  query {
    hostname @client
    startFromStage2 @client
    promotionsPageState @client {
      subStage
      chosenSlotIndex
      chosenProductIndex
      couponProduct
    }
  }
`;

class Stage2 extends Component {
  componentDidMount() {
    pixelEvent('track', 'PageView');
    checkSessionForPurchase();
  }

  render() {
    return (
      <OfferPageDataGetter
        render={({ data, loading, error, refetch, client, }) => {
          if (loading) return <div />;
          if (error) return <div> Error...</div>;
          const isFirstPage = Math.floor(data.purchasePage.pageNumber) === 3;
          return (
            <MainLayout displayBackButton={!isFirstPage}>
              <Query query={GET_LOCAL_STATE}>
                {({ data: clientData, }) => {
                  const {
                    hostname,
                    startFromStage2,
                    promotionsPageState: {
                      subStage,
                      chosenProductIndex,
                      chosenSlotIndex,
                      couponProduct,
                    },
                  } = clientData;
                  if (!startFromStage2 && isFirstPage) {
                    client.writeData({ data: { startFromStage2: true, }, });
                  }
                  return (
                    <FelaComponent
                      style={{ textAlign: 'center', }}
                      render={({
                        className,
                        theme: {
                          stage2: { header, },
                        },
                      }) => {
                        const chosenSlot = data.purchasePage.slots[chosenSlotIndex];
                        const campaignData = chosenProductIndex === 'couponProduct'
                          ? couponProduct.campaignData
                          : chosenSlot.products[chosenProductIndex].campaignData;
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
                              <div>
                                <StageTransition
                                  chosenSubscription={chosenSlot.subscriptionName}
                                  skipTransition={!!campaignData || isFirstPage}
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
                                                  {header.isFirst.textBeforeChosen}
                                                  {' '}
                                                  {
                                                      header.isFirst.chosenSubscriptionText[
                                                        chosenSlot.subscriptionName
                                                      ]
                                                    }
                                                  {'.'}
                                                </FelaComponent>
                                                <div>{header.isFirst.textAfterChosen}</div>
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
                                                  {header.notFirst.textBeforeChosen}
                                                  {' '}
                                                  {
                                                      header.notFirst.chosenSubscriptionText[
                                                        chosenSlot.subscriptionName
                                                      ]
                                                    }
                                                </FelaComponent>
                                                {'.'}
                                                <div>{header.notFirst.textAfterChosen}</div>
                                              </Fragment>,
                                            ]
                                        }
                                      />
                                    ) : null
                                  }
                                  stageElement={(
                                    <ChooseProductStage
                                      host={hostname.includes('themarker') ? 'TM' : 'HTZ'}
                                      chosenSubscription={chosenSlot.subscriptionName}
                                      chosenProductIndex={chosenProductIndex}
                                      couponExist={chosenSlot.couponExist}
                                      couponProduct={couponProduct}
                                      fourDigits={data.purchasePage.fourDigits}
                                      products={chosenSlot.products}
                                      refetch={refetch}
                                      subStage={subStage}
                                      userMessage={chosenSlot.userMessage}
                                    />
)}
                                />
                              </div>
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
}

Stage2.propTypes = pagePropTypes;

Stage2.defaultProps = {};

export default Stage2;
