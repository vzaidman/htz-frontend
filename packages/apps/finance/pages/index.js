// @flow
import React from 'react';
import { LayoutContainer, LayoutRow, Grid, GridItem, } from '@haaretz/htz-components';
import type { Node, } from 'react';

import MainLayout from '../layouts/MainLayout';
import TableGraphConnector from '../components/TableGraphConnector/TableGraphConnector';
import MarketSummary from '../components/MarketSummary/MarketSummary';
import PageRow from '../components/PageRow/PageRow';
import RowItem from '../components/RowItem/RowItem';
import SortableTable from '../components/SortableTable/SortableTable';

type Props = {
  url: string,
};

function index({ url, }: Props): Node {
  return (
    <MainLayout path={url}>
      <LayoutRow bgc="transparent">
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
                    fields={[
                      'name',
                      'value',
                      'changePercentage',
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
                    fields={[
                      'name',
                      'symbol',
                      'arbGap',
                    ]}
                    initialSort="arbGap"
                  />
                </RowItem>
              </GridItem>
            </Grid>
          </PageRow>
        </LayoutContainer>
      </LayoutRow>
    </MainLayout>
  );
}

export default index;
