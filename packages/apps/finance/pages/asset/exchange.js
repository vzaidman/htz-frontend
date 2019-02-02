// @flow
import React, { Fragment, } from 'react';
import { Grid, GridItem, Query, GeneralAdSlot, } from '@haaretz/htz-components';
import { FelaTheme, FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import QuoteSummary from '../../components/QuotePageComponents/QuoteSummary/QuoteSummary';
import GraphController from '../../components/GraphController/GraphController';
import QuoteInfoTable from '../../components/QuotePageComponents/QuoteInfoTable/QuoteInfoTable';
import VolumeGraph from '../../components/Graph/graphs/Volume/Volume';
import YieldGraph from '../../components/Graph/graphs/Yield/Yield';

const ExchangeQuery: DocumentNode = gql`
  query ExchangeData($assetId: String!){
    asset(assetId: $assetId){
      name
      value
      changePercentage

      subType
      lastTradeTime
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
    asPath: string,
  },
};

function exchange({ url: { query: { assetId, section, }, asPath, }, }: Props): Node {
  const crypto: boolean = section === 'crypto';
  return (
    <Query
      partialRefetch
      query={ExchangeQuery}
      variables={{ assetId, }}
    >
      {({ loading, error, data, }) => {
        if (error) return null;
        if (loading) return null;
        const {
          asset: {
            name,
            value,
            changePercentage,
            fixedRate,
            subType,
            lastTradeTime,
            volume,
            dailyAvgVolume,
            weeklyYield,
            monthlyYield,
            quarterlyYield,
            yearlyYield,
          },
        } = data;
        return (
          <MainLayout
            section={section}
            title={crypto
              ? `${name} - שער ${name} - מטבעות דיגיטלים - TheMarker Finance`
              : `${name} -מט"ח – נתוני מסחר מטבע חוץ TheMarker Finance`
            }
            description={crypto
              ? `${name} שערים עדכנים והיסטוריים של מטבע ${name} - כל המידע על מטבעות דיגיטליים ומטבעות קריפטוגרפים באתר TheMarker Finance`
              : `${name} למידע על נתוני מסחר של מטבעות חוץ, שערי מט"ח, אופציות מט"ח, שערים יציגים ועוד , היכנסו לאתר TheMarker Finance`
            }
            path={asPath}
          >
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
                        (fixedRate
                          ? { title: 'שער יציג', value: fixedRate, decimal: 4, }
                          : { title: 'תשואה שנתית', value: yearlyYield, percentage: true, }
                        ),
                      ]}
                      date={{ title: 'נכון ל:', value: lastTradeTime, }}
                      assetInfo={[
                        { title: 'סוג נייר:', value: subType, },
                      ]}
                    />
                  </PageRow>
                  <PageRow>
                    <GraphController
                      assetId={assetId}
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
                          <QuoteInfoTable
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
                    <RowItem>
                      <GeneralAdSlot
                        id="Finance.TheMarker.com.Banner1"
                        contentName="Finance.TheMarker.com.Banner1"
                        audianceTarget="all"
                      />
                    </RowItem>
                  </PageRow>
                </Fragment>
              )}
            />
          </MainLayout>
        );
      }}
    </Query>
  );
}

export default exchange;
