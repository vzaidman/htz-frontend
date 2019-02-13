// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import Image from '../../../Image/Image';
import Picture from '../../../Image/Picture';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import StickyListViewHeader from '../../../ListViewHeader/StickyListViewHeader';
import ListView from '../../../ListView/ListView';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserSubtitle from '../../../TeaserSubtitle/TeaserSubtitle';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import getImageAssets from '../../../../utils/getImageAssets';
import TeaserRank from '../../../TeaserRank/TeaserRank';
import getPictureAssets from '../../../../utils/getPictureAssets';

type Props = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

DonbotList.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};

export default function DonbotList({
  list,
  biAction,
  gaAction,
  lazyLoadImages,
}: Props): Node {
  const { items, extraLinks, ...restOfList } = list;
  const mainTeaser = items && items.length > 0 && items[0];
  const teaser1 = items && items.length > 1 && items[1];
  const teaser2 = items && items.length > 2 && items[2];
  const teaser3 = items && items.length > 3 && items[3];
  const teaser4 = items && items.length > 4 && items[4];

  return (
    <ListView
      gutter={4}
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
    >
      {/* LIST HEADER */}
      <StickyListViewHeader
        {...restOfList}
        extraLinks={extraLinks ? extraLinks.slice(0, 5) : null}
        biAction={biAction}
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
        miscStyles={{ marginBottom: [ { until: 's', value: '1rem', }, ], }}
      />

      {/* LIST CONTENT */}
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
        miscStyles={{ display: 'flex', }}
      >
        <Grid
          gutter={4}
          rowSpacing={[
            { until: 's', value: { amount: 2, }, },
            { from: 's', until: 'l', value: { amount: 4, }, },
          ]}
        >
          {/* MAIN TEASER */}
          <GridItem
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 6 / 10, }, ]}
            miscStyles={{ display: 'flex', }}
          >
            {mainTeaser && (
              <DonbotMainTeaser
                item={mainTeaser}
                lazyLoadImages={lazyLoadImages}
                biAction={biAction}
              />
            )}
          </GridItem>

          {/* QUADRUPLETS */}
          <GridItem
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 4 / 10, }, ]}
            miscStyles={{ display: 'flex', }}
          >
            <Grid
              gutter={0}
              rowSpacing={[
                { until: 's', value: { amount: 2, nUp: 2, }, },
                { from: 's', value: { amount: 4, nUp: 2, }, },
              ]}
            >
              <GridItem
                stretchContent
                width={1 / 2}
                miscStyles={{
                  paddingInlineEnd: [
                    { until: 's', value: 1, },
                    { from: 's', value: 2, },
                  ],
                }}
              >
                {teaser1 && (
                  <DonbotTeaser
                    index={1}
                    lazyLoadImages={lazyLoadImages}
                    item={teaser1}
                    biAction={biAction}
                  />
                )}
              </GridItem>
              <GridItem
                stretchContent
                width={1 / 2}
                miscStyles={{
                  paddingInlineStart: [
                    { until: 's', value: 1, },
                    { from: 's', value: 2, },
                  ],
                }}
              >
                {teaser2 && (
                  <DonbotTeaser
                    index={2}
                    lazyLoadImages={lazyLoadImages}
                    item={teaser2}
                    biAction={biAction}
                  />
                )}
              </GridItem>
              <GridItem
                stretchContent
                width={1 / 2}
                miscStyles={{
                  paddingInlineEnd: [
                    { until: 's', value: 1, },
                    { from: 's', value: 2, },
                  ],
                }}
              >
                {teaser3 && (
                  <DonbotTeaser
                    index={3}
                    lazyLoadImages={lazyLoadImages}
                    item={teaser3}
                    biAction={biAction}
                  />
                )}
              </GridItem>
              <GridItem
                stretchContent
                width={1 / 2}
                miscStyles={{
                  paddingInlineStart: [
                    { until: 's', value: 1, },
                    { from: 's', value: 2, },
                  ],
                }}
              >
                {teaser4 && (
                  <DonbotTeaser
                    index={4}
                    lazyLoadImages={lazyLoadImages}
                    item={teaser4}
                    biAction={biAction}
                  />
                )}
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </GridItem>
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

DonbotMainTeaser.defaultProps = { lazyLoadImages: true, index: 0, };

