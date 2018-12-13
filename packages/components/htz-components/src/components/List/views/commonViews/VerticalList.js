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
import {
  isClickTracker,
  isClickTrackerWrapper,
  isTeaser,
} from '../../utils/validateTeaser';

type Props = {
  list: ?ListDataType,
  gaAction: ?() => void,
  biAction: ?ListBiActionType,
  banners: ?Array<ClickTrackerBannerWrapperType>,
  title: ?string,
};

VerticalList.defaultProps = {
  banners: null,
  list: null,
  title: null,
  biAction: null,
};

export default function VerticalList({
  list,
  gaAction,
  biAction,
  banners,
  title,
}: Props) {
  const isCommercial: boolean = !!banners;
  const firstItem = banners
    ? banners[0]
    : list && list.items && list.items.length > 0 && list.items[0];
  const items = banners
    ? banners.slice(1)
    : list && list.items && list.items.length > 1 && list.items.slice(1);

  return (
    <FelaTheme
      render={theme => (
        <ListView
          disableWrapper
          {...(title ? { marginTop: 0, } : {})}
          miscStyles={{
            ...(isCommercial ? { fontFamily: theme.fontStacks.commercial, } : {}),
          }}
          gridMiscStyles={{ flexDirection: 'column', }}
          sectionMiscStyles={{ display: 'flex', }}
        >
          <GridItem miscStyles={{ flexGrow: '0', }}>
            {list || title ? (
              <ListViewHeader
                url={list ? list.url : null}
                hasTitlePadding
                isHorizontal
                title={title || (list ? list.title : '')}
                backgroundColor={[ 'white', ]}
                isCommercial={isCommercial}
                miscStyles={{
                  ...theme.type(0),
                }}
              />
            ) : null}
          </GridItem>
          <GridItem
            miscStyles={{ flexGrow: '1', flexBasis: 'auto', }}
            stretchContent
          >
            {firstItem ? (
              isClickTrackerWrapper(firstItem) ? (
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
              ) : isTeaser(firstItem) ? (
                <VerticalListFirstTeaser
                  key={firstItem.contentId}
                  itemData={firstItem}
                  biAction={biAction}
                  lazyLoadImages
                />
              ) : null
            ) : null}
            {items
              ? items.map((itemData, index) => (isClickTrackerWrapper(itemData) ? (
                <ClickTracker
                  key={itemData.contentId}
                  {...itemData}
                  render={(banner: ClickTrackerBannerType) => (
                    <VerticalListTeaser
                      itemData={banner}
                      biAction={biAction}
                      index={index}
                      isLast={index >= items.length - 1}
                    />
                  )}
                />
              ) : isTeaser(itemData) ? (
                <VerticalListTeaser
                  key={itemData.contentId}
                  itemData={itemData}
                  biAction={biAction}
                  index={index}
                  isLast={index >= items.length - 1}
                />
              ) : null)
              )
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
  biAction: ?ListBiActionType,
};

VerticalListFirstTeaser.defaultProps = { lazyLoadImages: true, };

function VerticalListFirstTeaser({
  lazyLoadImages,
  itemData,
  biAction,
}: FirstTeaserProps) {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          onClick={
            biAction
              ? () => biAction({ index: 0, articleId: itemData.contentId, })
              : null
          }
          miscStyles={{ flexGrow: '1', flexShrink: '0', }}
          gridMiscStyles={{ flexDirection: 'column', }}
          isClickTracker={isClickTracker(itemData)}
        >
          <TeaserMedia
            data={itemData}
            width={1}
            isClickTracker={isClickTracker(itemData)}
            miscStyles={{ flexShrink: '0', width: '100%', }}
          >
            <Image
              lazyLoad={lazyLoadImages}
              data={
                isClickTracker(itemData)
                  ? itemData.clicktrackerimage
                  : itemData.image
              }
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
                title={
                  isClickTracker(itemData)
                    ? itemData.text || ''
                    : itemData.title
                }
                path={isClickTracker(itemData) ? itemData.link : itemData.path}
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
  lazyLoadImages: true,
};

function VerticalListTeaser({
  itemData,
  biAction,
  index,
  isLast,
}: VerticalListTeaserProps) {
  return (
    <Teaser
      data={itemData}
      onClick={
        biAction
          ? () => biAction({ index, articleId: itemData.contentId, })
          : null
      }
      miscStyles={{ flexGrow: '1', flexShrink: '0', }}
      gridMiscStyles={{ flexDirection: 'column', }}
      isClickTracker={isClickTracker(itemData)}
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
            renderContent={() => (
              <TeaserHeader
                title={
                  isClickTracker(itemData)
                    ? itemData.text || ''
                    : itemData.title
                }
                path={isClickTracker(itemData) ? itemData.link : itemData.path}
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
