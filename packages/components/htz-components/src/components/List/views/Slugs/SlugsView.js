// @flow
import { FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
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
import { isTeaser, } from '../../../../utils/validateType';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';

type Props = {
  list: ListDataType,
  gaAction: () => void,
  biAction: ListBiActionType,
  lazyLoadImages: boolean,
};

Slugs.defaultProps = {
  gaAction: null,
  lazyLoadImages: true,
};

export default function Slugs({
  list,
  loadPriority,
  gaAction,
  biAction,
  lazyLoadImages,
}: Props): React.Node {
  const { items, dfp, } = list;
  const { extraLinks, title, url, } = list;
  return (
    <ListView
      gutter={4}
      innerBackgroundColor="transparent"
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
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
        <Grid gutter={4}>
          <GridItem
            width={[
              { until: 'l', value: 1, },
              { from: 'l', until: 'xl', value: 5 / 12, },
              { from: 'xl', value: 6 / 12, },
            ]}
            miscStyles={{ order: [ { from: 'l', value: 1, }, ], }}
          >
            <MainTeaser data={items[0]} {...{ lazyLoadImages, biAction, }} />
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
              {...{ lazyLoadImages, biAction, }}
            />

            {/* Textual Teaser */}
            <TextualTeaser data={items[3]} {...{ lazyLoadImages, biAction, }} />
          </GridItem>
        </Grid>
      </GridItem>

      {/* DFP */}
      {dfp && dfp.length > 0
        ? dfp.map(banner => (
          <GridItem
            key={banner.contentId}
            width={[ { until: 'xl', value: 1, }, { from: 'xl', value: 2 / 12, }, ]}
          >
            <GeneralAdSlot {...banner} styleRule={bannerStyle} />
          </GridItem>
        ))
        : null}
    </ListView>
  );
}

function bannerStyle({ theme, }) {
  return {
    extend: [
      theme.mq({ until: 's', }, { ':not(:empty)': { marginTop: '2rem', }, }),
      theme.mq(
        { from: 's', until: 'xl', },
        { ':not(:empty)': { marginTop: '4rem', }, }
      ),
    ],
  };
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type TeaserProps = {
  data: TeaserDataType,
  index: 0 | 1 | 2 | 3,
  lazyLoadImages?: boolean,
  biAction: ListBiActionType,
};

MainTeaser.defaultProps = { lazyLoadImages: true, index: 0, };

function MainTeaser({
  data,
  lazyLoadImages,
  biAction,
}: TeaserProps): React.Node {
  const articleId = data.contentId;

  return isTeaser(data) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={() => biAction({ index: 0, articleId, })}
          isStacked
          miscStyles={{
            marginInlineEnd: [ { from: 's', until: 'l', value: 'auto', }, ],
            marginInlineStart: [ { from: 's', until: 'l', value: 'auto', }, ],
            maxWidth: [ { from: 's', until: 'l', value: '68rem', }, ],
          }}
        >
          <TeaserMedia data={data} isStacked>
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
            footerPadding={[
              { until: 's', value: [ 0, 2, 2, ], },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            isStacked
            gridItemMiscStyles={{ alignItems: 'center', }}
            footerMiscStyles={{
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            renderContent={() => (
              <TeaserHeader
                {...data}
                isCentered
                typeScale={[
                  { until: 's', value: 1, },
                  { from: 'l', until: 'xl', value: 2, },
                  { from: 'xl', value: 3, },
                ]}
              />
            )}
            renderFooter={() => <Footer data={data} hasCommentsOnMobile />}
          />
        </Teaser>
      )}
    />
  ) : null;
}

TwoUpTeaser.defaultProps = { lazyLoadImages: true, };
function TwoUpTeaser({
  data,
  lazyLoadImages,
  biAction,
  index,
}: TeaserProps): React.Node {
  const articleId = data.contentId;

  return isTeaser(data) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={() => biAction({ index, articleId, })}
          isStacked={[ { until: 's', value: true, }, ]}
        >
          <TeaserMedia
            data={data}
            width={[
              { from: 's', until: 'l', value: 4 / 12, },
              { from: 'l', until: 'xl', value: 3 / 7, },
              { from: 'xl', value: 9 / 16, },
            ]}
            isStacked={[ { until: 's', value: true, }, ]}
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
            isStacked={[ { until: 's', value: true, }, ]}
            footerPadding={[
              { until: 's', value: [ 1, 1, 1, ], },
              { from: 's', value: [ 1, 2, 1, ], },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            renderContent={() => (
              <TeaserHeader
                {...data}
                typeScale={[
                  { until: 's', value: -1, },
                ]}
              />
            )}
            renderFooter={() => <Footer data={data} />}
          />
        </Teaser>
      )}
    />
  ) : null;
}

TextualTeaser.defaultProps = { lazyLoadImages: true, index: 3, };
function TextualTeaser({ data, biAction, }: TeaserProps): React.Node {
  const articleId = data.contentId;

  return isTeaser(data) ? (
    <Teaser
      data={data}
      onClick={() => biAction({ index: 3, articleId, })}
      miscStyles={{
        alignItems: 'stretch',
        display: 'flex',
        flexGrow: '1',
        height: 'auto',
        marginTop: [ { until: 's', value: '1rem', }, { from: 's', value: '4rem', }, ],
      }}
    >
      <TeaserContent
        data={data}
        padding={[
          { until: 's', value: [ 1, 2, 0, ], },
          { from: 's', value: [ 2, 2, 0, ], },
        ]}
        footerPadding={[
          { until: 's', value: [ 1, 2, ], },
          { from: 's', value: [ 1, 2, ], },
        ]}
        footerColor={[ 'neutral', '-3', ]}
        footerMiscStyles={{
          type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            {...data}
            typeScale={[
              { until: 's', value: -1, },
            ]}
          />
        )}
        renderFooter={() => <Footer data={data} hasCommentsOnMobile />}
      />
    </Teaser>
  ) : null;
}

type TwoUpProps = {
  data1: TeaserDataType,
  data2: TeaserDataType,
  lazyLoadImages: boolean,
  biAction: ListBiActionType,
};

TwoUp.defaultProps = { lazyLoadImages: true, };
function TwoUp({
  data1,
  data2,
  lazyLoadImages,
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
        <TwoUpTeaser data={data1} index={1} {...{ lazyLoadImages, biAction, }} />
      </GridItem>
      <GridItem width={[ { until: 's', value: 1 / 2, }, { from: 's', value: 1, }, ]}>
        <TwoUpTeaser data={data2} index={2} {...{ lazyLoadImages, biAction, }} />
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
        <React.Fragment>
          <TeaserAuthors
            authors={data.authors}
            miscStyles={{ fontWeight: 'bold', }}
          />
          <span> | </span>
          <TeaserTime {...data} />
        </React.Fragment>
      ) : null}
      <CommentsCount
        commentsCount={data.commentsCounts}
        miscStyles={{
          marginInlineStart: '1rem',
          display: hasCommentsOnMobile
            ? [ { until: 's', value: 'none', }, ]
            : undefined,
        }}
      />
      {data.rank ? (
        <TeaserRank
          rank={data.rank}
          miscStyles={{
            marginInlinestart: '1rem',
            display: hasRankOnMobile
              ? [ { until: 's', value: 'none', }, ]
              : undefined,
          }}
        />
      ) : null}
    </React.Fragment>
  );
}
