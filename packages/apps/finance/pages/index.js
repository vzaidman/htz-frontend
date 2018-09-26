// @flow
import React from 'react';
import { LayoutContainer, LayoutRow, Grid, GridItem, } from '@haaretz/htz-components';
import type { Node, } from 'react';
import { FelaTheme, } from 'react-fela';

import MainLayout from '../layouts/MainLayout';
import TableGraphConnector from '../components/TableGraphConnector/TableGraphConnector';
import MarketSummary from '../components/MarketSummary/MarketSummary';
import PageRow from '../components/PageRow/PageRow';
import RowItem from '../components/RowItem/RowItem';
import SortableTable from '../components/SortableTable/SortableTable';
import TabbedGraph from '../components/TabbedGraph/TabbedGraph';

type Props = {
  url: string,
};

function index({ url, }: Props): Node {
  return (
    <MainLayout path={url}>
      <LayoutRow bgc="transparent">
        <FelaTheme
          render={theme => (
            <LayoutContainer bgc="transparent">
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
                      title="מניות תל אביב"
                    >
                      <SortableTable
                        parentId="142"
                        type="bond"
                        linkText="לבורסת תל אביב"
                        fields={[
                          { name: 'name', sortingOrder: 'ascend', },
                          { name: 'value', sortingOrder: 'descend', },
                          { name: 'changePercentage', sortingOrder: 'descend', },
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
                        type="bond"
                        linkText="לבורסת וול סטריט"
                        fields={[
                          { name: 'name', sortingOrder: 'ascend', },
                          { name: 'value', sortingOrder: 'descend', },
                          { name: 'changePercentage', sortingOrder: 'descend', },
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
                        type="stock"
                        linkText="לרשימה המלאה"
                        fields={[
                          { name: 'name', sortingOrder: 'ascend', },
                          { name: 'symbol', sortingOrder: 'ascend', },
                          { name: 'arbGap', sortingOrder: 'descend', },
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
                        fields={[
                          { name: 'name', sortingOrder: 'ascend', },
                          { name: 'value', sortingOrder: 'descend', },
                          { name: 'changePercentage', sortingOrder: 'descend', },
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
                        fields={[
                          { name: 'name', sortingOrder: 'ascend', },
                          { name: 'symbol', sortingOrder: 'ascend', },
                          { name: 'arbGap', sortingOrder: 'descend', },
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
                        type="fund"
                        linkText="לקרנות נאמנות"
                        fields={[
                          { name: 'name', sortingOrder: 'ascend', },
                          { name: 'value', sortingOrder: 'descend', },
                          { name: 'changePercentage', sortingOrder: 'descend', },
                        ]}
                        initialSort="value"
                      />
                    </RowItem>
                  </GridItem>
                </Grid>
              </PageRow>
            </LayoutContainer>
          )}
        />
      </LayoutRow>
    </MainLayout>
  );
}

export default index;
