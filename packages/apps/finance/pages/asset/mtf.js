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
import ShareHolders from '../../components/QuotePageComponents/ShareHolders/ShareHolders';
import QuoteAssetsTable from '../../components/QuotePageComponents/QuoteAssetsTable/QuoteAssetsTable';

const MtfQuery: DocumentNode = gql`
  query MtfData($assetId: String!){
    asset(assetId: $assetId){
      name
      value
      changePercentage
      numeralChange
      subType
      assetNumber
      assetComponents {
        name
        id
        type
        mtfHoldingRatio
        numeralValue
      }
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

function mtf({ url: { query: { section, assetId, }, asPath, }, }: Props): Node {
  return (
    <Query
      query={MtfQuery}
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
            assetComponents,
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
            shareHolders,
          },
        } = data;
        return (
          <MainLayout
            section={section}
            title={`${name} - קרנות נאמנות - TheMarker Finance`}
            description={`${name} - למידע עדכני על נתוני קרנות נאמנות, היכנסו לאתר TheMarker Finance`}
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
                              { name: 'purchasePrice', display: 'מחיר קנייה', },
                              { name: 'redemptionPrice', display: 'מחיר פדיון', },
                              { name: 'numeralChange', display: 'שינוי באגורות', },
                              { name: 'changePercentage', display: 'שינוי ב-%', },
                              { name: 'lastTradeTime', display: 'מועד עדכון אחרון', type: 'date', },
                              { name: 'standardDeviation', display: 'סטיית תקן', },
                              { name: 'sharpIndex', display: 'שארפ', },
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
                          width={1 / 3}
                        >
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'manager', display: 'מנהל הקרן', },
                              { name: 'trustee', display: 'נאמן הקרן', },
                              { name: 'exposureProfile', display: 'פרופיל חשיפה', },
                              { name: 'foundingDate', display: 'תאריך הקמה', type: 'date', },
                              { name: 'tradingHours', display: 'שעות מסחר', },
                              { name: 'dividendClassification', display: 'סיווג דיבידנד', },
                            ]}
                          />
                        </GridItem>
                        <GridItem
                          width={1 / 3}
                        >
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'mtfLinkForeignExchange', display: 'צמוד מט״ח', },
                              { name: 'mtfLinkIndex', display: 'צמוד מדד', },
                              { name: 'mtfLinkShekel', display: 'צמוד שקל', },
                              { name: 'mtfLinkOptions', display: 'אופציות', },
                              { name: 'mtfLinkStocks', display: 'מניות', },
                              { name: 'mtfLinkFunds', display: 'קרנות', },
                            ]}
                          />
                        </GridItem>
                        <GridItem
                          width={1 / 3}
                        >
                          <QuoteInfoTable
                            id={assetId}
                            fields={[
                              { name: 'managementFee', display: 'דמי ניהול', },
                              { name: 'trusteeFee', display: 'דמי נאמנות', },
                              { name: 'loadChargeRate', display: 'שיעורי הוספה', },
                              { name: 'distributionCommission', display: 'עמלת הפצה', },
                              { name: 'mainCurrency', display: 'מטבע עיקרי', },
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
                        width={1 / 3}
                      >
                        <RowItem
                          title="מדיניות"
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
                            style={{
                              ...theme.type(-1),
                            }}
                            render="p"
                          >
                            {mtfEtfPolicy}
                          </FelaComponent>
                        </RowItem>
                      </GridItem>
                      <GridItem
                        width={1 / 3}
                      >
                        <RowItem
                          title="סיווגים"
                          miscStyles={{ marginBottom: '2rem', }}
                        >
                          <QuoteInfoTable
                            id={assetId}
                            fixed
                            fields={[
                              { name: 'primeClassification', display: 'סיווג על', },
                              { name: 'mainClassification', display: 'סיווג ראשי', },
                              { name: 'secondaryClassification', display: 'סיווג משני', },
                              { name: 'taxClassification', display: 'סיווג מס', },
                              { name: 'stocksExposure', display: 'חשיפה למניות', },
                              { name: 'currencyExposure', display: 'חשיפה למט"ח', },
                            ]}
                          />
                        </RowItem>
                      </GridItem>
                      <GridItem
                        width={1 / 3}
                      >
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
                        width={1 / 2}
                      >
                        <RowItem
                          title="הרכב הקרן"
                        >
                          <QuoteAssetsTable
                            assets={assetComponents}
                            fields={[
                              { value: 'name', display: 'שם נייר', miscStyles: { fontWeight: '700', }, },
                              { value: 'mtfHoldingRatio', display: '% מהקרן', },
                              { value: 'numeralValue', display: 'שווי בא׳ ש״ח', },
                            ]}
                          />
                        </RowItem>
                      </GridItem>
                      <GridItem
                        width={1 / 2}
                      >
                        <RowItem
                          title="בעלי עניין קונצרני"
                        >
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

export default mtf;
