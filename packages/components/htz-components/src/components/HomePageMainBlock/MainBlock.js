// @flow
import React from 'react';
import type { Node, ComponentType, } from 'react';
import GridItem from '../Grid/GridItem';
import ListView from '../ListView/ListView';

import GeneralAdSlot from '../Ads/GeneralAdSlot';

import type { ListDataType, } from '../../flowTypes/ListDataType';
import type { DfpBannerType, } from '../../flowTypes/DfpBannerType';

type Props = {
  List: ComponentType<any>,
  data: {
    slotA: ListDataType,
    slotB: DfpBannerType,
    slotC: ListDataType,
  },
};

export default function MainBlock({
  data: { slotA, slotB, slotC, },
  List,
}: Props): Node {
  const isWideMain = slotA.view === 'Conrad';
  return (
    <ListView
      gutter={0}
      innerBackgroundColor={[ { until: 's', value: 'transparent', }, ]}
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, 4, ], }, ]}
      marginTop={[ { until: 's', value: 1, }, { from: 's', value: 0, }, ]}
    >
      <List
        {...slotA}
        viewProps={{
          width: [
            { from: 's', until: 'l', value: 1, },
            { from: 'l', until: 'xl', value: 1, },
            { from: 'xl', value: isWideMain ? 1 : 7 / 10, },
          ],
        }}
      />
      <GridItem
        gutter={0}
        width={[
          { from: 's', until: 'l', value: 1, },
          { from: 'l', until: 'xl', value: 4 / 12, },
          { from: 'xl', value: isWideMain ? 4 / 12 : 3 / 10, },
        ]}
        miscStyles={{
          marginTop: [
            {
              until: 's',
              value: 2,
            },
            {
              from: 's',
              value: 4,
            },
          ],
          paddingInlineStart: [
            { from: 'l', until: 'xl', value: '4rem', },
            { from: 'xl', value: '4rem', },
          ],
          paddingInlineEnd: [
            { from: 'l', until: 'xl', value: '2rem', },
            { from: 'xl', value: '4rem', },
          ],
          order: [
            { from: 'l', until: 'xl', value: 5, },
            ...(isWideMain ? [ { from: 'xl', value: 5, }, ] : []),
          ],
          display: [ { until: 's', value: 'none', }, ],
        }}
      >
        <GeneralAdSlot {...slotB} />
      </GridItem>
      <List
        {...slotC}
        viewProps={{
          isStackedOnXl: isWideMain,
          width: [
            { from: 's', until: 'l', value: 1, },
            { from: 'l', until: 'xl', value: 8 / 12, },
            { from: 'xl', value: isWideMain ? 8 / 12 : 1, },
          ],
        }}
      />
    </ListView>
  );
}
