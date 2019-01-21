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

type ButtheadPropsType = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

Butthead.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};


function Butthead({
  list,
  lazyLoadImages,
  biAction,
  gaAction,
}: ButtheadPropsType): Node {
  const { title, dfp, } = list;
  return (
    <ListView
      padding={[ 0, 4, ]}
      miscStyles={{
        display: [ { until: 'l', value: 'none', }, ],
      }}
    >
      {/* Header */}
      <GridItem
        width={1}
      >
        <ListViewHeader title={title} isHorizontal isCommercial />
      </GridItem>

      {/* Items */}
      {
        dfp
          ? (
            <GridItem
              width={1}
            >
              <Grid gutter={2}>
                {
                  dfp[0]
                    ? (
                      <GridItem
                        width={1 / 2}
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
                        width={1 / 2}
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

export default Butthead;
