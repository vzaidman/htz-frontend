// @flow
import React, { Fragment, } from 'react';
import { Grid, GridItem, } from '@haaretz/htz-components';
import { FelaTheme, FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import GraphController from '../../components/GraphController/GraphController';
import { Query, } from '../../components/ApolloBoundary/ApolloBoundary';
import QuoteSummary from '../../components/QuotePageComponents/QuoteSummary/QuoteSummary';
import QuoteTable from '../../components/QuotePageComponents/QuoteTable/QuoteTable';
import VolumeGraph from '../../components/Graph/graphs/Volume/Volume';
import YieldGraph from '../../components/Graph/graphs/Yield/Yield';
import RelatedAssets from '../../components/QuotePageComponents/RelatedAssets/RelatedAssets';
import ShareHoldersTable from '../../components/QuotePageComponents/ShareHoldersTable/ShareHoldersTable';

const StockQuery: DocumentNode = gql`
  query StockData($assetId: String!){
    assetData(assetId: $assetId){
      name
      value
      changePercentage
      numeralChange
      subType
      assetNumber
      lastTradeTime
      relatedAssets {
        type
        name
        id
      }
      volume
      dailyAvgVolume
      weeklyYield
      monthlyYield
      quarterlyYield
      yearlyYield
      shareHolders {
        shareHolderName
        equityHolderPercentage
        holdingMarketCap
      }
    }
  }
`;

type Props = {
  url: {
    pathname: string,
    query: {
      assetId: string,
      section: string,
    },
  },
};

function stocks({ url: { query: { assetId, section, }, }, }: Props): Node {
  return (
    <MainLayout section={section} assetId={assetId} >
      <Query
        query={StockQuery}
        variables={{ assetId, }}
      >
        {({ loading, error, data, }) => {
          if (error) return null;
          if (loading) return null;
          const {
            assetData: {
              name,
              value,
              changePercentage,
              numeralChange,
              subType,
              assetNumber,
              lastTradeTime,
              relatedAssets,
              volume,
              dailyAvgVolume,
              weeklyYield,
              monthlyYield,
              quarterlyYield,
              yearlyYield,
              shareHolders,
            },
          } = data;
          return (
            <FelaTheme
              render={theme => (
                <Fragment>
                  <PageRow lines={2}>
                    <RowItem
                      title={name}
                      miscStyles={{
                        ...theme.type(5),
                      }}
                    />
                  </PageRow>
                  <PageRow
                    miscStyles={{
                      marginBottom: '2rem',
                    }}
                  >
                    <QuoteSummary
                      valueData={[
                        { title: 'שער', value: value.toString(), },
                        { title: '% שינוי', value: changePercentage, },
                        { title: 'שינוי באג׳', value: numeralChange, },
                      ]}
                      date={{ title: 'נכון ל:', value: lastTradeTime, }}
                      assetInfo={[
                        { title: 'סוג נייר:', value: subType, },
                        { title: 'מספר נייר:', value: assetNumber, },
                      ]}
                    />
                  </PageRow>
                  <PageRow
                    miscStyles={{
                      marginBottom: '2rem',
                    }}
                  >
                    <RelatedAssets assets={relatedAssets} />
                  </PageRow>
                  <PageRow>
                    <GraphController
                      selectedStockId={assetId}
                      width={900}
                    />
                  </PageRow>
                  <PageRow>
                    <Grid
                      gutter={2}
                      miscStyles={{
                        paddingStart: '0rem',
                        paddingEnd: '0rem',
                      }}
                    >
                      <GridItem
                        width={1 / 3}
                      >
                        <RowItem
                          title="נתוני המסחר"
                        >
                          <QuoteTable
                            id={assetId}
                            tradingStatus
                            fixed
                            fields={[
                              { name: 'baseValue', display: 'שער בסיס', },
                              { name: 'openingValue', display: 'שער פתיחה', },
                              { name: 'value', display: 'שער אחרון', },
                              { name: 'dailyHigh', display: 'נמוך יומי', },
                              { name: 'dailyLow', display: 'גבוה יומי', },
                              { name: 'marketCap', display: 'שווי שוק', },
                            ]}
                          />
                        </RowItem>
                      </GridItem>
                      <GridItem
                        width={2 / 3}
                      >
                        <FelaComponent
                          style={{
                            display: 'flow',
                            flowDirection: 'column',
                          }}
                        >
                          <RowItem
                            title="מחזורים"
                          >
                            <VolumeGraph
                              theme={theme}
                              data={[
                                {
                                  name: 'מחזור (א׳ שח)',
                                  value: volume,
                                },
                                {
                                  name: 'מחזור יומי ממוצע (שנה)',
                                  value: dailyAvgVolume,
                                },
                              ]}
                              miscStyles={{
                                marginBottom: '2rem',
                                paddingStart: '2rem',
                                paddingEnd: '2rem',
                              }}
                            />
                          </RowItem>
                          <RowItem
                            title="תשואות"
                          >
                            <YieldGraph
                              theme={theme}
                              data={[
                                {
                                  name: 'שבוע ',
                                  value: weeklyYield,
                                },
                                {
                                  name: 'חודש',
                                  value: monthlyYield,
                                },
                                {
                                  name: 'רבעון',
                                  value: quarterlyYield,
                                },
                                {
                                  name: 'שנה',
                                  value: yearlyYield,
                                },
                              ]}
                              miscStyles={{
                                marginBottom: '2rem',
                                paddingStart: '2rem',
                                paddingEnd: '2rem',
                              }}
                            />
                          </RowItem>
                        </FelaComponent>
                      </GridItem>
                    </Grid>
                  </PageRow>
                  <PageRow>
                    <Grid
                      gutter={2}
                      miscStyles={{
                        paddingStart: '0rem',
                        paddingEnd: '0rem',
                      }}
                    >
                      <GridItem
                        width={1 / 3}
                      >
                        <RowItem
                          title="יחסים פיננסיים"
                          miscStyles={{ marginBottom: '2rem', }}
                        >
                          <QuoteTable
                            id={assetId}
                            fields={[
                              { name: 'peRatio', display: 'מכפיל רווח', },
                              { name: 'pbRatio', display: 'מכפיל הון', },
                              { name: 'roe', display: 'תשואה על ההון העצמי', },
                              { name: 'psRatio', display: 'מכפיל מכירות', },
                              { name: 'netProfitMargin', display: 'שיעור רווח נקי', },
                              { name: 'capitalBalanceRatio', display: 'הון למאזן', },
                            ]}
                          />
                        </RowItem>
                      </GridItem>
                      <GridItem
                        width={2 / 3}
                      >
                        <RowItem
                          title="בחסות בנק לאומי"
                          miscStyles={{
                            ...theme.type(0),
                          }}
                        />
                      </GridItem>
                    </Grid>
                  </PageRow>
                  <PageRow>
                    <Grid
                      gutter={2}
                      miscStyles={{
                        paddingStart: '0rem',
                        paddingEnd: '0rem',
                      }}
                    >
                      <GridItem
                        width={1 / 3}
                      />
                      <GridItem
                        width={2 / 3}
                      >
                        <RowItem
                          title="בעלי עניין קונצרני"
                        >
                          <ShareHoldersTable
                            shareHolders={shareHolders}
                          />
                        </RowItem>
                      </GridItem>
                    </Grid>
                  </PageRow>
                </Fragment>
              )}
            />
          );
        }}
      </Query>
    </MainLayout>
  );
}

export default stocks;
