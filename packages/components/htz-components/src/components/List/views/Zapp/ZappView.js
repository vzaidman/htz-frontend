// @flow
import * as React from 'react';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import ZappItem from './ZappItem';
import ZappPromotedContent from './ZappPromotedContent';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

const width = [ { until: 'l', value: 1, }, { from: 'l', value: 1 / 4, }, ];

type ZappPropTypes = {
  list: ListDataType,
  lazyLoadImages: boolean,
  gaAction: () => void,
  biAction: ListBiActionType,
};

Zapp.defaultProps = {
  lazyLoadImages: false,
};

function Zapp({
  list,
  lazyLoadImages,
  gaAction,
  biAction,
}: ZappPropTypes): React.Node {
  // marginTop={[ { until: 's', value: 1, }, { from: 's', value: 4, }, ]}
  return (
    <ListView
      gutter={4}
      innerBackgroundColor={[
        { until: 's', value: 'transparent', },
        { from: 's', value: 'white', },
      ]}
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, 4, ], }, ]}
      marginTop={[ { until: 's', value: 1, }, { from: 's', value: 0, }, ]}
      rowSpacing={[
        { until: 's', value: { amount: 1, }, },
        { from: 's', until: 'l', value: { amount: 4, }, },
      ]}
    >
      {list.items.length > 0
        ? (
          <GridItem width={width}>
            <ZappItem
              data={list.items[0]}
              lazyLoadImages={lazyLoadImages}
              index={0}
              biAction={biAction}
            />
          </GridItem>
        )
        : null
      }
      <GridItem
        width={width}
        miscStyles={{
          display: [ { from: 's', value: 'none', }, ],
        }}
      >
        {
          list.clickTrackers
            ? (
              <ZappPromotedContent
                data={list.clickTrackers[0]}
                lazyLoadImages={lazyLoadImages}
                index={1}
                biAction={biAction}
              />
            )
            : null
        }
      </GridItem>
      {list.items.length > 1
        ? (
          <GridItem width={width}>
            <ZappItem
              data={list.items[1]}
              lazyLoadImages={lazyLoadImages}
              index={2}
              biAction={biAction}
            />
          </GridItem>
        )
        : null
      }
      {list.items.length > 2
        ? (
          <GridItem width={width}>
            <ZappItem
              data={list.items[2]}
              lazyLoadImages={lazyLoadImages}
              index={3}
              biAction={biAction}
            />
          </GridItem>
        )
        : null
      }
      {list.items.length > 3
        ? (
          <GridItem width={width}>
            <ZappItem
              data={list.items[3]}
              lazyLoadImages={lazyLoadImages}
              hideImageOnMobile
              index={4}
              biAction={biAction}
            />
          </GridItem>
        )
        : null
      }
    </ListView>
  );
}

export default Zapp;
