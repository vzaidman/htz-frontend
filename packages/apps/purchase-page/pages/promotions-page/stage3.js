import React, { Component, Fragment, } from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, } from '@haaretz/htz-components';
import { Query, ApolloProvider, } from 'react-apollo';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import LoginOrRegisterStage from '../../components/OfferPage/Stages/LoginOrRegisterStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';
import LoginRedirect from '../../components/OfferPage/Stages/LoginOrRegisterElements/LoginRedirect';

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
  };

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
      <ApolloProvider client={this.props.apolloClient}>
        <MainLayout>
          <OfferPageDataGetter
            render={({ data, loading, error, refetch, client, }) => {
              if (loading) return <div> Loading stage 3...</div>;
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
                    const chosenSubscription = data.purchasePage.slots
                      ? data.purchasePage.slots[chosenSlotIndex]
                          .subscriptionName
                      : null;

                    const chosenPaymentArrangement = data.purchasePage.slots
                      ? data.purchasePage.slots[chosenSlotIndex].products[
                          chosenProductIndex
                        ].offerList[chosenOfferIndex].type
                      : null;

                    if (this.state.refetch) {
                      client.writeData({
                        data: { loggedInOrRegistered: 'loggedIn', },
                      });
                      return (
                        <LoginRedirect
                          chosenSubscription={chosenSubscription}
                          refetch={refetch}
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
                                headerElement={
                                  <StageHeader
                                    headerElements={[
                                      <FelaComponent
                                        style={{ fontWeight: 'bold', }}
                                        render="span"
                                      >
                                        <span>{header.textBeforeChosen}</span>{' '}
                                        {
                                          header.chosenSubscriptionText[
                                            chosenSubscription
                                          ]
                                        }{' '}
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
                                }
                                stageElement={
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
      </ApolloProvider>
    );
  }
}

export default withData(Stage3);
