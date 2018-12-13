// @flow
import { FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { BiActionType, } from '../../../../flowTypes/BiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserRank from '../../../TeaserRank/TeaserRank';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import getImageAssets from '../../../../utils/getImageAssets';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: ?() => void,
  biAction: ?BiActionType,
  lazyLoadImages: boolean,
};

Slugs.defaultProps = {
  gaAction: null,
  biAction: null,
  lazyLoadImages: true,
};

type ClickActionOpts = {
  index: number,
  articleId: string,
  listId: string,
  biAction: BiActionType,
};

export default function Slugs({
  list,
  listId,
  gaAction,
  biAction,
  lazyLoadImages,
}: Props): React.Node {
  const { items, } = list;
  const { extraLinks, title, url, } = list;
  return (
    <FelaTheme
      render={theme => (
        <ListView
          gutter={4}
          innerBackgroundColor="transparent"
          miscStyles={{
            paddingInlineStart: [
              { until: 's', value: '2rem', },
              { from: 's', value: '4rem', },
            ],
            paddingInlineEnd: [
              { until: 's', value: '2rem', },
              { from: 's', value: '4rem', },
            ],
          }}
        >
          {/* List Meta Title */}
          <GridItem width={1}>
            <ListViewHeader
              url={url}
              title={title}
              extraLinks={extraLinks}
              isHorizontal
              miscStyles={{
                marginBottom: [
                  { until: 's', value: '1rem', },
                  { from: 's', until: 'l', value: '5rem', },
                  { from: 'l', value: '2rem', },
                ],
              }}
            />
          </GridItem>

          {/* TEASERS */}
          <GridItem
            width={[ { until: 'xl', value: 1, }, { from: 'xl', value: 10 / 12, }, ]}
          >
            {/* Main teaser */}
            <Grid gutter={4} miscStyles={{ paddingBottom: '3rem', }}>
              <GridItem
                width={[
                  { until: 'l', value: 1, },
                  { from: 'l', until: 'xl', value: 5 / 12, },
                  { from: 'xl', value: 6 / 12, },
                ]}
                miscStyles={{ order: [ { from: 'l', value: 1, }, ], }}
              >
                <MainTeaser
                  data={items[0]}
                  {...{ lazyLoadImages, biAction, listId, }}
                />
              </GridItem>

              {/* Secondary teasers */}
              <GridItem
                stretchContent
                width={[
                  { until: 'l', value: 1, },
                  { from: 'l', until: 'xl', value: 7 / 12, },
                  { from: 'xl', value: 6 / 12, },
                ]}
              >
                <TwoUp
                  data1={items[1]}
                  data2={items[2]}
                  {...{ lazyLoadImages, biAction, listId, }}
                />

                {/* Textual Teaser */}
                <TextualTeaser
                  data={items[3]}
                  {...{ lazyLoadImages, biAction, listId, }}
                />
              </GridItem>
            </Grid>
          </GridItem>

          {/* DFP ! */}
          <GridItem
            width={[ { until: 'xl', value: 1, }, { from: 'xl', value: 2 / 12, }, ]}
            miscStyles={{
              marginBottom: [
                { until: 's', value: '2rem', },
                { from: 's', value: '4rem', },
              ],
              marginTop: [
                { until: 's', value: '2rem', },
                { from: 's', until: 'xl', value: '4rem', },
              ],
            }}
          >
            <div style={{ backgroundColor: 'yellow', }}>DFP! WIP!</div>
          </GridItem>
        </ListView>
      )}
    />
  );
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type TeaserProps = {
  data: TeaserDataType,
  index: 0 | 1 | 2 | 3,
  lazyLoadImages?: boolean,
  listId: string,
  biAction: ?BiActionType,
};

MainTeaser.defaultProps = { lazyLoadImages: true, index: 0, };

function MainTeaser({
  data,
  lazyLoadImages,
  listId,
  biAction,
}: TeaserProps): React.Node {
  const articleId = data.contentId;

  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={
            biAction
              ? () => clickAction({ index: 0, articleId, listId, biAction, })
              : null
          }
          miscStyles={{
            marginInlineEnd: [ { from: 's', until: 'l', value: 'auto', }, ],
            marginInlineStart: [ { from: 's', until: 'l', value: 'auto', }, ],
            maxWidth: [ { from: 's', until: 'l', value: '68rem', }, ],
          }}
          gridMiscStyles={{ flexDirection: 'column', flexWrap: 'nowrap', }}
        >
          <TeaserMedia
            data={data}
            miscStyles={{ flexGrow: '0', flexShrink: '0', }}
          >
            <Image
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'square',
                sizes: [
                  { from: 'xl', size: '487px', },
                  { from: 'l', size: '393px', },
                  { from: 's', size: '408px', },
                  { size: 'calc(100vw - 4rem)', },
                ],
                widths: [ 680, 600, 487, 293, 408, ],
              })}
              data={data.image}
            />
          </TeaserMedia>

          <TeaserContent
            data={data}
            padding={[ 1, 2, 0, ]}
            footerColor={[ 'neutral', '-3', ]}
            gridItemMiscStyles={{ alignItems: 'center', flexBasis: 'auto', }}
            footerMiscStyles={{ type: -2, }}
            renderContent={() => (
              <TeaserHeader
                {...data}
                isCentered
                typeScale={[
                  { from: 'l', until: 'xl', value: 2, },
                  { from: 'xl', value: 3, },
                ]}
              />
            )}
            renderFooter={() => (
              <Footer data={data} hasCommentsOnMobile hasRankOnMobile />
            )}
          />
        </Teaser>
      )}
    />
  );
}

