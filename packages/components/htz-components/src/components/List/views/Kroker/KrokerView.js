// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import BreakingNewsBox from '../../../BreakingNewsBox/BreakingNewsBox';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
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
  const { items, dfp, } = list;
  return (
    <ListView
      gutter={{
        onServerRender: 0,
        queries: [ { until: 's', value: 0, }, { from: 's', value: 4, }, ],
      }}
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, 4, ], }, ]}
      marginTop={[ { until: 's', value: 1, }, { from: 's', value: 0, }, ]}
      rowSpacing={[ { until: 's', value: { amount: 1, nUp: 1, }, }, ]}
      innerBackgroundColor={[
        { until: 's', value: 'transparent', },
        { from: 's', value: 'white', },
      ]}
    >
      {/* list header */}
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
      >
        <ListViewHeader
          url={list.url}
          extraLinks={list.extraLinks}
          title={list.title}
          backgroundColor="white"
        />
      </GridItem>

      {/* breaking news +  items */}
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
      >
        <Grid rowSpacing={{ amount: 2, }}>
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
          <GridItem width={1}>
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
function ListItems({
  items,
  dfp,
  lazyLoadImages,
  gaAction,
  biAction,
}: ListItemsProps): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Grid
          rowSpacing={[
            { until: 's', value: { amount: 1, }, },
            { from: 's', until: 'l', value: { amount: 4, }, },
          ]}
        >
          <GridItem
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 5 / 10, }, ]}
            miscStyles={{ display: 'flex', }}
          >
            <Grid
              gutter={4}
              rowSpacing={[ { until: 's', value: { amount: 1, }, }, ]}
            >
              <GridItem
                width={[ { until: 's', value: 1, }, { from: 's', value: 3 / 5, }, ]}
              >
                {/* item 1 */}
                <MainTeaser
                  itemData={items[0]}
                  lazyLoadImages={lazyLoadImages}
                  biAction={biAction}
                />
              </GridItem>
              <GridItem
                width={[ { until: 's', value: 1, }, { from: 's', value: 2 / 5, }, ]}
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
              display: [ { from: 'l', value: 'flex', }, ],
            }}
          >
            {/* items 3 - 5 */}
            <Grid
              gutter={4}
              rowSpacing={[
                { until: 's', value: { amount: 1, }, },
                { from: 'l', value: { amount: 1, }, },
              ]}
            >
              {items.slice(2, 5).map((item, index) => (
                <GridItem
                  width={[
                    { until: 's', value: 1, },
                    { from: 's', until: 'l', value: 1 / 3, },
                    { from: 'l', value: 1, },
                  ]}
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
          {dfp && dfp.length > 0 ? (
            <GridItem
              width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 10, }, ]}
              miscStyles={{ display: 'flex', }}
            >
              {/* banner content */}
              <GeneralAdSlot {...(dfp ? dfp[0] : {})} />
            </GridItem>
          ) : null}
          {/* end banner */}
        </Grid>
      )}
    />
  );
}
