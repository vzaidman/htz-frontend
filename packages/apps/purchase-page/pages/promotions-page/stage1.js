import React from 'react';
import { pagePropTypes, } from '@haaretz/app-utils';
import { Query, pixelEvent, } from '@haaretz/htz-components';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';

import MainLayout from '../../layouts/MainLayout';
import OfferPageDataGetter from '../../components/OfferPage/OfferPageDataGetter';
import ChooseSlotStage from '../../components/OfferPage/Stages/ChooseSlotStage';
import Redirect from '../../components/Redirect/Redirect';
import checkSessionForPurchase from '../../utils/checkSessionForPurchase';

const GET_PROMOTIONS_STATE = gql`
  query {
    hostname @client
    promotionsPageState @client {
      subStage
    }
  }
`;

const getChooseSlotsData = slots => slots.map(slot => {
  const { offerList, cancelButtonText, ...cleanData } = slot.products[0];
  return {
    subscriptionName: slot.subscriptionName,
    ...cleanData,
  };
});

class Stage1 extends React.Component {
  static propTypes = pagePropTypes;

  componentDidMount() {
    pixelEvent('track', 'PageView');
    checkSessionForPurchase();
  }

  static getInitialProps({ url, }) {
    return { url, };
  }

  render() {
    let fbRedirectUri = null;
    let accountLinkToken = null;

    if (this.props.url.query) {
      const {
        url: {
          // eslint-disable-next-line
          query: { redirect_uri, account_linking_token },
        },
      } = this.props;
      // eslint-disable-next-line
      fbRedirectUri = redirect_uri;
      // eslint-disable-next-line
      accountLinkToken = account_linking_token;
    }
    return (
      <MainLayout footerHasIllustration={false} displayBackButton={false}>
        <FelaComponent style={{ position: 'relative', }}>
          <OfferPageDataGetter
            render={({ data, loading, error, client, }) => {
              if (loading) return <div />;
              if (error) return <div> Error...</div>;
              const { slots, pageNumber, } = data.purchasePage;
              console.log(`STAGE1-DATA ${JSON.stringify(data)}`);
              console.log(`STAGE2-DATA ${data.purchasePage}`);
              return Math.floor(pageNumber) === 7 ? (
                <Redirect destination="thankYou" replace />
              ) : Math.floor(pageNumber) === 3 ? (
                <Redirect destination="stage2" replace />
              ) : (
                <Query query={GET_PROMOTIONS_STATE}>
                  {({ data: clientData, }) => {
                    const {
                      promotionsPageState: { subStage, },
                      hostname,
                    } = clientData;
                    client.writeData({ data: { startFromStage2: false, }, });
                    // check which slots are on sale
                    const sale = slots.reduce((filtered, slot) => {
                      if (slot.products[0].campaignData) {
                        filtered.push(slot.subscriptionName);
                      }
                      return filtered;
                    }, []);
                    return (
                      <ChooseSlotStage
                        host={hostname.includes('themarker') ? 'TM' : 'HTZ'}
                        tableData={getChooseSlotsData(slots)}
                        subStage={subStage}
                        sale={sale}
                        userMessage={data.purchasePage.userMessage}
                        fbRedirectUri={fbRedirectUri}
                        accountLinkToken={accountLinkToken}
                      />
                    );
                  }}
                </Query>
              );
            }}
          />
        </FelaComponent>
      </MainLayout>
    );
  }
}

export default Stage1;