TwoUpTeaser.defaultProps = { lazyLoadImages: true, };
function TwoUpTeaser({
  data,
  lazyLoadImages,
  listId,
  biAction,
  index,
}: TeaserProps): React.Node {
  const articleId = data.contentId;

  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={
            biAction
              ? () => clickAction({ index, articleId, listId, biAction, })
              : null
          }
          gridMiscStyles={{ flexDirection: [ { until: 's', value: 'column', }, ], }}
        >
          <TeaserMedia
            data={data}
            width={[
              { from: 's', until: 'l', value: 4 / 12, },
              { from: 'l', until: 'xl', value: 3 / 7, },
              { from: 'xl', value: 9 / 16, },
            ]}
          >
            <Image
              lazyLoad={lazyLoadImages}
              imgOptions={{
                ...getImageAssets({
                  bps: theme.bps,
                  aspect: 'regular',
                  sizes: [
                    { from: 'xl', size: '274px', },
                    { from: 'm', size: '240px', },
                    { from: 's', size: '184px', },
                    { size: 'calc(50vw - 2.5rem)', },
                  ],
                  widths: [ 650, 600, 500, 400, 274, 240, 184, ],
                }),
              }}
              data={data.image}
            />
          </TeaserMedia>
          <TeaserContent
            data={data}
            padding={[
              { until: 's', value: [ 1, 1, 0, ], },
              { from: 's', value: [ 1, 2, 0, ], },
            ]}
            gridItemMiscStyles={{
              flexBasis: [ { until: 's', value: 'auto', }, ],
              flexGrow: [ { until: 's', value: '1', }, ],
            }}
            footerPadding={[
              { until: 's', value: [ 2, 1, 1, ], },
              { from: 's', value: [ 2, 2, 1, ], },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{ type: -2, }}
            renderContent={() => <TeaserHeader {...data} />}
            renderFooter={() => <Footer data={data} />}
          />
        </Teaser>
      )}
    />
  );
}

TextualTeaser.defaultProps = { lazyLoadImages: true, index: 3, };
function TextualTeaser({ data, listId, biAction, }: TeaserProps): React.Node {
  const articleId = data.contentId;

  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          onClick={
            biAction
              ? () => clickAction({ index: 3, articleId, biAction, listId, })
              : null
          }
          miscStyles={{
            alignItems: 'stretch',
            display: 'flex',
            flexGrow: '1',
            height: 'auto',
            marginTop: [
              { until: 's', value: '1rem', },
              { from: 's', value: '4rem', },
            ],
          }}
        >
          <TeaserContent
            data={data}
            padding={[
              { until: 's', value: [ 1, 1, ], },
              { from: 's', value: [ 1, 2, ], },
            ]}
            footerPadding={[
              { until: 's', value: [ 2, 1, 1, ], },
              { from: 's', value: [ 3, 2, 1, ], },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{ type: -2, }}
            renderContent={() => <TeaserHeader {...data} />}
            renderFooter={() => <Footer data={data} hasCommentsOnMobile />}
          />
        </Teaser>
      )}
    />
  );
}

type TwoUpProps = {
  data1: TeaserDataType,
  data2: TeaserDataType,
  lazyLoadImages: boolean,
  listId: string,
  biAction: ?BiActionType,
};

TwoUp.defaultProps = { lazyLoadImages: true, };
function TwoUp({
  data1,
  data2,
  lazyLoadImages,
  listId,
  biAction,
}: TwoUpProps): React.Node {
  return (
    <Grid
      rowSpacing={[ { from: 's', value: { amount: 4, }, }, ]}
      gutter={1}
      miscStyles={{
        flexGrow: '0',
        marginTop: [
          { until: 's', value: '1rem', },
          { from: 's', until: 'l', value: '4rem', },
        ],
      }}
    >
      <GridItem width={[ { until: 's', value: 1 / 2, }, { from: 's', value: 1, }, ]}>
        <TwoUpTeaser
          data={data1}
          index={1}
          {...{ lazyLoadImages, listId, biAction, }}
        />
      </GridItem>
      <GridItem width={[ { until: 's', value: 1 / 2, }, { from: 's', value: 1, }, ]}>
        <TwoUpTeaser
          data={data2}
          index={2}
          {...{ lazyLoadImages, listId, biAction, }}
        />
      </GridItem>
    </Grid>
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
}: FooterProps): React.Node {
  return (
    <React.Fragment>
      {data.authors ? (
        <span style={{ marginInlineEnd: '1rem', }}>
          <TeaserAuthors
            authors={data.authors}
            miscStyles={{ fontWeight: 'bold', }}
          />
          <span> | </span>
          <TeaserTime {...data} />
        </span>
      ) : null}
      <CommentsCount
        commentsCount={data.commentsCounts}
        miscStyles={{
          marginInlineEnd: '1rem',
          ...(hasCommentsOnMobile
            ? { display: [ { until: 's', value: 'none', }, ], }
            : {}),
        }}
      />
      {data.rank ? (
        <TeaserRank
          rank={data.rank}
          miscStyles={{
            display: [ { until: 's', value: 'none', }, ],
          }}
        />
      ) : null}
    </React.Fragment>
  );
}

// /////////////////////////////////////////////////////////////////////
//                               UTILS                                //
// /////////////////////////////////////////////////////////////////////

function clickAction({
  index,
  articleId,
  listId,
  biAction,
}: ClickActionOpts): void {
  biAction({
    actionCode: 109,
    additionalInfo: {
      ArticleId: articleId,
      ListId: listId,
      NoInList: index + 1,
      ViewName: 'Mom',
    },
  });
}
