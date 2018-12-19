// @flow
import { FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { ClickTrackerBannerType, } from '../../../../flowTypes/ClickTrackerBannerType';

import GridItem from '../../../Grid/GridItem';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView.js';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import getImageAssets from '../../../../utils/getImageAssets';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: () => void,
  biAction: ListBiActionType,
  banners: ?Array<ClickTrackerBannerWrapperType>,
};

VerticalList.defaultProps = {
  banners: null,
};

export default function VerticalList({ list, listId, gaAction, biAction, banners, }: Props) {
  const isCommercial: boolean = !!banners;
  const firstItem = banners
    ? banners[0]
    : list.items && list.items.length > 0 && list.items[0];
  const items = banners
    ? banners.slice(1)
    : list.items && list.items.length > 1 && list.items.slice(1);

  return (
    <FelaTheme
      render={theme => (
        <ListView
          disableWrapper
          miscStyles={isCommercial ? { fontFamily: theme.fontStacks.Arial, } : {}}
          gridMiscStyles={{ flexDirection: 'column', }}
          sectionMiscStyles={{ display: 'flex', }}
        >
          <GridItem miscStyles={{ flexGrow: '0', }}>
            <ListViewHeader
              url={list.url}
              hasTitlePadding
              isHorizontal
              title={list.title}
              backgroundColor={[ 'white', ]}
            />
          </GridItem>
          <GridItem miscStyles={{ flexGrow: '1', flexBasis: 'auto', }} stretchContent>
            {firstItem
              ? firstItem.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
                ? (
                  <ClickTracker
                    {...firstItem}
                    render={(banner: ClickTrackerBannerType) => {
                      const { contentId, } = banner;
                      return (
                        <VerticalListFirstTeaser
                          key={contentId}
                          itemData={banner}
                          biAction={biAction}
                          lazyLoadImages
                        />
                      );
                    }}
                  />
                ) : firstItem.inputTemplate === 'com.tm.TeaserData'
                  ? (
                    <VerticalListFirstTeaser
                      key={firstItem.contentId}
                      itemData={firstItem}
                      biAction={biAction}
                      lazyLoadImages
                    />
                  )
                  : null
              : null
            }
            {items
              ? items.map((itemData, index) => (
                itemData.inputTemplate === 'com.polobase.ClickTrackerBannersWrapper'
                  ? (
                    <ClickTracker
                      {...itemData}
                      render={(banner: ClickTrackerBannerType) => {
                        const { contentId, } = banner;
                        return (
                          <VerticalListTeaser
                            key={contentId}
                            itemData={banner}
                            biAction={biAction}
                            index={index}
                            isLast={index >= items.length - 1}
                          />
                        );
                      }}
                    />
                  ) : itemData.inputTemplate === 'com.tm.TeaserData'
                    ? (
                      <VerticalListTeaser
                        key={itemData.contentId}
                        itemData={itemData}
                        biAction={biAction}
                        index={index}
                        isLast={index >= items.length - 1}
                      />
                    )
                    : null
              ))
              : null}
          </GridItem>
        </ListView>
      )}
    />
  );
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type FirstTeaserProps = {
  lazyLoadImages: boolean,
  itemData: TeaserDataType | ClickTrackerBannerType,
  biAction: ListBiActionType,
};

VerticalListFirstTeaser.defaultProps = { lazyLoadImages: true, };

function VerticalListFirstTeaser({ lazyLoadImages, itemData, biAction, }: FirstTeaserProps) {
  console.log(itemData);
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          onClick={() => biAction({ index: 0, articleId: itemData.contentId, })}
          miscStyles={{ flexGrow: '1', }}
          gridMiscStyles={{ flexDirection: 'column', }}
          isClickTracker={itemData.inputTemplate === 'com.polobase.ClickTrackerBannerElement'}
        >
          <TeaserMedia
            data={itemData}
            width={1}
            isClickTracker={itemData.inputTemplate === 'com.polobase.ClickTrackerBannerElement'}
            miscStyles={{ flexShrink: '0', width: '100%', }}
          >
            <Image
              lazyLoad={lazyLoadImages}
              data={itemData.inputTemplate === 'com.polobase.ClickTrackerBannerElement' ? itemData.clicktrackerimage : itemData.image}
              imgOptions={getImageAssets({
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
          </TeaserMedia>
          <TeaserContent
            width={1}
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
            renderContent={() => (
              <TeaserHeader
                title={itemData.inputTemplate === 'com.polobase.ClickTrackerBannerElement' ? (itemData.text || '') : itemData.title}
                path={itemData.inputTemplate === 'com.polobase.ClickTrackerBannerElement' ? itemData.link : itemData.path}
                offset={1}
                typeScale={-1}
                kickerTypeScale={-1}
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}

type VerticalListTeaserProps = FirstTeaserProps & {
  index: number,
  isLast: boolean,
};

VerticalListTeaser.defaultProps = {
  isLast: false,
  isStrong: false,
  lazyLoadImages: false,
};

function VerticalListTeaser({ itemData, biAction, index, isLast, }: VerticalListTeaserProps) {
  return (
    <Teaser
      data={itemData}
      onClick={() => biAction({ index, articleId: itemData.contentId, })}
      miscStyles={{ flexGrow: '1', }}
      gridMiscStyles={{ flexDirection: 'column', }}
      isClickTracker={itemData.inputTemplate === 'com.polobase.ClickTrackerBannerElement'}
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
                  borderBottom: [ '1px', 1, 'solid', theme.color('neutral', '-5'), ],
                }),
            }}
            renderContent={() => (
              <TeaserHeader
                title={itemData.inputTemplate === 'com.polobase.ClickTrackerBannerElement' ? (itemData.text || '') : itemData.title}
                path={itemData.inputTemplate === 'com.polobase.ClickTrackerBannerElement' ? itemData.link : itemData.path}
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