function DonbotMainTeaser({
  item,
  lazyLoadImages,
  biAction,
}: TeaserProps): Node {
  const articleId = item.representedContent || item.contentId;
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={item}
          gutter={0}
          onClick={biAction ? () => biAction({ index: 0, articleId, }) : null}
          isStacked
        >
          <TeaserMedia
            data={item}
            onClick={biAction ? () => biAction({ index: 0, articleId, }) : null}
            isStacked
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: item.image,
                defaultImgOptions: {
                  sizes: 'calc(100vw - 4rem)',
                  aspect: 'square',
                  widths: [ 360, 420, 580, ],
                },
                sources: [
                  {
                    aspect: 'headline',
                    from: 's',
                    sizes: [
                      { from: 'xl', size: '590px', },
                      { from: 'l', size: '476px', },
                      { from: 'm', size: '720px', },
                      { from: 's', size: '552px', },
                    ],
                    widths: [ 720, 590, 552, 476, ],
                  },
                ],
              })}
            />
          </TeaserMedia>

          <TeaserContent
            data={item}
            padding={[
              { until: 'xl', value: [ 2, 2, 0, ], },
              { from: 'xl', value: [ 2, 4, 0, ], },
            ]}
            isStacked
            gridItemMiscStyles={{ alignItems: 'center', }}
            footerPadding={[
              { until: 'xl', value: [ 1, 2, ], },
              { from: 'xl', value: [ 2, 4, 1, ], },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            renderContent={() => (
              <React.Fragment>
                <TeaserHeader
                  {...item}
                  isCentered
                  typeScale={[
                    { until: 's', value: 1, },
                    { from: 's', until: 'l', value: 2, },
                    { from: 'l', until: 'xl', value: 3, },
                    { from: 'xl', value: 2, },
                  ]}
                  onClick={
                    biAction ? () => biAction({ index: 0, articleId, }) : null
                  }
                />
                <TeaserSubtitle
                  {...item}
                  typeScale={[
                    { until: 'xl', value: 0, },
                    { from: 'xl', value: -1, },
                  ]}
                  miscStyles={{
                    display: [ { until: 's', value: 'none', }, ],
                    fontWeight: '400',
                    marginTop: '1rem',
                    textAlign: 'center',
                  }}
                />
              </React.Fragment>
            )}
            renderFooter={() => (
              <Footer data={item} hasCommentsOnMobile hasRankOnMobile />
            )}
          />
        </Teaser>
      )}
    />
  );
}

DonbotTeaser.defaultProps = { biAction: null, lazyLoadImages: true, };
function DonbotTeaser({
  item,
  index,
  biAction,
  lazyLoadImages,
}: TeaserProps): Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={item}
          onClick={
            biAction
              ? () => biAction({
                index,
                articleId: item.representedContent || item.contentId,
              })
              : null
          }
          isStacked
        >
          <TeaserMedia
            data={item}
            onClick={
              biAction
                ? () => biAction({
                  index,
                  articleId: item.representedContent || item.contentId,
                })
                : null
            }
            isStacked
          >
            <Image
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                sizes: [
                  { from: 'xl', size: '178px', },
                  { from: 'l', size: '143px', },
                  { from: 'm', size: '348px', },
                  { from: 's', size: '264px', },
                  { size: 'calc(50vw - 6rem)', },
                ],
                widths: [ 150, 180, 200, 285, 350, 380, 565, ],
              })}
              data={item.image}
            />
          </TeaserMedia>

          <TeaserContent
            data={item}
            padding={[ 1, 1, 0, ]}
            footerPadding={1}
            footerMiscStyles={{
              fontWeight: '700',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
              color: theme.color('neutral', '-3'),
            }}
            isStacked
            renderContent={data => (
              <TeaserHeader
                {...data}
                typeScale={[
                  { until: 's', value: 0, },
                  { from: 'xl', value: -1, },
                ]}
                onClick={
                  biAction
                    ? () => biAction({
                      index,
                      articleId: item.representedContent || item.contentId,
                    })
                    : null
                }
              />
            )}
            renderFooter={() => (
              <CommentsCount
                commentsCount={item.commentsCounts}
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}

type FooterProps = {
  data: TeaserDataType,
  hasCommentsOnMobile: boolean,
  hasRankOnMobile: boolean,
};

Footer.defaultProps = {
  hasCommentsOnMobile: false,
  hasRankOnMobile: false,
};

function Footer({
  data,
  hasCommentsOnMobile,
  hasRankOnMobile,
}: FooterProps): Node {
  return (
    <React.Fragment>
      {data.authors ? (
        <span style={{ marginInlineEnd: '1rem', }}>
          <TeaserAuthors
            authors={data.authors}
            miscStyles={{ fontWeight: 'bold', }}
          />
          {(data.commentsCounts && data.commentsCounts > 4) || data.rank ? (
            <span> | </span>
          ) : null}
        </span>
      ) : null}
      <CommentsCount
        commentsCount={data.commentsCounts}
        miscStyles={{
          marginInlineEnd: '1rem',
          display: hasCommentsOnMobile
            ? [ { until: 's', value: 'none', }, ]
            : undefined,
        }}
      />
      {data.rank ? (
        <TeaserRank
          rank={data.rank}
          miscStyles={{
            display: hasRankOnMobile
              ? [ { until: 's', value: 'none', }, ]
              : undefined,
          }}
        />
      ) : null}
    </React.Fragment>
  );
}
