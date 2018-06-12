import React from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { FelaComponent, } from 'react-fela';
import { LayoutContainer, } from '@haaretz/htz-components';
import { Query, ApolloProvider, } from 'react-apollo';
import gql from 'graphql-tag';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import DebtStage from '../../components/OfferPage/Stages/DebtStage';
import StageTransition from '../../components/OfferPage/StageTransition/StageTransition';
import StageCounter from '../../components/OfferPage/Stages/Elements/StageCounter';

const GET_PROMOTIONS_STATE = gql`
  query {
    promotionsPageState @client {
      chosenSlotIndex
    }
  }
`;

function StageDebt(props) {
  return (
    <ApolloProvider client={props.apolloClient}>
      <MainLayout>
        <OfferPageDataGetter
          render={({ data, loading, error, refetch, client, }) => {
            if (loading) return <div> Loading...</div>;
            if (error) return <div> Error...</div>;
            return (
              <Query query={GET_PROMOTIONS_STATE}>
                {({ data: clientData, }) => {
                  const {
                    promotionsPageState: { chosenSlotIndex, },
                  } = clientData;
                  return (
                    <FelaComponent style={{ textAlign: 'center', }}>
                      <StageCounter />
                      <LayoutContainer
                        bgc="white"
                        miscStyles={{ paddingTop: '1.5rem', }}
                      >
                        <StageTransition
                          chosenSubscription={
                            data.purchasePage.slots[chosenSlotIndex]
                              .subscriptionName
                          }
                          stage="debt"
                          stageElement={
                            <DebtStage
                              pastDebts={data.purchasePage.pastDebts}
                            />
                          }
                        />
                      </LayoutContainer>
                    </FelaComponent>
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

StageDebt.propTypes = pagePropTypes;

StageDebt.defaultProps = {};

export default withData(StageDebt);
