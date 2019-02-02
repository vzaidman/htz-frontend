// @flow
import React, { Fragment, } from 'react';
import gql from 'graphql-tag';
import { Grid, GridItem, Query, GeneralAdSlot, } from '@haaretz/htz-components';
import { FelaTheme, FelaComponent, } from 'react-fela';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import QuoteSummary from '../../components/QuotePageComponents/QuoteSummary/QuoteSummary';
import RelatedAssets from '../../components/QuotePageComponents/RelatedAssets/RelatedAssets';
import GraphController from '../../components/GraphController/GraphController';
import QuoteInfoTable from '../../components/QuotePageComponents/QuoteInfoTable/QuoteInfoTable';
import VolumeGraph from '../../components/Graph/graphs/Volume/Volume';
import YieldGraph from '../../components/Graph/graphs/Yield/Yield';
import ShareHolders from '../../components/QuotePageComponents/ShareHolders/ShareHolders';

const OptionQuery: DocumentNode = gql`
  query OptionData($assetId: String!) {
    asset(assetId: $assetId) {
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
    asPath: string,
  },
};

function options({
  url: {
    query: { assetId, section, },
    asPath,
  },
}: Props): Node {
  return (
    <Query query={OptionQuery} variables={{ assetId, }}>
      {({ loading, error, data, }) => {
        if (error) return null;
        if (loading) return null;
        const {
          asset: {
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
          <MainLayout
            section={section}
            title={`${name} -אופציות - TheMarker Finance`}
            description={`${name} למידע עדכני על נתוני אופציות - נגזרים וכתבי אופציות, היכנסו לאתר TheMarker Finance`}
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
                        { title: 'שינוי בש"ח', value: numeralChange, },
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
                    <GraphController assetId={assetId} width={900} />
                  </PageRow>
                  <PageRow>
                    <Grid
                      gutter={2}
                      miscStyles={{
                        paddingStart: '0rem',
                        paddingEnd: '0rem',
                      }}
                    >
                      <GridItem width={1 / 3}>
                        <RowItem title="נתוני המסחר">
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
                            ]}
                          />
                        </RowItem>
                      </GridItem>
                      <GridItem width={2 / 3}>
                        <FelaComponent
                          style={{
                            display: 'flow',
                            flowDirection: 'column',
                          }}
                        >
                          <RowItem title="מחזורים">
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
                          <RowItem title="תשואות">
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
                    <RowItem
                      title="פרטי אופציה"
                      miscStyles={{ marginBottom: '2rem', }}
                    >
                      <Grid
                        gutter={2}
                        miscStyles={{
                          paddingStart: '0rem',
                          paddingEnd: '0rem',
                        }}
                      >
                        <GridItem width={1 / 2}>
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'numeralChange', display: 'שינוי בש"ח', },
                              {
                                name: 'changePercentage',
                                display: 'שינוי ב-%',
                              },
                              { name: 'unitsVolume', display: 'מחזור ביחידות', },
                              { name: 'volume', display: 'מחזור בש"ח', },
                              {
                                name: 'openPositions',
                                display: 'פוזיציות פתוחות',
                              },
                              {
                                name: 'openPositionsChangeRate',
                                display: 'שינוי בפוזיציות פתוחות',
                              },
                              { name: 'name', display: 'שם נכס בסיס', },
                              {
                                name: 'redemptionPrice',
                                display: 'מחיר מימוש',
                              },
                            ]}
                          />
                        </GridItem>
                        <GridItem width={1 / 2}>
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'contractSize', display: 'גודל חוזה', },
                              {
                                name: 'expirationDate',
                                display: 'תאריך פקיעה',
                                type: 'date',
                              },
                              {
                                name: 'daysToExpiration',
                                display: 'ימים לפקיעה',
                              },
                              {
                                name: 'tradeTime',
                                display: 'תאריך מסחר',
                                type: 'date',
                              },
                              {
                                name: 'lastTradeTime',
                                display: 'תאריך מסחר אחרון',
                                type: 'date',
                              },
                              {
                                name: 'assetStateDate',
                                display: 'תאריך שער/מדד קובע',
                                type: 'date',
                              },
                              {
                                name: 'theoreticalValue',
                                display: 'שווי תאורטי',
                              },
                              {
                                name: 'theoreticalValueGap',
                                display: 'פער משווי תאורטי',
                              },
                            ]}
                          />
                        </GridItem>
                      </Grid>
                    </RowItem>
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
                  <PageRow>
                    <Grid
                      gutter={2}
                      miscStyles={{
                        paddingStart: '0rem',
                        paddingEnd: '0rem',
                      }}
                    >
                      <GridItem width={1 / 3}>
                        <RowItem
                          title="יחסים פיננסיים"
                          miscStyles={{ marginBottom: '2rem', }}
                        >
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'peRatio', display: 'מכפיל רווח', },
                              { name: 'pbRatio', display: 'מכפיל הון', },
                              { name: 'roe', display: 'תשואה על ההון העצמי', },
                              { name: 'psRatio', display: 'מכפיל מכירות', },
                            ]}
                          />
                        </RowItem>
                      </GridItem>
                      <GridItem width={2 / 3}>
                        <RowItem title="בעלי עניין קונצרני">
                          <ShareHolders data={shareHolders} />
                        </RowItem>
                      </GridItem>
                    </Grid>
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

export default options;
