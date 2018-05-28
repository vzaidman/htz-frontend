import React from 'react';
import { withData, pagePropTypes, } from '@haaretz/app-utils';
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ChooseSlotStage from '../../components/OfferPage/Stages/ChooseSlotStage';
import Redirect from '../../components/Redirect/Redirect';

const GET_PROMOTIONS_STATE = gql`
  query {
    hostname @client
    promotionsPageState @client {
      subStage
    }
  }
`;

const getChooseSlotsData = slots =>
  slots.map(slot => {
    const { offerList, cancelButtonText, ...cleanData } = slot.products[0];
    return {
      subscriptionName: slot.subscriptionName,
      ...cleanData,
    };
  });

class Stage1 extends React.Component {
  static propTypes = pagePropTypes;

  static getInitialProps({ url, }) {
    return { url, };
  }

  render() {
    const { url: { query: { referrer, }, }, } = this.props || null;
    return (
      <MainLayout footerHasIllustration={false} displayBackButton={false}>
        <FelaComponent style={{ position: 'relative', }}>
          <OfferPageDataGetter
            render={({ data, loading, error, client, }) => {
              if (loading) return <div />;
              if (error) return <div> Error...</div>;
              client.writeData({ data: { referrer: referrer || null, }, });
              const { slots, pageNumber, } = data.purchasePage;
              return pageNumber >= 7 ? (
                <Redirect destination="/promotions-page/thankYou" replace />
              ) : slots.length > 1 ? (
                <Query query={GET_PROMOTIONS_STATE}>
                  {({ data: clientData, }) => {
                    const {
                      promotionsPageState: { subStage, },
                      hostname,
                    } = clientData;
                    client.writeData({ data: { startFromStage2: false, }, });
                    return (
                      <ChooseSlotStage
                        hostname={hostname}
                        tableData={getChooseSlotsData(slots)}
                        subStage={subStage}
                        userMessage={data.purchasePage.userMessage}
                      />
                    );
                  }}
                </Query>
              ) : (
                <Redirect destination="/promotions-page/stage2" replace />
              );
            }}
          />
        </FelaComponent>
      </MainLayout>
    );
  }
}

export default withData(Stage1);
