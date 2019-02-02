// @flow
/* global fetch */
import React, { Fragment, } from 'react';
import { FelaTheme, } from 'react-fela';
import { Grid, GridItem, GeneralAdSlot, } from '@haaretz/htz-components';
import { borderBottom, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import FeedTabbedGraph from '../../components/FeedTabbedGraph/FeedTabbedGraph';
import TabbedTable from '../../components/TabbedTable/TabbedTable';
import StaticSortableTable from '../../components/StaticSortableTable/StaticSortableTable';
import FetchData from '../../components/FetchData/FetchData';

export type Asset = {
  name: string,
  change: string,
  id: string,
};

export type Assets = Array<Asset>;

type Props = {
  url: {
    pathname: string,
    query: {
      section: string,
    },
    asPath: string,
  },
};

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

function money({ url: { query: { section, }, asPath, }, }: Props): Node {
  return (
    <MainLayout
      section={section}
      title="הכסף החם - תנועות הון בבורסה – תעודות סל וקרנות נאמנות שם המותג"
      description="הכסף החם - למידע עדכני על תנועות ההון בבורסה, גיוסים ופדיונות בקרנות נאמנות ותעודות סל היכנס לאתר TheMarker Finance"
      path={asPath}
    >
      <FelaTheme
        render={theme => (
          <Fragment>
            <PageRow>
              <RowItem
                title="תנועות ההון בתעודות סל וקרנות נאמנות (ב-%)"
              >
                <FeedTabbedGraph
                  part={1}
                  side={1}
                  defaultTab={2}
                  tabs={[
                    { display: 'גיוסים חודשי', control: 'monthly-rec', period: 2, },
                    { display: 'גיוסים רבעוני', control: 'quarterly-rec', period: 7, },
                    { display: 'גיוסים שנתי', control: 'yearly-rec', period: 3, },
                  ]}
                  headers={[
                    {
                      display: 'שם אפיק',
                      value: 'name',
                      style: {
                        paddingStart: '1rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        paddingEnd: '2rem',
                        marginBottom: '1rem',
                        backgroundColor: theme.color('neutral', '-6'),
                      },
                    },
                    {
                      display: '% שינוי',
                      percentage: true,
                      value: 'change',
                      style: {
                        paddingEnd: '5rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        marginBottom: '1rem',
                        backgroundColor: theme.color('neutral', '-6'),
                      },
                    },
                  ]}
                />
              </RowItem>
            </PageRow>
            <PageRow miscStyles={{ marginBottom: '0', }}>
              <FeedTabbedGraph
                part={1}
                side={2}
                defaultTab={2}
                tabs={[
                  { display: 'פדיונות חודשי', control: 'monthly-div', period: 2, },
                  { display: 'פדיונות רבעוני', control: 'quarterly-div', period: 7, },
                  { display: 'פדיונות שנתי', control: 'yearly-div', period: 3, },
                ]}
                headers={[
                  {
                    display: 'שם אפיק',
                    value: 'name',
                    style: {
                      paddingStart: '1rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      paddingEnd: '2rem',
                      marginBottom: '1rem',
                      backgroundColor: theme.color('neutral', '-6'),
                    },
                  },
                  {
                    display: '% שינוי',
                    percentage: true,
                    value: 'change',
                    style: {
                      paddingEnd: '5rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      marginBottom: '1rem',
                      backgroundColor: theme.color('neutral', '-6'),
                    },
                  },
                ]}
              />
            </PageRow>
            <PageRow
              miscStyles={{
                paddingTop: '4rem',
                paddingBottom: '4rem',
                backgroundColor: theme.color('neutral', '-10'),
              }}
            >
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
                title="תנועות ההון בתעודות סל וקרנות נאמנות (ב-₪)"
              >
                <FeedTabbedGraph
                  part={2}
                  side={1}
                  defaultTab={2}
                  tabs={[
                    { display: 'גיוסים חודשי', control: 'monthly-rec', period: 2, },
                    { display: 'גיוסים רבעוני', control: 'quarterly-rec', period: 7, },
                    { display: 'גיוסים שנתי', control: 'yearly-rec', period: 3, },
                  ]}
                  headers={[
                    {
                      display: 'שם אפיק',
                      value: 'name',
                      style: {
                        paddingStart: '1rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        paddingEnd: '2rem',
                        marginBottom: '1rem',
                        backgroundColor: theme.color('neutral', '-6'),
                      },
                    },
                    {
                      display: 'שינוי במיל\' (ש"ח)',
                      value: 'change',
                      style: {
                        paddingEnd: '5rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        marginBottom: '1rem',
                        backgroundColor: theme.color('neutral', '-6'),
                      },
                    },
                  ]}
                />
              </RowItem>
            </PageRow>
            <PageRow miscStyles={{ marginBottom: '0', }}>
              <FeedTabbedGraph
                part={2}
                side={2}
                defaultTab={2}
                tabs={[
                  { display: 'פדיונות חודשי', control: 'monthly-div', period: 2, },
                  { display: 'פדיונות רבעוני', control: 'quarterly-div', period: 7, },
                  { display: 'פדיונות שנתי', control: 'yearly-div', period: 3, },
                ]}
                headers={[
                  {
                    display: 'שם אפיק',
                    value: 'name',
                    style: {
                      paddingStart: '1rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      paddingEnd: '2rem',
                      marginBottom: '1rem',
                      backgroundColor: theme.color('neutral', '-6'),
                    },
                  },
                  {
                    display: 'שינוי במיל\' (ש"ח)',
                    value: 'change',
                    style: {
                      paddingEnd: '5rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      marginBottom: '1rem',
                      backgroundColor: theme.color('neutral', '-6'),
                    },
                  },
                ]}
              />
            </PageRow>
            <PageRow
              miscStyles={{
                paddingTop: '4rem',
                paddingBottom: '4rem',
                backgroundColor: theme.color('neutral', '-10'),
              }}
            >
              <RowItem>
                <GeneralAdSlot
                  id="Finance.TheMarker.com.Banner2"
                  contentName="Finance.TheMarker.com.Banner2"
                  audianceTarget="all"
                />
              </RowItem>
            </PageRow>
            <PageRow>
              <Grid gutter={2}>
                <GridItem width={3 / 5}>
                  <RowItem
                    title="ביצועי קרנות הנאמנות מול המדדים"
                  >
                    <TabbedTable
                      defaultTab={2}
                      presentation
                      tabs={[
                        { control: 'month', tabData: 2, display: 'חודשי', },
                        { control: 'quarter', tabData: 7, display: 'רבעוני', },
                        { control: 'year', tabData: 3, display: 'שנתי', },
                      ]}
                      panel={({ selectedTab, }) => (
                        <FetchData
                          url={`https://apifinance.themarker.com/TheMarkerApi/HotMoneyBottom?part=1&period=${selectedTab}`}
                          method="GET"
                          render={(data: any) => (
                            <StaticSortableTable
                              headerMiscStyles={{
                                backgroundColor: theme.color('neutral', '-10'),
                                paddingTop: '1rem',
                                paddingBottom: '1rem',
                                ...borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
                              }}
                              initialSort="indexYield"
                              data={
                                data.table.dataSource.map((asset: {
                                  name: string,
                                  indexYield: string,
                                  mtfBeat: string,
                                  mtfYield: string,
                                  id: string,
                                }) => ({
                                  name: asset[0],
                                  indexYield: asset[1],
                                  mtfBeat: asset[2],
                                  mtfYield: asset[3],
                                  id: asset[4],
                                }))
                              }
                              fields={[
                                {
                                  name: 'name',
                                  display: 'מדד',
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
                                  name: 'indexYield',
                                  display: '% תשואות המדד',
                                  sortingOrder: 'descend',
                                  style: ({ indexYield, }) => ({
                                    color: indexYield < 0
                                      ? theme.color('negative')
                                      : theme.color('positive'),
                                    direction: 'ltr',
                                    fontWeight: '700',
                                    paddingEnd: '2rem',
                                    position: 'relative',
                                    textAlign: 'start',
                                  }),
                                  value: ({ indexYield, }) => `
                                        ${indexYield > 0 ? '+' : '-'}
                                        ${numToString(Math.abs(indexYield))}%
                                      `,
                                },
                                {
                                  name: 'mtfBeat',
                                  display: 'קרנות שהיכו',
                                  sortingOrder: 'descend',
                                  value: ({ mtfBeat, }) => mtfBeat,
                                },
                                {
                                  name: 'mtfYield',
                                  display: '% תשואה הקרנות',
                                  sortingOrder: 'descend',
                                  style: ({ mtfYield, }) => ({
                                    color: mtfYield < 0
                                      ? theme.color('negative')
                                      : theme.color('positive'),
                                    direction: 'ltr',
                                    fontWeight: '700',
                                    paddingEnd: '2rem',
                                    position: 'relative',
                                    textAlign: 'start',
                                  }),
                                  value: ({ mtfYield, }) => `
                                        ${mtfYield > 0 ? '+' : '-'}
                                        ${numToString(Math.abs(mtfYield))}%
                                      `,
                                },
                              ]}
                            />
                          )}
                        />

                      )}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={2 / 5}>
                  <GeneralAdSlot
                    id="Finance.TheMarker.com.Banner3"
                    contentName="Finance.TheMarker.com.Banner3"
                    audianceTarget="all"
                  />
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid gutter={2}>
                <GridItem width={3 / 5}>
                  <RowItem
                    title="טעויות עקיבה בקרנות מחקות"
                  />
                </GridItem>
                <GridItem width={2 / 5}>
                  <GeneralAdSlot
                    id="Finance.TheMarker.com.HalfPage"
                    contentName="Finance.TheMarker.com.HalfPage"
                    audianceTarget="all"
                  />
                </GridItem>
              </Grid>
            </PageRow>
          </Fragment>
        )}
      />
    </MainLayout>
  );
}

export default money;
