// @flow
import * as React from 'react';

import BreakingNewsBox from '../../../BreakingNewsBox/BreakingNewsBox';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import StickyListViewHeader from '../../../ListViewHeader/StickyListViewHeader';
import MainTeaser from './MainTeaser';
import VerticalImageTeaser from './VerticalImageTeaser';
import VerticalTeaser from './VerticalTeaser';

import type { DfpBannerType, } from '../../../../flowTypes/DfpBannerType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

type Props = {
  list: ListDataType,
  listId: string,
  lazyLoadImages: boolean,
  gaAction: ?() => void,
  biAction: ?ListBiActionType,
};

export default function KrokerView({
  list,
  listId,
  lazyLoadImages,
  gaAction,
  biAction,
}: Props): React.Node {
  const { items, dfp, extraLinks, ...restOfList } = list;
  return (
    <ListView
      gutter={4}
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, 4, ], }, ]}
      marginTop={[ { until: 's', value: 1, }, { from: 's', value: 0, }, ]}
      rowSpacing={[ { until: 's', value: { amount: 1, nUp: 1, }, }, ]}
      innerBackgroundColor={[ { until: 's', value: 'transparent', }, { from: 's', value: 'white', }, ]}
    >
      {/* list header */}
      <StickyListViewHeader
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
        {...restOfList}
        extraLinks={extraLinks ? extraLinks.slice(0, 5) : null}
        backgroundColor="white"
        miscStyles={{ marginBottom: [ { from: 's', until: 'l', value: 1, }, ], }}
      />

      {/* breaking news +  items */}
      <GridItem width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}>
        <Grid
          rowSpacing={[
            { until: 's', value: { amount: 0, }, },
            { from: 's', until: 'l', value: { amount: 3, }, },
            { from: 'l', until: 'xl', value: { amount: 4, }, },
            { from: 'xl', value: { amount: 2, }, },
          ]}
        >
          {/* breaking news element */}
          <GridItem
            width={1}
            miscStyles={{
              display: [ { until: 's', value: 'none', }, ],
            }}
          >
            <BreakingNewsBox speed={4} loop itemsTransitionDuration={5} />
          </GridItem>

          {/* list items */}
          <GridItem
            width={1}
            // miscStyles={{ marginTop: [ { from: 'm', until: 'l', value: '4rem', }, ], }}
          >
            <ListItems
              items={items}
              dfp={dfp}
              lazyLoadImages={lazyLoadImages}
              biAction={biAction}
              gaAction={gaAction}
            />
          </GridItem>
        </Grid>
      </GridItem>
    </ListView>
  );
}

type ListItemsProps = {
  items: Array<TeaserDataType>,
  dfp: ?Array<DfpBannerType>,
  lazyLoadImages: boolean,
  gaAction: ?() => void,
  biAction: ?ListBiActionType,
};
function ListItems({ items, dfp, lazyLoadImages, gaAction, biAction, }: ListItemsProps): React.Node {
  return (
    <Grid
      rowSpacing={[
        { until: 's', value: { amount: 2, }, },
        { from: 's', until: 'l', value: { amount: 2, }, },
      ]}
    >
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 5 / 10, }, ]}
        miscStyles={{ display: 'flex', }}
      >
        <Grid gutter={4} rowSpacing={[ { until: 's', value: { amount: 2, }, }, ]}>
          <GridItem
            width={[ { until: 's', value: 1, }, { from: 's', value: 3 / 5, }, ]}
            miscStyles={{ display: 'flex', }}
          >
            {/* item 1 */}
            <MainTeaser itemData={items[0]} lazyLoadImages={lazyLoadImages} biAction={biAction} />
          </GridItem>
          <GridItem
            width={[ { until: 's', value: 1, }, { from: 's', value: 2 / 5, }, ]}
            miscStyles={{ display: 'flex', }}
          >
            {/* item 2 */}
            <VerticalImageTeaser
              itemData={items[1]}
              lazyLoadImages={lazyLoadImages}
              biAction={biAction}
              displayFlags={{ commentsCount: true, }}
            />
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 3 / 10, }, ]}
        miscStyles={{
          marginBottom: [ { from: 's', until: 'l', value: 4, }, ],
          display: [ { from: 'l', value: 'flex', }, ],
        }}
      >
        {/* items 3 - 5 */}
        <Grid
          gutter={4}
          rowSpacing={[ { until: 's', value: { amount: 2, }, }, { from: 'l', value: { amount: 1, }, }, ]}
        >
          {items.slice(2, 5).map(item => (
            <GridItem
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 1 / 3, },
                { from: 'l', value: 1, },
              ]}
              miscStyles={{ display: 'flex', }}
              key={item.contentId}
            >
              <VerticalTeaser
                itemData={item}
                biAction={biAction}
                displayFlags={{ commentsCount: true, }}
              />
            </GridItem>
          ))}
        </Grid>
      </GridItem>
      {/* banner */}
      {dfp && dfp.length > 0
        ? dfp.map(banner => (
          <GridItem
            key={banner.contentId}
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 10, }, ]}
            miscStyles={{ display: 'flex', marginTop: '0 !important', }}
          >
            {/* banner content */}
            <GeneralAdSlot {...banner} wrapperMiscStyles={{ width: '100%', }} />
          </GridItem>
        ))
        : null}
      {/* end banner */}
    </Grid>
  );
}
