import React, { Component, Fragment, } from 'react';
import { pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { UserDispenser, LayoutContainer, Query, pixelEvent, } from '@haaretz/htz-components';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import LoginOrRegisterStage from '../../components/OfferPage/Stages/LoginOrRegisterStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';
import LoginRedirect from '../../components/OfferPage/Stages/LoginOrRegisterElements/LoginRedirect';
import checkSessionForPurchase from '../../utils/checkSessionForPurchase';

const GET_PROMOTIONS_STATE = gql`
  query {
    hostname @client
    promotionsPageState @client {
      stage
      chosenSlotIndex
      chosenProductIndex
      chosenOfferIndex
    }
  }
`;

class Stage3 extends Component {
  static propTypes = pagePropTypes;

  state = {
    registerOrLoginStage: 'checkEmail',
    refetch: false,
    chosenSubscription: null,
  };

  componentDidMount() {
    pixelEvent('track', 'PageView');
    checkSessionForPurchase();
  }

  updateRegisterOrLoginStage = registerOrLoginStage => {
    this.setState({
      registerOrLoginStage,
    });
  };

  updateRefetchStage = refetch => {
    this.setState({
      refetch,
    });
  };

  render() {
    return (
      <MainLayout>
        <OfferPageDataGetter
          render={({ data, loading, error, refetch, client, }) => {
            if (loading) return null;
            if (error) return <div> Error at stage3.js ...</div>;
            return (
              <Query query={GET_PROMOTIONS_STATE}>
                {({ data: clientData, }) => {
                  const {
                    hostname,
                    promotionsPageState: {
                      chosenSlotIndex,
                      chosenProductIndex,
                      chosenOfferIndex,
                    },
                  } = clientData;

                  const chosenSlot = data.purchasePage.slots
                    ? data.purchasePage.slots[chosenSlotIndex]
                      // slot might be invalid due to getting new data with only one slot
                      // in such a case we need to update the PromotionsPageState back to defaults
                      || (() => {
                        client.writeData({
                          data: {
                            promotionsPageState: {
                              chosenSlotIndex: 0,
                              chosenProductIndex: 0,
                              chosenOfferIndex: 0,
                              __typename: 'PromotionsPageState',
                            },
                          },
                        });
                        return 0;
                      })()
                    : null;

                  const chosenSubscription = (() => {
                    if (!this.state.chosenSubscription && chosenSlot) {
                      this.setState({
                        chosenSubscription: chosenSlot.subscriptionName,
                      });
                    }
                    return chosenSlot ? chosenSlot.subscriptionName : null;
                  })();

                  const chosenPaymentArrangement = chosenSlot
                    ? chosenSlot.products[chosenProductIndex].offerList[
                      chosenOfferIndex
                    ].type
                    : null;

                  if (this.state.refetch) {
                    client.writeData({
                      data: { loggedInOrRegistered: 'loggedIn', },
                    });
                    return (
                      <UserDispenser
                        render={({ isLoggedIn, }) => {
                          if (!isLoggedIn) {
                            return null;
                          }
                          return (
                            <LoginRedirect
                              chosenSubscription={this.state.chosenSubscription}
                              pageNumber={data.purchasePage.pageNumber}
                            />
                          );
                        }}
                      />
                    );
                  }
                  return (
                    <FelaComponent
                      style={{ textAlign: 'center', }}
                      render={({
                        className,
                        theme: {
                          stage3: { header, },
                        },
                      }) => (
                        <div className={className}>
                          <StageCounter stage={3} />

                          <LayoutContainer
                            bgc="white"
                            miscStyles={{ paddingTop: '1.5rem', }}
                          >
                            <StageTransition
                              chosenSubscription={chosenSubscription}
                              headerElement={(
                                <StageHeader
                                  headerElements={[
                                    <FelaComponent
                                      style={{ fontWeight: 'bold', }}
                                      render="span"
                                    >
                                      <span>{header.textBeforeChosen}</span>
                                      {' '}
                                      {
                                        header.chosenSubscriptionText[
                                          chosenSubscription
                                        ]
                                      }
                                      {' '}
                                      {`${
                                        header.chosenPaymentArrangementText[
                                          chosenPaymentArrangement
                                        ]
                                      }.`}
                                    </FelaComponent>,
                                    <Fragment>
                                      {header.dynamicTextNewLineLoginStage[
                                        this.state.registerOrLoginStage
                                      ].map(line => (
                                        <p key={Math.random()}>{line}</p>
                                      ))}
                                    </Fragment>,
                                  ]}
                                />
)}
                              stageElement={(
                                <LoginOrRegisterStage
                                  registerOrLoginStage={
                                    this.state.registerOrLoginStage
                                  }
                                  site={
                                    hostname.includes('themarker')
                                      ? 'TM'
                                      : 'HTZ'
                                  }
                                  chosenSubscription={chosenSubscription}
                                  updateRegisterOrLoginStage={
                                    this.updateRegisterOrLoginStage
                                  }
                                  updateRefetchState={this.updateRefetchStage}
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

export default Stage3;
