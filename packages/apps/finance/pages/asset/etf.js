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
import GraphController from '../../components/GraphController/GraphController';
import QuoteSummary from '../../components/QuotePageComponents/QuoteSummary/QuoteSummary';
import QuoteInfoTable from '../../components/QuotePageComponents/QuoteInfoTable/QuoteInfoTable';
import VolumeGraph from '../../components/Graph/graphs/Volume/Volume';
import YieldGraph from '../../components/Graph/graphs/Yield/Yield';
import RelatedAssets from '../../components/QuotePageComponents/RelatedAssets/RelatedAssets';
import QuoteAssetsTable from '../../components/QuotePageComponents/QuoteAssetsTable/QuoteAssetsTable';

const EtfQuery: DocumentNode = gql`
  query EtfData($assetId: String!){
    asset(assetId: $assetId){
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
      policyChangeDate
      mtfEtfPolicy
      indexExposure {
        name
        id
        type
        value
        assetBaseHoldingRatio
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

function etf({ url: { query: { section, assetId, }, asPath, }, }: Props): Node {
  return (
    <Query
      query={EtfQuery}
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
            mtfEtfPolicy,
            policyChangeDate,
            indexExposure,
          },
        } = data;
        return (
          <MainLayout
            section={section}
            title={`${name} - תעודות סל - TheMarker Finance`}
            description={`${name} - למידע עדכני על תעודות סל היכנסו לאתר TheMarker Finance`}
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
                              { name: 'value', display: 'שער אחרון', },
                              { name: 'numeralChange', display: 'שינוי באגורות', },
                              { name: 'changePercentage', display: 'שינוי ב-%', },
                              { name: 'lastTradeTime', display: 'מועד עדכון אחרון', type: 'date', },
                              { name: 'dailyLow', display: 'נמוך יומי', },
                              { name: 'dailyHigh', display: 'גבוה יומי', },
                              { name: 'volume', display: 'מחזור', },
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
                    <RowItem
                      title="מידע כללי"
                      miscStyles={{ marginBottom: '2rem', }}
                    >
                      <Grid
                        gutter={2}
                        miscStyles={{
                          paddingStart: '0rem',
                          paddingEnd: '0rem',
                        }}
                      >
                        <GridItem
                          width={1 / 2}
                        >
                          <QuoteInfoTable
                            miscStyles={{
                              height: '100%',
                            }}
                            id={assetId}
                            fields={[
                              { name: 'currencyExposure', display: 'חשיפה (הצמדה) למטבע', },
                              { name: 'etfType', display: 'סוג תעודה', },
                              { name: 'etfIssuer', display: 'מנפיק התעודה', },
                              { name: 'issueDate', display: 'תאריך הנפקה', type: 'date', },
                              { name: 'conversionType', display: 'סוג המרה', },
                              { name: 'baseAsset', display: 'נכס בסיס', },
                              { name: 'conversionFee', display: 'עמלת המרה', },
                            ]}
                          />
                        </GridItem>
                        <GridItem
                          width={1 / 2}
                        >
                          <QuoteInfoTable
                            miscStyles={{
                              whiteSpace: 'normal',
                              height: '100%',
                            }}
                            id={assetId}
                            fields={[
                              { name: 'retailTax', display: 'מס ליחידים', },
                              { name: 'dividendPolicy', display: 'מדיניות דיבידנד', },
                              { name: 'managementFee', display: 'דמי ניהול', },
                              { name: 'accumulatedDividend', display: 'דיבידנד צבור', },
                              { name: 'accumulatedInterest', display: 'ריבית צבורה', },
                              { name: 'managementFeeFactor', display: 'מקדם דמי ניהול', },
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
                      <GridItem
                        width={1 / 2}
                      >
                        <RowItem
                          title="פרופיל התעודה"
                          miscStyles={{ marginBottom: '1rem', }}
                        >
                          <FelaComponent
                            render="p"
                            style={{
                              ...theme.type(-1),
                              color: theme.color('neutral', '-3'),
                              marginBottom: '1rem',
                              marginTop: '1rem',
                              textAlign: 'start',
                            }}
                          >
                            {`תאריך שינוי מדיניות: ${
                              new Date(policyChangeDate)
                                .toLocaleString('it-It', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                })
                            }`}
                          </FelaComponent>
                          <FelaComponent
                            render="p"
                          >
                            {mtfEtfPolicy}
                          </FelaComponent>
                        </RowItem>
                      </GridItem>
                      <GridItem
                        width={1 / 2}
                      >
                        <RowItem
                          title="חשיפת התעודה למדדים"
                        >
                          <QuoteAssetsTable
                            assets={indexExposure}
                            fields={[
                              { value: 'name', display: 'נכס בסיס (שם הנכס)', miscStyles: { fontWeight: '700', }, },
                              { value: 'assetBaseHoldingRatio', display: 'אחוז בנכס בסיס', },
                            ]}
                          />
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

export default etf;
