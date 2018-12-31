// @flow
import * as React from 'react';

import ListView from '../../../ListView/ListView.js';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import MousepadTeaser from './MousepadTeaser';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

type Props = {
  list: ListDataType,
  lazyLoadImages: boolean,
  gaAction: () => void,
  biAction: ListBiActionType,
};

export default function Mousepad({ list, gaAction, biAction, lazyLoadImages, }: Props): React.Node {
  const listMiddle = list.items.length / 2;

  return (
    <ListView disableWrapper innerBackgroundColor="white" marginTop={0}>
      <GridItem width={1}>
        <Grid
          gutter={{
            queries: [
              { from: 's', until: 'l', value: 5, },
              { from: 'l', until: 'xl', value: 8, },
              { from: 'xl', value: 5, },
            ],
          }}
        >
          {list.items.map((item, index) => {
            const count = index + 1;
            const order = index < listMiddle ? 1 + index * 2 : 2 + (index - listMiddle) * 2;

            return (
              <GridItem
                key={item.contentId}
                width={[ { until: 's', value: 1, }, { from: 's', value: 1 / 2, }, ]}
                miscStyles={{
                  order: [
                    {
                      from: 's',
                      value: order,
                    },
                  ],
                }}
              >
                <MousepadTeaser itemData={item} index={count} biAction={biAction} />
              </GridItem>
            );
          })}
        </Grid>
      </GridItem>
    </ListView>
  );
}
