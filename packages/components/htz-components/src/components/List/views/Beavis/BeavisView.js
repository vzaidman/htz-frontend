// @flow
import React from 'react';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';

type BeavisPropsType = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

Beavis.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};


function Beavis({
  list,
  lazyLoadImages,
  biAction,
  gaAction,
}: BeavisPropsType): Node {
  const { title, dfp, } = list;
  console.log(dfp);
  return (
    <ListView
      gutter={4}
    >
      {/* Header */}
      <GridItem
        width={
          [
            { until: 'l', value: 1, },
            { from: 'l', value: 2 / 12, },
          ]
        }
      >
        <ListViewHeader title={title} isCommercial />
      </GridItem>

      {/* Items */}
      {
        dfp
          ? (
            <GridItem
              width={
                [
                  { until: 'l', value: 1, },
                  { from: 'l', value: 10 / 12, },
                ]
              }
            >
              <Grid gutter={2}>
                {
                  dfp[0]
                    ? (
                      <GridItem
                        width={
                          [
                            { until: 'l', value: 1, },
                            { from: 'l', until: 'xl', value: 5 / 10, },
                            { from: 'xl', value: 6 / 10, },
                          ]
                        }
                      >
                        <GeneralAdSlot {...dfp[0]} />
                      </GridItem>
                    )
                    : null
                }
                {
                  dfp[1]
                    ? (
                      <GridItem
                        width={
                          [
                            { until: 'l', value: 1, },
                            { from: 'l', until: 'xl', value: 5 / 10, },
                            { from: 'xl', value: 4 / 10, },
                          ]
                        }
                      >
                        <GeneralAdSlot {...dfp[1]} />
                      </GridItem>
                    )
                    : null
                }
              </Grid>
            </GridItem>
          )
          : null
      }
    </ListView>
  );
}

export default Beavis;
