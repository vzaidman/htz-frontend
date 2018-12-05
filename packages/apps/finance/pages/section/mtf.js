// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { Query, } from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { Asset, } from '../../types/asset';


import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import SortableTable from '../../components/SortableTable/SortableTable';
import AssetsFilter from '../../components/AssetsFilter/AssetsFilter';

type Props = {
  url: {
    pathname: string,
    query: {
      section: string,
    },
  },
};

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

function mtf({ url: { query: { section, }, }, }: Props): Node {
  return (
    <MainLayout section={section}>
      <FelaTheme
        render={theme => (
          <PageRow>
            <RowItem
              title="קרנות נאמנות"
            >
              <AssetsFilter
                filters={{
                  title: 'a',
                  value: 'mtfCatgory',
                  fields: [
                    {
                      display: 'ענף',
                      value: {
                        queryString: 'branchExposure',
                        subFilters: {
                          title: 'b',
                          value: 'mtfcatgoryExposure',
                          fields: [
                            { display: 'עד 10% מניות',
                              value: {
                                queryString: 'branchExposure',
                                subFilters: {
                                  title: 'b',
                                  value: 'mtfcatgoryExposure2',
                                  fields: [
                                    { display: 'עד 10000% מניות', value: { queryString: 10, }, },
                                    { display: 'עד 20% מניות', value: { queryString: 20, }, },
                                    { display: 'עד 30% מניות', value: { queryString: 30, }, },
                                    { display: 'הכל', value: { queryString: Infinity, }, },
                                  ],
                                },
                              }, },
                            { display: 'עד 20% מניות', value: { queryString: 20, }, },
                            { display: 'עד 30% מניות', value: { queryString: 30, }, },
                            { display: 'הכל', value: { queryString: Infinity, }, },
                          ],
                        },
                      },
                    },
                    { display: 'חשיפה למניות', value: { queryString: 'stocksExposure', }, },
                    { display: 'חשיפה למטבע', value: { queryString: 'currencyExposure', }, },
                    { display: 'מנהל', value: { queryString: 'managerExposure', }, },
                    { display: 'נכסים', value: { queryString: 'holdingExposure', }, },
                  ],
                }}
              >
                {({ filters, }) => (
                  <SortableTable
                    miscStyles={{ marginTop: '7rem', tableLayout: 'auto', }}
                    loadMore
                    type="mtf"
                    fragment="
                      name
                      value
                      changePercentage
                      volume
                      openPositions
                      openPositionsChangeRate
                      assetNumber
                      putCallRatio
                    "
                    fields={[
                      {
                        name: 'name',
                        display: 'שם אופציה',
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
                        display: 'שער',
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
                        name: 'openPositions',
                        display: 'פוזיציות פתוחות',
                        sortingOrder: 'descend',
                        value: ({ openPositions, }) => numToString(openPositions),
                      },
                      {
                        name: 'openPositionsChangeRate',
                        display: 'שינוי\nפוזיציות פתוחות',
                        sortingOrder: 'descend',
                        style: ({ openPositionsChangeRate, }) => ({
                          color: openPositionsChangeRate < 0
                            ? theme.color('negative')
                            : theme.color('positive'),
                          direction: 'ltr',
                          fontWeight: '700',
                          paddingEnd: '2rem',
                          position: 'relative',
                          textAlign: 'start',
                        }),
                        value: ({ openPositionsChangeRate, }) => `
                                ${openPositionsChangeRate > 0 ? '+' : '-'}
                                ${numToString(Math.abs(openPositionsChangeRate))}%
                              `,
                      },
                      {
                        name: 'assetNumber',
                        display: 'מס׳ ני״ע',
                        sortingOrder: 'descend',
                        value: ({ assetNumber, }) => assetNumber,
                      },
                      {
                        name: 'putCallRatio',
                        display: 'יחס P/C',
                        sortingOrder: 'descend',
                        value: ({ putCallRatio, }) => numToString(putCallRatio),
                      },
                    ]}
                    initialSort="name"
                    count={11}
                  />
                )}
              </AssetsFilter>
            </RowItem>
          </PageRow>
        )}
      />
    </MainLayout>
  );
}

export default mtf;
