// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import SortableTable from '../../components/SortableTable/SortableTable';

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

function indices({ url: { query: { section, }, asPath, }, }: Props): Node {
  return (
    <MainLayout
      section={section}
      title="מדדי מניות - TheMarker Finance"
      description="כל המידע על  מדדים: נתוני מסחר, נתונים בזמן אמת, גרפים חדשות ועוד באתר TheMarker Finance"
      path={asPath}
    >
      <FelaTheme
        render={theme => (
          <PageRow>
            <RowItem
              title="מדדים"
            >
              <SortableTable
                assetsId={[ '2', '142', '137', '-2000', '164', '143', '167', '145', '149', ]}
                miscStyles={{ marginTop: '2rem', tableLayout: 'auto', }}
                type="indices"
                fragment="
                  name
                  value
                  changePercentage
                  weeklyYield
                  monthlyYield
                  quarterlyYield
                  yearlyYield
                  threeYearsYield
                "
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
                    display: '%שינוי',
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
                    name: 'weeklyYield',
                    display: 'תשואה שבועית',
                    sortingOrder: 'descend',
                    style: ({ weeklyYield, }) => ({
                      color: weeklyYield < 0
                        ? theme.color('negative')
                        : theme.color('positive'),
                      direction: 'ltr',
                      fontWeight: '700',
                      paddingEnd: '2rem',
                      position: 'relative',
                      textAlign: 'start',
                    }),
                    value: ({ weeklyYield, }) => `
                      ${weeklyYield > 0 ? '+' : '-'}
                      ${numToString(Math.abs(weeklyYield))}%
                     `,
                  },
                  {
                    name: 'monthlyYield',
                    display: 'תשואה חודשית',
                    sortingOrder: 'descend',
                    style: ({ monthlyYield, }) => ({
                      color: monthlyYield < 0
                        ? theme.color('negative')
                        : theme.color('positive'),
                      direction: 'ltr',
                      fontWeight: '700',
                      paddingEnd: '2rem',
                      position: 'relative',
                      textAlign: 'start',
                    }),
                    value: ({ monthlyYield, }) => `
                      ${monthlyYield > 0 ? '+' : '-'}
                      ${numToString(Math.abs(monthlyYield))}%
                     `,
                  },
                  {
                    name: 'quarterlyYield',
                    display: 'תשואה רבעונית',
                    sortingOrder: 'descend',
                    style: ({ quarterlyYield, }) => ({
                      color: quarterlyYield < 0
                        ? theme.color('negative')
                        : theme.color('positive'),
                      direction: 'ltr',
                      fontWeight: '700',
                      paddingEnd: '2rem',
                      position: 'relative',
                      textAlign: 'start',
                    }),
                    value: ({ quarterlyYield, }) => `
                      ${quarterlyYield > 0 ? '+' : '-'}
                      ${numToString(Math.abs(quarterlyYield))}%
                     `,
                  },
                  {
                    name: 'yearlyYield',
                    display: 'תשואה שנתית',
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
                    name: 'threeYearsYield',
                    display: 'תשואה 3 שנים',
                    sortingOrder: 'descend',
                    style: ({ threeYearsYield, }) => ({
                      color: threeYearsYield < 0
                        ? theme.color('negative')
                        : theme.color('positive'),
                      direction: 'ltr',
                      fontWeight: '700',
                      paddingEnd: '2rem',
                      position: 'relative',
                      textAlign: 'start',
                    }),
                    value: ({ threeYearsYield, }) => `
                      ${threeYearsYield > 0 ? '+' : '-'}
                      ${numToString(Math.abs(threeYearsYield))}%
                     `,
                  },

                ]}
                initialSort="name"
                count={11}
              />
            </RowItem>
          </PageRow>
        )}
      />
    </MainLayout>
  );
}

export default indices;
