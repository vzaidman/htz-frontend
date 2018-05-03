import React, { Component, Fragment, } from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, UserDispenser, } from '@haaretz/htz-components';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import LoginOrRegisterStage from '../../components/OfferPage/Stages/LoginOrRegisterStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';
import StageHeader from '../../components/OfferPage/Stages/Elements/StageHeader';

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
  };

  updateRegisterOrLoginStage = registerOrLoginStage => {
    this.setState({
      registerOrLoginStage,
    });
  };

  render() {
    return (
      <MainLayout>
        <OfferPageDataGetter
          render={({ data, loading, error, refetch, client, }) => {
            if (loading) return <div> Loading...</div>;
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

                  return (
                    <FelaComponent
                      style={{ textAlign: 'center', }}
                      render={({
                        className,
                        theme: { stage3: { header, }, },
                      }) => (
                        <div className={className}>
                          <StageCounter stage={3} />

                          <LayoutContainer
                            bgc="white"
                            miscStyles={{ paddingTop: '1.5rem', }}
                          >
                            <UserDispenser
                              render={({ user, isLoggedIn, }) => {
                                const chosenSubscription = !isLoggedIn
                                  ? data.purchasePage.slots[chosenSlotIndex]
                                      .subscriptionName
                                  : null;

                                const chosenPaymentArrangement = !isLoggedIn
                                  ? data.purchasePage.slots[chosenSlotIndex]
                                      .products[chosenProductIndex].offerList[
                                      chosenOfferIndex
                                    ].type
                                  : null;

                                return (
                                  <StageTransition
                                    stage={3}
                                    user={user}
                                    isLoggedIn={isLoggedIn}
                                    chosenSubscription={chosenSubscription}
                                    headerElement={
                                      <StageHeader
                                        headerElements={[
                                          this.state.registerOrLoginStage ===
                                            'checkEmail' && (
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
                                                    chosenSubscription
                                                  ]
                                                }{' '}
                                                {
                                                  header
                                                    .chosenPaymentArrangementText[
                                                    chosenPaymentArrangement
                                                  ]
                                                }
                                              </FelaComponent>
                                              {','}
                                            </Fragment>
                                          ),
                                          this.state.registerOrLoginStage ===
                                            'login' && (
                                            <FelaComponent
                                              style={{ fontWeight: 'bold', }}
                                              render="span"
                                            >
                                              {' '}
                                            </FelaComponent>
                                          ),
                                          this.state.registerOrLoginStage ===
                                            'register' && (
                                            <FelaComponent
                                              style={{ fontWeight: 'bold', }}
                                              render="span"
                                            >
                                              ברוכים הבאים!
                                            </FelaComponent>
                                          ),
                                          <fragment>
                                            {header.dynamicTextNewLineLoginStage[
                                              this.state.registerOrLoginStage
                                            ].map(line => <p>{line}</p>)}
                                          </fragment>,
                                        ]}
                                      />
                                    }
                                    stageElement={
                                      <LoginOrRegisterStage
                                        site={
                                          hostname.includes('themarker')
                                            ? 'TM'
                                            : 'HTZ'
                                        }
                                        chosenSubscription={chosenSubscription}
                                        updateRegisterOrLoginStage={
                                          this.updateRegisterOrLoginStage
                                        }
                                      />
                                    }
                                  />
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
            );
          }}
        />
      </MainLayout>
    );
  }
}

export default withData(Stage3);
