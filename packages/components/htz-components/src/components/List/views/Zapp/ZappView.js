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
  return (
    <ListView
      gutter={4}
      innerBackgroundColor={[
        { until: 's', value: 'transparent', },
        { from: 's', value: 'white', },
      ]}
      marginTop={[ { until: 's', value: 1, }, { from: 's', value: 4, }, ]}
      rowSpacing={[
        { until: 's', value: { amount: 1, }, },
        { from: 's', until: 'l', value: { amount: 4, }, },
      ]}
    >
      <GridItem width={width}>
        <ZappItem
          data={list.items[0]}
          lazyLoadImages={lazyLoadImages}
          index={0}
          biAction={biAction}
        />
      </GridItem>
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
      <GridItem width={width}>
        <ZappItem
          data={list.items[1]}
          lazyLoadImages={lazyLoadImages}
          index={2}
          biAction={biAction}
        />
      </GridItem>
      <GridItem width={width}>
        <ZappItem
          data={list.items[2]}
          lazyLoadImages={lazyLoadImages}
          index={3}
          biAction={biAction}
        />
      </GridItem>
      <GridItem width={width}>
        <ZappItem
          data={list.items[3]}
          lazyLoadImages={lazyLoadImages}
          hideImageOnMobile
          index={4}
          biAction={biAction}
        />
      </GridItem>
    </ListView>
  );
}

export default Zapp;
