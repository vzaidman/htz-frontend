// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';

import type { StatelessFunctionalComponent, } from 'react';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { ClickTrackerBannerType, } from '../../../../flowTypes/ClickTrackerBannerType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
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
import { isClickTracker, } from '../Michelangelo/Michelangelo.view';

type Props = {
  list: ListDataType,
  biAction: ListBiActionType,
  lazyLoadImages: boolean,
};

type ItemProps = {
  item: ClickTrackerBannerWrapperType,
  index: number,
  biAction: ListBiActionType,
  lazyLoadImages: boolean,
}

const Item: StatelessFunctionalComponent<ItemProps> = ({
  item,
  biAction,
  index,
  lazyLoadImages,
}) => (
  <ClickTracker
    {...item}
    render={(banner: ClickTrackerBannerType) => {
      const { clicktrackerimage, link, contentId, text, linkTarget, } = banner;
      return (
        <FelaTheme
          render={theme => (
            <BlockLink
              miscStyles={{
                height: '100%',
                border: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
              }}
              href={link}
              onClick={() => biAction({ index, articleId: contentId, })}
              target={linkTarget}
            >
              <Teaser
                data={banner}
                isClickTracker
                backgroundColor={[ 'neutral', '-7', ]}
                gutter={2}
                isRev={false}
                onClick={() => biAction({ index, articleId: contentId, })}
                miscStyles={{
                  height: '100%',
                }}
              >
                {clicktrackerimage
                  ? (
                    <TeaserMedia
                      data={banner}
                      width={1}
                      isClickTracker
                    >
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
                      />
                    </TeaserMedia>
                  ) : null
                }
                <TeaserContent
                  data={banner}
                  padding={[ 1, 2, 2, 2, ]}
                  renderContent={() => (
                    <TeaserHeader
                      title={text || ''}
                      path={link}
                      typeScale={-1}
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


const Leonardo: StatelessFunctionalComponent<Props> = ({
  list,
  biAction,
  lazyLoadImages = false,
}) => {
  // The `isClickTracker` predicate checks the type and
  // filters out non `ClickTrackerBannerWrapperType` elements,
  // but flow does not understand predicates in `filter` yet:
  // https://github.com/facebook/flow/issues/1414
  // $FlowFixMe
  const items: Array<ClickTrackerBannerWrapperType> = list.items
    .filter(isClickTracker)
    .slice(0, 5);
  return items
    ? (
      <FelaTheme
        render={theme => (
          <ListView
            innerBackgroundColor="transparent"
            miscStyles={{
              fontFamily: theme.fontStacks.Arial,
              display: [ { until: 's', value: 'none', }, ],
            }}
          >
            <GridItem
              width={[ { until: 'l', value: 1, }, { from: 'l', value: 1 / 6, }, ]}
            >
              <ListViewHeader
                title={list.title}
                backgroundColor={[ 'transparent', ]}
                isCommercial
              />
            </GridItem>
            <GridItem
              width={[ { until: 'l', value: 1, }, { from: 'l', value: 5 / 6, }, ]}
            >
              <Grid
                gutter={4}
              >
                {
                  items.map((item: ClickTrackerBannerWrapperType, index) => {
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
                            ? [
                              { until: 'l', value: 'none', },
                              { from: 'l', value: 'block', },
                            ]
                            : 'block',
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
                  })
                }
              </Grid>
            </GridItem>
          </ListView>
        )}
      />
    )
    : (
      <Debug>There is not enough items to render this list view</Debug>
    );
};

export default Leonardo;
