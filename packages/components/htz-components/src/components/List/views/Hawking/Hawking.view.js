// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import config from 'config';

import type { Node, } from 'react';
import type {
  ListDataType,
  ListItemType,
} from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import Image from '../../../Image/Image';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import ListView from '../../../ListView/ListView';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import getImageAssets from '../../../../utils/getImageAssets';
import { isDfp, isTeaser, } from '../../utils/validateTeaser';
import filterList from '../../utils/filterList';
import Raphael from '../Raphael/Raphael';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';

type Props = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

HawkingList.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};

export default function HawkingList({
  list,
  biAction,
  gaAction,
  lazyLoadImages,
}: Props): Node {
  const isStyleguide = config.has('appName') && config.get('appName') === 'styleguide';
  const teasers = isStyleguide
    ? filterList(list.items, 'inputTemplate', 'com.tm.TeaserData')
    : list.items;

  const dfpBanners = isStyleguide
    ? list.dfp
      ? filterList(list.dfp, 'inputTemplate', 'com.polobase.DfpBannerElement')
      : null
    : list.dfp;

  const clickTrackerBanners = isStyleguide
    ? list.clickTrackers
      ? filterList(
        list.clickTrackers,
        'inputTemplate',
        'com.polobase.ClickTrackerBannersWrapper'
      )
      : null
    : list.clickTrackers;

  const mainTeaser = teasers && teasers.length > 0 && teasers[0];
  const teaser1 = teasers && teasers.length > 1 && teasers[1];
  const teaser2 = teasers && teasers.length > 2 && teasers[2];
  const teaser3 = teasers && teasers.length > 3 && teasers[3];

  return (
    <ListView gutter={4}>
      {/* LIST HEADER */}
      <GridItem
        stretchContent
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
      >
        <ListViewHeader
          title={list.title}
          extraLinks={list.extraLinks}
          marketingTeaser={list.marketingTeaser}
        />
      </GridItem>

      {/* LIST CONTENT */}
      <GridItem
        width={[
          { until: 'l', value: 1, },
          { from: 'l', until: 'xl', value: 7 / 12, },
          { from: 'xl', value: 10 / 12, },
        ]}
      >
        <Grid
          gutter={4}
          rowSpacing={[
            { until: 's', value: { amount: 1, }, },
            { from: 's', until: 'xl', value: { amount: 4, }, },
          ]}
        >
          {/* MAIN TEASER */}
          <GridItem
            width={[ { until: 'xl', value: 1, }, { from: 'xl', value: 4 / 10, }, ]}
          >
            {mainTeaser && (
              <HawkingMainTeaser
                item={mainTeaser}
                lazyLoadImages={lazyLoadImages}
                biAction={biAction}
              />
            )}
          </GridItem>

          {/* TRIPLET */}
          <GridItem
            stretchContent
            width={[
              { until: 's', value: 1, },
              { from: 's', until: 'l', value: 7 / 12, },
              { from: 'l', until: 'xl', value: 4 / 7, },
              { from: 'xl', value: 3 / 10, },
            ]}
          >
            <Grid
              gutter={0}
              rowSpacing={[
                { until: 's', value: { amount: 1, }, },
                { from: 's', value: { amount: 4, }, },
              ]}
              miscStyles={{
                flexDirection: 'column',
                flexGrow: '1',
              }}
            >
              <GridItem miscStyles={{ flexBasis: 'auto', }} stretchContent>
                {teaser1 && (
                  <HawkingTeaser index={1} item={teaser1} biAction={biAction} />
                )}
              </GridItem>
              <GridItem miscStyles={{ flexBasis: 'auto', }} stretchContent>
                {teaser2 && (
                  <HawkingTeaser index={2} item={teaser2} biAction={biAction} />
                )}
              </GridItem>
              <GridItem miscStyles={{ flexBasis: 'auto', }} stretchContent>
                {teaser3 && (
                  <HawkingTeaser index={3} item={teaser3} biAction={biAction} />
                )}
              </GridItem>
            </Grid>
          </GridItem>

          {/* CLICK TRACKERS */}
          <GridItem
            miscStyles={{
              display: 'flex',
              justifyContent: [ { until: 's', value: 'center', }, ],
            }}
            width={[
              { until: 's', value: 1, },
              { from: 's', until: 'l', value: 5 / 12, },
              { from: 'l', until: 'xl', value: 3 / 7, },
              { from: 'xl', value: 3 / 10, },
            ]}
          >
            {clickTrackerBanners ? (
              <Raphael
                title="תוכן מקודם"
                items={clickTrackerBanners}
                biAction={biAction}
                gaAction={gaAction}
              />
            ) : null}
          </GridItem>
        </Grid>
      </GridItem>

      {/* BANNER */}
      <GridItem
        width={[
          { from: 's', until: 'l', value: 1, },
          { from: 'l', until: 'xl', value: 3 / 12, },
        ]}
        miscStyles={{
          marginTop: [ { from: 's', until: 'l', value: '4rem', }, ],
          display: [
            { until: 's', value: 'none', },
            { from: 'xl', value: 'none', },
          ],
        }}
      >
        <FelaComponent
          style={theme => ({
            backgroundColor: 'GoldenRod',
            extend: [
              theme.mq(
                { from: 's', until: 'l', },
                {
                  marginTop: 4,
                }
              ),
            ],
          })}
        >
          {dfpBanners && isDfp(dfpBanners[0]) ? (
            <GeneralAdSlot {...dfpBanners[0]} />
          ) : null}
        </FelaComponent>
      </GridItem>
    </ListView>
  );
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type TeaserProps = {
  item: ListItemType,
  lazyLoadImages?: boolean,
  biAction: ?ListBiActionType,
  index: number,
};

HawkingMainTeaser.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
  index: 0,
};

