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
import SortableTable from '../../components/SortableTable/SortableTable';

const indexQuery: DocumentNode = gql`
  query indexData($assetId: String!){
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

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

function indices({ url: { query: { section, assetId, }, asPath, }, }: Props): Node {
  return (
    <Query
      query={indexQuery}
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
            title={`${name} -מידע על מניות, בורסה ושוק ההון - TheMarker Finance`}
            description={`כל המידע על ${name} נתוני מסחר, נתונים בזמן אמת, גרפים חדשות ועוד באתר TheMarker Finance`}
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
                            { name: 'dailyHigh', display: 'נמוך יומי', },
                            { name: 'dailyLow', display: 'גבוה יומי', },
                            { name: 'standardDeviation', display: 'סטיית תקן', },
                            { name: 'peRatio', display: 'מכפיל רווח', },
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
                    title="הרכב המדד"
                  >
                    <SortableTable
                      extractData={data => data.assetsList[0].assetComponents}
                      miscStyles={{ tableLayout: 'fixed', }}
                      parentId={assetId}
                      loadMore
                      type="indices"
                      fragment={`
                        assetComponents {
                          id
                          type
                          name
                          value
                          changePercentage
                          volume
                          dailyHigh
                          dailyLow
                        }
                      `}
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          value: ({ name, }) => name,
                        },
                        {
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'descend',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'descend',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                              ${changePercentage > 0 ? '+' : '-'}
                              ${numToString(Math.abs(changePercentage))}%
                             `,
                        },
                        {
                          name: 'volume',
                          display: 'מחזור (א׳ ש״ח)',
                          sortingOrder: 'descend',
                          value: ({ volume, }) => numToString(volume),
                        },
                        {
                          name: 'dailyHigh',
                          display: 'גבוה יומי',
                          sortingOrder: 'descend',
                          value: ({ dailyHigh, }) => numToString(dailyHigh),
                        },
                        {
                          name: 'dailyLow',
                          display: 'נמוך יומי',
                          sortingOrder: 'descend',
                          value: ({ dailyLow, }) => numToString(dailyLow),
                        },
                      ]}
                      initialSort="value"
                      count={10}
                    />
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
                  <RowItem
                    title="תעודות סל המשקיעות במדד"
                  >
                    <SortableTable
                      extractData={data => data.assetsList[0].etfComponents}
                      miscStyles={{ tableLayout: 'fixed', }}
                      parentId={assetId}
                      loadMore
                      type="indices"
                      fragment={`
                        etfComponents {
                          id
                          type
                          name
                          value
                          changePercentage
                          volume
                          yearlyYield
                          issuerName
                          managementFee
                        }
                      `}
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          value: ({ name, }) => name,
                        },
                        {
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'descend',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'descend',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                              ${changePercentage > 0 ? '+' : '-'}
                              ${numToString(Math.abs(changePercentage))}%
                             `,
                        },
                        {
                          name: 'volume',
                          display: 'מחזור (א׳ ש״ח)',
                          sortingOrder: 'descend',
                          value: ({ volume, }) => numToString(volume),
                        },
                        {
                          name: 'yearlyYield',
                          display: '% תשואה שנתית',
                          sortingOrder: 'descend',
                          style: ({ yearlyYield, }) => ({
                            color: yearlyYield < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ yearlyYield, }) => `
                              ${yearlyYield > 0 ? '+' : '-'}
                              ${numToString(Math.abs(yearlyYield))}%
                             `,
                        },
                        {
                          name: 'issuerName',
                          display: 'המנפיק',
                          sortingOrder: 'descend',
                          value: ({ issuerName, }) => issuerName,
                        },
                        {
                          name: 'managementFee',
                          display: 'דמי ניהול',
                          sortingOrder: 'descend',
                          value: ({ managementFee, }) => numToString(managementFee),
                        },
                      ]}
                      initialSort="value"
                      count={5}
                    />
                  </RowItem>
                </PageRow>
                <PageRow>
                  <RowItem
                    title="קרנות נאמנות המשקיעות במדד"
                  >
                    <SortableTable
                      extractData={data => data.assetsList[0].mtfComponents}
                      miscStyles={{ tableLayout: 'fixed', }}
                      parentId={assetId}
                      loadMore
                      type="indices"
                      fragment={`
                        mtfComponents {
                          id
                          type
                          name
                          value
                          changePercentage
                          volume
                          yearlyYield
                          issuerName
                          managementFee
                        }
                      `}
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }),
                          value: ({ name, }) => name,
                        },
                        {
                          name: 'value',
                          display: 'שער אחרון',
                          sortingOrder: 'descend',
                          value: ({ value, }) => numToString(value),
                        },
                        {
                          name: 'changePercentage',
                          display: '% שינוי',
                          sortingOrder: 'descend',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ changePercentage, }) => `
                              ${changePercentage > 0 ? '+' : '-'}
                              ${numToString(Math.abs(changePercentage))}%
                             `,
                        },
                        {
                          name: 'volume',
                          display: 'מחזור (א׳ ש״ח)',
                          sortingOrder: 'descend',
                          value: ({ volume, }) => numToString(volume),
                        },
                        {
                          name: 'yearlyYield',
                          display: '% תשואה שנתית',
                          sortingOrder: 'descend',
                          style: ({ yearlyYield, }) => ({
                            color: yearlyYield < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ yearlyYield, }) => `
                              ${yearlyYield > 0 ? '+' : '-'}
                              ${numToString(Math.abs(yearlyYield))}%
                             `,
                        },
                        {
                          name: 'issuerName',
                          display: 'המנפיק',
                          sortingOrder: 'descend',
                          value: ({ issuerName, }) => issuerName,
                        },
                        {
                          name: 'managementFee',
                          display: 'דמי ניהול',
                          sortingOrder: 'descend',
                          value: ({ managementFee, }) => numToString(managementFee),
                        },
                      ]}
                      initialSort="value"
                      count={5}
                    />
                  </RowItem>
                </PageRow>
                <PageRow>
                  <RowItem>
                    <GeneralAdSlot
                      id="Finance.TheMarker.com.Banner2"
                      contentName="Finance.TheMarker.com.Banner2"
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

export default indices;
