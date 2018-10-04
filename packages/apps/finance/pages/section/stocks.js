// @flow
import React, { Fragment, } from 'react';
import { Grid, GridItem, } from '@haaretz/htz-components';
import { FelaTheme, } from 'react-fela';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import MarketSummary from '../../components/MarketSummary/MarketSummary';
import RowItem from '../../components/RowItem/RowItem';
import TableGraphConnector from '../../components/TableGraphConnector/TableGraphConnector';
import SortableTable from '../../components/SortableTable/SortableTable';

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

function stocks(): Node {
  return (
    <MainLayout>
      <FelaTheme
        render={theme => (
          <Fragment>
            <PageRow>
              <MarketSummary marketId="3" miscStyles={{ flexGrow: '1', }} />
            </PageRow>
            <PageRow>
              <RowItem
                title="מבט לשווקים"
              >
                <TableGraphConnector />
              </RowItem>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות העולות - תל אביב"
                  >
                    <SortableTable
                      parentId="142"
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                            color: changePercentage < 0 ? 'red' : 'green',
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
                      ]}
                      initialSort="changePercentage"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות העולות - נאסד״ק"
                  >
                    <SortableTable
                      parentId="136"
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                            color: changePercentage < 0 ? 'red' : 'green',
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
                      ]}
                      initialSort="changePercentage"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות היורדות - תל אביב"
                  >
                    <SortableTable
                      parentId="142"
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                          sortingOrder: 'ascend',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0 ? 'red' : 'green',
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
                      ]}
                      initialSort="changePercentage"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות היורדות - נאסד״ק"
                  >
                    <SortableTable
                      parentId="136"
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                          sortingOrder: 'ascend',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0 ? 'red' : 'green',
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
                      ]}
                      initialSort="changePercentage"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות הפעילות - תל אביב"
                  >
                    <SortableTable
                      parentId="142"
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                          name: 'volume',
                          display: 'מחזור',
                          sortingOrder: 'descend',
                          style: (volume: number) => ({
                            color: volume < 0 ? 'red' : 'green',
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ value, }) => numToString(value),
                        },
                      ]}
                      initialSort="volume"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות הפעילות - נאסד״ק"
                  >
                    <SortableTable
                      parentId="136"
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                          name: 'volume',
                          display: 'מחזור',
                          sortingOrder: 'descend',
                          style: (volume: number) => ({
                            color: volume < 0 ? 'red' : 'green',
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ value, }) => numToString(value),
                        },
                      ]}
                      initialSort="volume"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות הנצפות באתר - תל אביב"
                  >
                    <SortableTable
                      parentId="142"
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                          sortingOrder: 'ascend',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0 ? 'red' : 'green',
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
                      ]}
                      initialSort="value"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="המניות הנצפות באתר - נאסד״ק"
                  >
                    <SortableTable
                      parentId="136"
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                          sortingOrder: 'ascend',
                          style: ({ changePercentage, }) => ({
                            color: changePercentage < 0 ? 'red' : 'green',
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
                      ]}
                      initialSort="value"
                      count={9}
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid gutter={6}>
                <GridItem width={4 / 5}>
                  <RowItem
                    title="פערי ארביטראז׳"
                  >
                    <SortableTable
                      parentId="-2000"
                      pagination
                      type="stocks"
                      fields={[
                        {
                          name: 'name',
                          display: 'שם נייר',
                          sortingOrder: 'ascend',
                          style: () => ({
                            fontWeight: '700',
                            maxWidth: '17rem',
                            overflow: 'hidden',
                            paddingStart: '2rem',
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
                          name: 'symbol',
                          display: 'סימול בוול סטריט',
                          sortingOrder: 'ascend',
                          value: ({ symbol, }) => symbol,
                        },
                        {
                          name: 'USDValue',
                          display: 'שער בדולרים',
                          sortingOrder: 'descend',
                          value: ({ USDValue, }) => numToString(USDValue),
                        },
                        {
                          name: 'arbGap',
                          display: '% פער',
                          sortingOrder: 'descend',
                          style: ({ arbGap, }) => ({
                            color: arbGap < 0 ? 'red' : 'green',
                            direction: 'ltr',
                            fontWeight: '700',
                            paddingEnd: '2rem',
                            position: 'relative',
                            textAlign: 'start',
                          }),
                          value: ({ arbGap, }) => `
                            ${arbGap > 0 ? '+' : '-'}
                            ${numToString(Math.abs(arbGap))}%
                          `,
                        },
                      ]}
                      initialSort="name"
                      count={13}
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 5} />
              </Grid>
            </PageRow>
          </Fragment>
        )}
      />
    </MainLayout>
  );
}

export default stocks;