function HawkingMainTeaser({
  item,
  lazyLoadImages,
  biAction,
  index,
}: TeaserProps): Node {
  return (
    <FelaTheme
      render={theme => (isTeaser(item) ? (
        <Teaser
          onClick={
              biAction
                ? () => biAction({ index, articleId: item.contentId, })
                : null
            }
          data={item}
          gutter={0}
          gridMiscStyles={{
            flexDirection: [
              { until: 's', value: 'column', },
              { from: 'xl', value: 'column', },
            ],
          }}
        >
          {item.image ? (
            <TeaserMedia
              data={item}
              width={[
                { from: 's', until: 'l', value: 8 / 12, },
                { from: 'l', until: 'xl', value: 5 / 7, },
              ]}
              miscStyles={{ flexGrow: '0', }}
            >
              <Image
                data={item.image}
                imgOptions={getImageAssets({
                  bps: theme.bps,
                  aspect: 'headline',
                  sizes: [
                    { from: 'xl', size: '402px', },
                    { from: 'l', size: '416px', },
                    { from: 's', size: '510px', },
                    { size: 'calc(100vw - 4rem)', },
                  ],
                  widths: [ 296, 320, 402, 416, 510, 580, 1024, ],
                })}
              />
            </TeaserMedia>
          ) : null}
          <TeaserContent
            data={item}
            width={[
              { from: 's', until: 'l', value: 4 / 12, },
              { from: 'l', until: 'xl', value: 2 / 7, },
            ]}
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 2, 1, 1, ]}
            gridItemMiscStyles={{
              flexBasis: [ { from: 'xl', value: 'auto', }, ],
            }}
            renderContent={data => (
              <TeaserHeader
                {...data}
                typeScale={[
                  { until: 's', value: 1, },
                  { from: 's', value: 2, },
                ]}
              />
            )}
            renderFooter={() => (
              <FelaComponent
                style={{
                  color: theme.color('neutral', -3),
                  fontWeight: '700',
                  extend: [ theme.type(-3), ],
                }}
                render="span"
              >
                <TeaserAuthors authors={item.authors} />
                <FelaComponent
                  style={{
                    color: theme.color('neutral', -3),
                    fontWeight: 400,
                    extend: [ theme.type(-3), ],
                  }}
                  render="span"
                >
                  {' | '}
                  <TeaserTime
                    publishDate={
                        item.publishDate && new Date(item.publishDate)
                      }
                  />
                </FelaComponent>
                <CommentsCount
                  commentsCount={item.commentsCounts}
                  minCount={1}
                  miscStyles={{ paddingRight: '1rem', }}
                />
              </FelaComponent>
            )}
          />
        </Teaser>
      ) : null)
      }
    />
  );
}

HawkingTeaser.defaultProps = {
  biAction: null,
};

function HawkingTeaser({ item, index, biAction, }: TeaserProps): Node {
  return isTeaser(item) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          data={item}
          onClick={
            biAction
              ? () => biAction({ index, articleId: item.contentId, })
              : null
          }
          miscStyles={{ flexGrow: '1', }}
        >
          <TeaserContent
            data={item}
            width={1}
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 1, 1, 1, ]}
            footerMiscStyles={{
              fontWeight: '700',
              type: -3,
              color: theme.color('neutral', '-3'),
            }}
            renderContent={data => (
              <TeaserHeader {...data} typeScale={[ { until: 's', value: -1, }, ]} />
            )}
            renderFooter={() => (
              <CommentsCount
                commentsCount={item.commentsCounts}
                minCount={1}
                miscStyles={{ paddingRight: '1rem', }}
              />
            )}
          />
        </Teaser>
      )}
    />
  ) : null;
}
