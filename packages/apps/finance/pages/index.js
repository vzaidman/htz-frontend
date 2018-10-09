// @flow
import React, { Fragment, } from 'react';
import { Grid, GridItem, } from '@haaretz/htz-components';
import type { Node, } from 'react';
import { FelaTheme, } from 'react-fela';

import MainLayout from '../layouts/MainLayout';
import TableGraphConnector from '../components/TableGraphConnector/TableGraphConnector';
import PageRow from '../components/PageRow/PageRow';
import RowItem from '../components/RowItem/RowItem';
import SortableTable from '../components/SortableTable/SortableTable';
import TabbedGraph from '../components/TabbedGraph/TabbedGraph';

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

function index(): Node {
  return (
    <MainLayout>
      <FelaTheme
        render={theme => (
          <Fragment>
            <PageRow>
              <RowItem
                title="מבט לשווקים"
              >
                <TableGraphConnector
                  assetsId={[ '2', '142', '137', '-2000', '164', '143', '167', '145', '149', ]}
                />
              </RowItem>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="מניות תל אביב"
                  >
                    <SortableTable
                      parentId="142"
                      type="bonds"
                      linkText="לבורסת תל אביב"
                      addLink
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
                      ]}
                      initialSort="value"
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
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
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="מניות בנסדא״ק"
                  >
                    <SortableTable
                      parentId="136"
                      type="bonds"
                      linkText="לבורסת וול סטריט"
                      addLink
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
                      ]}
                      initialSort="value"
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="מניות ארביטראז׳"
                  >
                    <SortableTable
                      parentId="-2000"
                      type="stocks"
                      linkText="לרשימה המלאה"
                      addLink
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
                          name: 'symbol',
                          display: 'סימול בוול סטריט',
                          sortingOrder: 'ascend',
                          value: ({ symbol, }) => symbol,
                        },
                        {
                          name: 'arbGap',
                          display: '% פער',
                          sortingOrder: 'descend',
                          style: ({ arbGap, }) => ({
                            color: arbGap < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
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
                      initialSort="arbGap"
                    />
                  </RowItem>
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="מט״ח"
                  >
                    <SortableTable
                      assetsId={[ '0', '1', '2', '3', '4', ]}
                      type="currency"
                      linkText="למדור מטבעות דיגיטליים"
                      addLink
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
                      ]}
                      initialSort="value"
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="קשרי משקיעים"
                    miscStyles={{
                      ...theme.type(0),
                    }}
                  />
                </GridItem>
              </Grid>
            </PageRow>
            <PageRow>
              <RowItem
                title="מבט לשווקים"
              >
                <TabbedGraph />
              </RowItem>
            </PageRow>
            <PageRow>
              <Grid>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="תעודות סל"
                  >
                    <SortableTable
                      parentId="2"
                      type="etf"
                      linkText="לתעודות סל"
                      addLink
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
                          name: 'symbol',
                          display: 'סימול בוול סטריט',
                          sortingOrder: 'ascend',
                          value: ({ symbol, }) => symbol,
                        },
                        {
                          name: 'arbGap',
                          display: '% פער',
                          sortingOrder: 'descend',
                          style: ({ arbGap, }) => ({
                            color: arbGap < 0
                              ? theme.color('negative')
                              : theme.color('positive'),
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
                      initialSort="arbGap"
                    />
                  </RowItem>
                </GridItem>
                <GridItem width={1 / 2}>
                  <RowItem
                    title="קרנות נאמנות"
                  >
                    <SortableTable
                      parentId="35"
                      type="mtf"
                      linkText="לקרנות נאמנות"
                      addLink
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
                      ]}
                      initialSort="value"
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
}

export default index;
