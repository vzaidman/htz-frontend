// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';

import type { Node, } from 'react';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { ClickTrackerBannerType, } from '../../../../flowTypes/ClickTrackerBannerType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import ListView from '../../../ListView/ListView';
import StickyListViewHeader from '../../../ListViewHeader/StickyListViewHeader';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import Image from '../../../Image/Image';
import Debug from '../../../Debug/Debug';
import BlockLink from '../../../BlockLink/BlockLink';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';

type Props = {
  list: ListDataType,
  biAction: ?ListBiActionType,
  lazyLoadImages: boolean,
};

type ItemProps = {
  item: ClickTrackerBannerWrapperType,
  index: number,
  biAction: ?ListBiActionType,
  lazyLoadImages: boolean,
};

Donatello.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

export default function Donatello({ list, biAction, lazyLoadImages = true, }: Props): Node {
  const items: ?Array<ClickTrackerBannerWrapperType> = list.clickTrackers
    ? list.clickTrackers.slice(0, 5)
    : null;
  return items ? (
    list.title ? (
      <FelaTheme
        render={theme => (
          <ListView
            innerBackgroundColor="transparent"
            padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
            miscStyles={{
              fontFamily: theme.fontStacks.commercial,
              display: [ { until: 's', value: 'none', }, ],
            }}
          >
            <StickyListViewHeader
              title={list.title}
              backgroundColor={[ 'transparent', ]}
              isCommercial
              biAction={biAction}
              width={[ { until: 'l', value: 1, }, { from: 'l', value: 1 / 6, }, ]}
            />
            <GridItem width={[ { until: 'l', value: 1, }, { from: 'l', value: 5 / 6, }, ]}>
              <Grid gutter={4}>
                {items.map((item: ClickTrackerBannerWrapperType, index) => {
                  const isLast: boolean = index === items.length - 1;
                  return (
                    <GridItem
                      key={item.contentId}
                      width={[
                        { until: 'l', value: 1 / (items.length - 1), },
                        { from: 'l', value: 1 / items.length, },
                      ]}
                      miscStyles={{
                        display: isLast
                          ? [ { until: 'l', value: 'none', }, { from: 'l', value: 'flex', }, ]
                          : 'flex',
                      }}
                    >
                      <Item
                        item={item}
                        biAction={biAction}
                        index={index}
                        lazyLoadImages={lazyLoadImages}
                      />
                    </GridItem>
                  );
                })}
              </Grid>
            </GridItem>
          </ListView>
        )}
      />
    ) : (
      <Debug>This element cannot be rendered without a title</Debug>
    )
  ) : (
    <Debug>There is not enough items to render this list view</Debug>
  );
}

Item.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

function Item({ item, biAction, index, lazyLoadImages, }: ItemProps): Node {
  return (
    <ClickTracker
      {...item}
      render={(banner: ClickTrackerBannerType) => {
        const { clicktrackerimage, link, contentId, text, linkTarget, } = banner;
        return (
          <FelaTheme
            render={theme => (
              <BlockLink
                miscStyles={{
                  flexGrow: '1',
                  display: 'flex',
                  // HACK ALERT!!!
                  // "0.1" in the line argument is to force a regular border
                  // instead of an absolutely positioned pseudo element that
                  // break the vertical rhythm.
                  // We need this here because the image has a higher z-index
                  // than the faux-border, and hides it.
                  // This is a hack, do not use this.
                  border: [ '1px', 0.1, 'solid', theme.color('neutral', '-4'), ],
                }}
                href={link}
                onClick={
                  biAction
                    ? () => biAction({ index, articleId: contentId, })
                    : null
                }
                target={linkTarget}
              >
                <Teaser
                  data={banner}
                  isClickTracker
                  backgroundColor={[ 'neutral', '-7', ]}
                  gutter={2}
                  isRev={false}
                  onClick={
                    biAction
                      ? () => biAction({ index, articleId: contentId, })
                      : null
                  }
                >
                  <TeaserMedia data={banner} width={1} isClickTracker>
                    <Image
                      data={clicktrackerimage}
                      lazyLoad={lazyLoadImages}
                      imgOptions={{
                        transforms: {
                          width: '180',
                          aspect: 'regular',
                          quality: 'auto',
                        },
                      }}
                      onClick={
                        biAction
                          ? () => biAction({ index, articleId: contentId, })
                          : null
                      }
                    />
                  </TeaserMedia>
                  <TeaserContent
                    data={banner}
                    padding={[ 1, 2, 2, 2, ]}
                    renderContent={() => (
                      <TeaserHeader
                        title={text || ''}
                        path={link}
                        typeScale={-1}
                        onClick={
                          biAction
                            ? () => biAction({ index, articleId: contentId, })
                            : null
                        }
                      />
                    )}
                  />
                </Teaser>
              </BlockLink>
            )}
          />
        );
      }}
    />
  );
}
