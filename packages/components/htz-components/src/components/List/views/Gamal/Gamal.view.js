// @flow
import { FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import GridItem from '../../../Grid/GridItem';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView.js';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import getImageAssets from '../../../../utils/getImageAssets';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: () => void,
  biAction: ListBiActionType,
};

export default function Gamal({ list, listId, gaAction, biAction, }: Props) {
  const firstItem = list.items && list.items.length > 0 && list.items[0];
  const items = list.items && list.items.length > 1 && list.items.slice(1);
  // const isCommercial = firstItem && firstItem.inputTemplate === 'com.polobase.ClickTrackerBannerElement';

  return (
    <ListView
      disableWrapper
      innerBackgroundColor="white"
      sectionMiscStyles={{ display: 'flex', flexDirection: 'column', }}
      gridMiscStyles={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
      }}
    >
      <GridItem width={1} miscStyles={{ flexGrow: '0', }}>
        <ListViewHeader
          url={list.url}
          hasTitlePadding
          isHorizontal
          title={list.title}
          backgroundColor={[ 'white', ]}
        />
      </GridItem>
      <GridItem width={1} miscStyles={{ flexGrow: '1', }} stretchContent>
        {firstItem ? (
          <GamalFirstTeaser
            key={firstItem.contentId}
            itemData={firstItem}
            biAction={biAction}
            lazyLoadImages
          />
        ) : null}
        {items
          ? items.map((itemData, index) => (
            <GamalTeaser
              key={itemData.contentId}
              itemData={itemData}
              biAction={biAction}
              index={index}
              isLast={index >= items.length - 1}
            />
          ))
          : null}
      </GridItem>
    </ListView>
  );
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type FirstTeaserProps = {
  lazyLoadImages: boolean,
  itemData: TeaserDataType,
  biAction: ListBiActionType,
};

GamalFirstTeaser.defaultProps = { lazyLoadImages: true, };

function GamalFirstTeaser({
  lazyLoadImages,
  itemData,
  biAction,
}: FirstTeaserProps) {
  return (
    <Teaser
      data={itemData}
      onClick={biAction({ index: 0, articleId: itemData.contentId, })}
      miscStyles={{ flexGrow: '1', }}
      gridMiscStyles={{ flexDirection: 'column', }}
    >
      <TeaserMedia data={itemData} width={1} miscStyle={{ flexShrink: '0', }}>
        <FelaTheme
          render={theme => (
            <Image
              lazyLoad={lazyLoadImages}
              data={itemData.image}
              imageOptions={getImageAssets({
                aspect: 'headline',
                bps: theme.bps,
                sizes: [
                  { from: 'xl', size: '295px', },
                  { from: 'l', size: '238', },
                  { from: 'm', size: '372', },
                  { from: 's', size: '288', },
                  { size: 'calc(100vw - 24px)', },
                ],
                widths: [ 744, 372, 295, 288, 238, ],
              })}
            />
          )}
        />
      </TeaserMedia>
      <FelaTheme
        render={theme => (
          <TeaserContent
            data={itemData}
            padding={[ 1, 0, ]}
            gridItemMiscStyles={{
              flexBasis: 'auto',
              flexGrow: 1,
              paddingInlineEnd: '1rem',
              paddingInlineStart: '1rem',
            }}
            miscStyles={{
              flexGrow: 1,
              borderBottom: [ '1px', 1, 'solid', theme.color('neutral', '-5'), ],
            }}
            renderContent={data => (
              <TeaserHeader
                {...data}
                offset={1}
                typeScale={-1}
                kickerTypeScale={-1}
              />
            )}
          />
        )}
      />
    </Teaser>
  );
}

type GamalTeaserProps = FirstTeaserProps & {
  index: number,
  isLast: boolean,
};

GamalTeaser.defaultProps = {
  isLast: false,
  isStrong: false,
  lazyLoadImages: false,
};

function GamalTeaser({ itemData, biAction, index, isLast, }: GamalTeaserProps) {
  return (
    <Teaser
      data={itemData}
      onClick={biAction({ index, articleId: itemData.contentId, })}
      miscStyles={{ flexGrow: '1', }}
      gridMiscStyles={{ flexDirection: 'column', }}
    >
      <FelaTheme
        render={theme => (
          <TeaserContent
            data={itemData}
            padding={[ 1, 0, ]}
            gridItemMiscStyles={{
              flexBasis: 'auto',
              flexGrow: 1,
              paddingInlineEnd: '1rem',
              paddingInlineStart: '1rem',
            }}
            miscStyles={{
              flexGrow: 1,
              ...(isLast
                ? {}
                : {
                  borderBottom: [
                    '1px',
                    1,
                    'solid',
                    theme.color('neutral', '-5'),
                  ],
                }),
            }}
            renderContent={data => (
              <TeaserHeader
                {...data}
                offset={1}
                typeScale={-1}
                kickerTypeScale={-1}
                miscStyles={{ fontWeight: '400', }}
              />
            )}
          />
        )}
      />
    </Teaser>
  );
}
