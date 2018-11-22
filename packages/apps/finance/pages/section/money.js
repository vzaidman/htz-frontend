// @flow
import React, { Fragment, } from 'react';
import { FelaTheme, } from 'react-fela';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import RowItem from '../../components/RowItem/RowItem';
import FeedTabbedGraph from '../../components/FeedTabbedGraph/FeedTabbedGraph';

type Props = {
  url: {
    pathname: string,
    query: {
      section: string,
    },
  },
};

function money({ url: { query: { section, }, }, }: Props): Node {
  return (
    <MainLayout section={section}>
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
            <PageRow>
              <FeedTabbedGraph
                part={1}
                side={2}
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
            <PageRow>
              <RowItem
                title="תנועות ההון בתעודות סל וקרנות נאמנות (ב-₪)"
              >
                <FeedTabbedGraph
                  part={2}
                  side={1}
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
            <PageRow>
              <FeedTabbedGraph
                part={2}
                side={2}
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
          </Fragment>
        )}
      />
    </MainLayout>
  );
}

export default money;
