// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { Query, } from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { Asset, } from '../../types/asset';

import MainLayout from '../../layouts/MainLayout';
import RowItem from '../../components/RowItem/RowItem';
import PageRow from '../../components/PageRow/PageRow';
import SortableTable from '../../components/SortableTable/SortableTable';
import ExpirationBenchmarkFilter from '../../components/ExpirationBenchmarkFilter/ExpirationBenchmarkFilter';

const OptionsAssetsQuery: DocumentNode = gql`
  query OptionsAssets {
    assetsList {
      id
      name
      expirationBenchmarkDates
    }
  }
`;

type Props = {
  url: {
    pathname: string,
    query: {
      section: string,
    },
    asPath: string,
  },
};

const numToString: number => string = num => num.toLocaleString('he', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function options({
  url: {
    query: { section, },
    asPath,
  },
}: Props): Node {
  return (
    <MainLayout
      section={section}
      title="אופציות - TheMarker Finance"
      description="כל המידע על  אופציות נתוני מסחר, נתונים בזמן אמת, גרפים חדשות ועוד באתר TheMarker Finance"
      path={asPath}
    >
      <FelaTheme
        render={theme => (
          <PageRow>
            <RowItem title="אופציות מעו״ף">
              <Query query={OptionsAssetsQuery}>
                {({ loading, error, data, }) => {
                  if (loading) return null;
                  if (error) return null;
                  const assets: Array<Asset> = data.assetsList;
                  return (
                    <ExpirationBenchmarkFilter assets={assets}>
                      {({
                        assetId,
                        expirationDate,
                      }) => (
                        <SortableTable
                          miscStyles={{
                            marginTop: '7rem',
                            tableLayout: 'auto',
                          }}
                          parentId={assetId}
                          expirationBenchmarkDate={expirationDate}
                          loadMore
                          type="options"
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
                                color:
                                  changePercentage < 0
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
                                color:
                                  openPositionsChangeRate < 0
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
                                ${numToString(
                                Math.abs(openPositionsChangeRate)
                              )}%
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
                    </ExpirationBenchmarkFilter>
                  );
                }}
              </Query>
            </RowItem>
          </PageRow>
        )}
      />
    </MainLayout>
  );
}

export default options;
