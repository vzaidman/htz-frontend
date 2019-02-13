// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import Image from '../../../Image/Image';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import StickyListViewHeader from '../../../ListViewHeader/StickyListViewHeader';
import ListView from '../../../ListView/ListView';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import getImageAssets from '../../../../utils/getImageAssets';
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
  const { items, clickTrackers, dfp, ...restOfList } = list;

  const mainTeaser = items && items.length > 0 && items[0];
  const teaser1 = items && items.length > 1 && items[1];
  const teaser2 = items && items.length > 2 && items[2];
  const teaser3 = items && items.length > 3 && items[3];

  return (
    <ListView
      gutter={4}
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
    >
      <StickyListViewHeader
        {...restOfList}
        biAction={biAction}
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
        miscStyles={{ marginBottom: [ { until: 's', value: '1rem', }, ], }}
      />

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
            { until: 's', value: { amount: 2, }, },
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
                { until: 's', value: { amount: 2, }, },
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
              marginTop: [ { until: 's', value: '6rem', }, ],
            }}
            width={[
              { until: 's', value: 1, },
              { from: 's', until: 'l', value: 5 / 12, },
              { from: 'l', until: 'xl', value: 3 / 7, },
              { from: 'xl', value: 3 / 10, },
            ]}
          >
            {clickTrackers ? (
              <Raphael
                title="תוכן מקודם"
                items={clickTrackers}
                biAction={biAction}
                gaAction={gaAction}
              />
            ) : null}
          </GridItem>
        </Grid>
      </GridItem>

      {/* BANNER */}
      {dfp && dfp.length > 0
        ? dfp.map(banner => (
          <GridItem
            key={banner.contentId}
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
            <GeneralAdSlot {...banner} />
          </GridItem>
        ))
        : null}
    </ListView>
  );
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type TeaserProps = {
  item: TeaserDataType,
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
      render={theme => (
        <Teaser
          onClick={
            biAction
              ? () => biAction({ index, articleId: item.representedContent, })
              : null
          }
          data={item}
          gutter={0}
          isStacked={[ { until: 's', value: true, }, { from: 'xl', value: true, }, ]}
        >
          <TeaserMedia
            data={item}
            width={[
              { from: 's', until: 'l', value: 8 / 12, },
              { from: 'l', until: 'xl', value: 5 / 7, },
            ]}
            onClick={
              biAction
                ? () => biAction({ index, articleId: item.representedContent, })
                : null
            }
            isStacked
          >
            <Image
              data={item.image}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                sizes: [
                  { from: 'xl', size: '384px', },
                  { from: 'l', size: '400px', },
                  { from: 'm', size: '480px', },
                  { from: 's', size: '368px', },
                  { size: 'calc(100vw - 4rem)', },
                ],
                widths: [ 296, 350, 400, 368, 592, 960, ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={item}
            width={[
              { from: 's', until: 'l', value: 4 / 12, },
              { from: 'l', until: 'xl', value: 2 / 7, },
            ]}
            padding={[
              { until: 'xl', value: [ 1, 2, 0, 1, ], },
              { from: 'xl', value: [ 1, 2, 0, ], },
            ]}
            footerPadding={[
              { until: 'xl', value: [ 1, 2, 0, 1, ], },
              { from: 'xl', value: [ 1, 2, ], },
            ]}
            isStacked
            renderContent={data => (
              <TeaserHeader
                {...data}
                typeScale={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'l', value: 2, },
                  { from: 'l', value: 1, },
                ]}
                onClick={
                  biAction
                    ? () => biAction({ index, articleId: item.representedContent, })
                    : null
                }
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
                    paddingInlineEnd: '1rem',
                    extend: [ theme.type(-3), ],
                  }}
                  render="span"
                >
                  {' | '}
                  <TeaserTime publishDate={item.publishDate && new Date(item.publishDate)} />
                </FelaComponent>
                <CommentsCount
                  commentsCount={item.commentsCounts}
                  minCount={1}
                />
              </FelaComponent>
            )}
          />
        </Teaser>
      )}
    />
  );
}

HawkingTeaser.defaultProps = {
  biAction: null,
  lazyLoadImages: true,
};

function HawkingTeaser({ item, index, biAction, }: TeaserProps): Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={item}
          onClick={
            biAction
              ? () => biAction({ index, articleId: item.representedContent, })
              : null
          }
          miscStyles={{
            flexGrow: '1',
            type: -1,
          }}
          gridMiscStyles={{ alignContent: 'stretch', }}
        >
          <TeaserContent
            data={item}
            width={1}
            padding={[
              { until: 'l', value: [ 1, 2, 0, ], },
              { from: 'l', value: [ 1, 1, 0, ], },
            ]}
            footerPadding={[
              { until: 'l', value: [ 1, 2, ], },
              { from: 'l', value: [ 1, 1, ], },
            ]}
            footerMiscStyles={{
              fontWeight: '700',
              type: -3,
              color: theme.color('neutral', '-3'),
            }}
            renderContent={data => (
              <TeaserHeader
                {...data}
                typeScale={[
                  { until: 'xl', value: 0, },
                  { from: 'xl', value: -1, },
                ]}
                onClick={
                  biAction
                    ? () => biAction({ index, articleId: item.representedContent, })
                    : null
                }
              />
            )}
            renderFooter={() => (
              <CommentsCount commentsCount={item.commentsCounts} />
            )}
          />
        </Teaser>
      )}
    />
  );
}
