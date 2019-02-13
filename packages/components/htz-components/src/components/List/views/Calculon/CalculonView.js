// @flow

import { FelaComponent, FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import CommentsCount from '../../../CommentsCount/CommentsCount';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView';
import StickyListViewHeader from '../../../ListViewHeader/StickyListViewHeader';
import Picture from '../../../Image/Picture';
import Section from '../../../AutoLevels/Section';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserRank from '../../../TeaserRank/TeaserRank';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import getImageAssets from '../../../../utils/getImageAssets';
import getPictureAssets from '../../../../utils/getPictureAssets';

type CalculonPropsType = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

Calculon.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};

export default function Calculon({
  list,
  lazyLoadImages,
  biAction,
  gaAction,
}: CalculonPropsType): React.Node {
  const { items, extraLinks, ...restOfList } = list;
  const [
    teaser1Data,
    teaser2Data,
    teaser3Data,
    teaser4Data,
    teaser5Data,
  ] = items;
  return (
    <ListView
      innerBackgroundColor="transparent"
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
      gutter={4}
    >
      {/* Header */}
      <StickyListViewHeader
        {...restOfList}
        extraLinks={extraLinks ? extraLinks.slice(0, 5) : null}
        biAction={biAction}
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
        miscStyles={{
          marginBottom: [ { until: 's', value: '1rem', }, ],
        }}
      />

      {/* Items */}
      <GridItem
        stretchContent
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
      >
        <Section isFragment>
          <Grid
            gutter={4}
            rowSpacing={[
              { until: 's', value: { amount: 2, }, },
              { from: 's', until: 'l', value: { amount: 4, nUp: 2, }, },
              { from: 'l', until: 'xl', value: { amount: 4, }, },
              { from: 'xl', value: { amount: 4, nUp: 2, }, },
            ]}
          >
            {/* Item 1 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 8 / 12, },
                { from: 'l', until: 'xl', value: 1, },
                { from: 'xl', value: 8 / 10, },
              ]}
            >
              <Teaser1 data={teaser1Data} biAction={biAction} />
            </GridItem>

            {/* Item 2 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 4 / 12, },
                { from: 'l', until: 'xl', value: 5 / 10, },
                { from: 'xl', value: 2 / 10, },
              ]}
            >
              <Teaser2 data={teaser2Data} biAction={biAction} />
            </GridItem>

            {/* Item 3 */}
            <GridItem
              stretchContent
              width={[
                { until: 'l', value: 1, },
                { from: 'l', until: 'xl', value: 5 / 10, },
                { from: 'xl', value: 4 / 10, },
              ]}
            >
              <Teaser3 data={teaser3Data} biAction={biAction} />
            </GridItem>

            {/* Item 4 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 6 / 12, },
                { from: 'l', until: 'xl', value: 5 / 10, },
                { from: 'xl', value: 4 / 10, },
              ]}
            >
              <Teaser4 data={teaser4Data} biAction={biAction} />
            </GridItem>

            {/* Item 5 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 6 / 12, },
                { from: 'l', until: 'xl', value: 5 / 10, },
                { from: 'xl', value: 2 / 10, },
              ]}
            >
              <Teaser5 data={teaser5Data} biAction={biAction} />
            </GridItem>
          </Grid>
        </Section>
      </GridItem>
    </ListView>
  );
}

// /////////////////////////////////////////////////////////////////////
//                         Teaser Components                          //
// /////////////////////////////////////////////////////////////////////

type TeaserPropsType = {
  data: TeaserDataType,
  lazyLoadImages?: boolean,
  biAction: ?ListBiActionType,
};

const teaserDefaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

Teaser1.defaultProps = teaserDefaultProps;

function Teaser1({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={
            biAction
              ? () => biAction({ index: 0, articleId: data.representedContent, })
              : null
          }
          isStacked={[ { until: 'l', value: true, }, ]}
        >
          <TeaserMedia
            data={data}
            width={[
              { from: 'l', until: 'xl', value: 7 / 10, },
              { from: 'xl', value: 6 / 8, },
            ]}
            isStacked={[ { until: 'l', value: true, }, ]}
          >
            <Image
              data={data.image}
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                sizes: [
                  { from: 'xl', size: '597px', },
                  { from: 'l', size: '567px', },
                  { from: 'm', size: '472px', },
                  { from: 's', size: '360px', },
                  { size: 'calc(100vw - 4rem)', },
                ],
                widths: [ 597, 567, 472, 360, 400, ],
              })}
              onClick={
                biAction
                  ? () => biAction({ index: 0, articleId: data.representedContent, })
                  : null
              }
            />
          </TeaserMedia>

          <TeaserContent
            data={data}
            width={[
              { from: 'l', until: 'xl', value: 3 / 10, },
              { from: 'xl', value: 2 / 8, },
            ]}
            padding={[
              { until: 's', value: [ 1, 1, 0, ], },
              { from: 's', until: 'l', value: [ 1, 2, 0, ], },
              { from: 'l', value: [ 2, 2, 0, ], },
            ]}
            footerPadding={[
              { until: 'l', value: 1, },
              { from: 'l', value: [ 1, 2, ], },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            isStacked={[ { until: 'l', value: true, }, ]}
            renderContent={() => (
              <TeaserHeader
                typeScale={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'l', value: 2, },
                  { from: 'l', until: 'xl', value: 3, },
                  { from: 'xl', value: 1, },
                ]}
                {...data}
                onClick={
                  biAction
                    ? () => biAction({
                      index: 0,
                      articleId: data.representedContent,
                    })
                    : null
                }
              />
            )}
            renderFooter={() => <Footer data={data} showAuthor isRankOnTop />}
          />
        </Teaser>
      )}
    />
  );
}

Teaser2.defaultProps = teaserDefaultProps;
function Teaser2({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={1}
          isStacked={[
            { from: 's', until: 'l', value: true, },
            { from: 'xl', value: true, },
          ]}
          onClick={
            biAction
              ? () => biAction({ index: 1, articleId: data.representedContent, })
              : null
          }
          gridMiscStyles={{ flexWrap: 'nowrap', }}
        >
          <TeaserMedia
            data={data}
            width={[
              { until: 's', value: 19, },
              { from: 'l', until: 'xl', value: 2 / 5, },
            ]}
            isStacked={[
              { from: 's', until: 'l', value: true, },
              { from: 'xl', value: true, },
            ]}
            onClick={
              biAction
                ? () => biAction({ index: 0, articleId: data.representedContent, })
                : null
            }
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: data.image,
                defaultImgOptions: {
                  sizes: [
                    { from: 'l', size: '154px', },
                    { from: 'm', size: '224px', },
                    { from: 's', size: '168px', },
                    { size: '18rem', },
                  ],
                  aspect: 'square',
                  widths: [ 108, 154, 168, 204, 224, 400, ],
                },
                sources: [
                  {
                    aspect: 'vertical',
                    from: 'xl',
                    sizes: '178px',
                    widths: [ 178, ],
                  },
                ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={data}
            width={[ { from: 'l', until: 'xl', value: 3 / 5, }, ]}
            padding={[
              { until: 's', value: [ 1, 0, 0, 1, ], },
              { from: 's', until: 'l', value: [ 1, 1, 0, 1, ], },
              { from: 'l', until: 'xl', value: [ 1, 0, 0, 1, ], },
              { from: 'xl', value: [ 1, 1, 0, 1, ], },
            ]}
            footerPadding={[
              { until: 's', value: [ 1, 0, 1, 1, ], },
              { from: 's', until: 'l', value: 1, },
              { from: 'l', until: 'xl', value: [ 1, 0, 1, 1, ], },
              { from: 'xl', value: 1, },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            isStacked={[
              { from: 's', until: 'l', value: true, },
              { from: 'xl', value: true, },
            ]}
            renderContent={() => (
              <TeaserHeader
                typeScale={[
                  { until: 's', value: 0, },
                  { form: 's', until: 'xl', value: 1, },
                  { from: 'xl', value: -1, },
                ]}
                {...data}
                onClick={
                  biAction
                    ? () => biAction({
                      index: 0,
                      articleId: data.representedContent,
                    })
                    : null
                }
              />
            )}
            renderFooter={() => <Footer data={data} />}
          />
        </Teaser>
      )}
    />
  );
}

Teaser3.defaultProps = teaserDefaultProps;
function Teaser3({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={1}
          onClick={
            biAction
              ? () => biAction({ index: 2, articleId: data.representedContent, })
              : null
          }
          gridMiscStyles={{ flexWrap: 'nowrap', }}
        >
          <TeaserMedia
            data={data}
            width={[
              { until: 's', value: 19, },
              { from: 's', until: 'l', value: 4 / 12, },
              { from: 'l', until: 'xl', value: 2 / 5, },
              { from: 'xl', value: 2 / 4, },
            ]}
            onClick={
              biAction
                ? () => biAction({ index: 0, articleId: data.representedContent, })
                : null
            }
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: data.image,
                defaultImgOptions: {
                  sizes: [
                    { from: 'l', until: 'xl', size: '154px', },
                    { size: '108px', },
                  ],
                  aspect: 'square',
                  widths: [ 108, 154, 216, ],
                },
                sources: [
                  {
                    aspect: 'regular',
                    from: 'xl',
                    sizes: '189px',
                    widths: [ 189, ],
                  },
                  {
                    aspect: 'regular',
                    from: 's',
                    until: 'l',
                    sizes: [
                      { from: 'm', until: 'l', size: '236px', },
                      { from: 's', until: 'm', size: '180px', },
                    ],
                    widths: [ 180, 376, 236, 512, ],
                  },
                ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={data}
            width={[
              { from: 's', until: 'l', value: 8 / 12, },
              { from: 'l', until: 'xl', value: 3 / 5, },
              { from: 'xl', value: 2 / 4, },
            ]}
            padding={[
              { until: 's', value: [ 1, 0, 0, 1, ], },
              { from: 's', until: 'l', value: [ 2, 2, 0, 1, ], },
              { from: 'l', value: [ 1, 0, 0, 1, ], },
            ]}
            footerPadding={[
              { until: 's', value: [ 1, 0, 1, 1, ], },
              { from: 's', until: 'l', value: [ 1, 2, 1, 1, ], },
              { from: 'l', value: [ 1, 0, 1, 1, ], },
            ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            renderContent={() => (
              <TeaserHeader
                typeScale={[
                  { until: 's', value: 0, },
                  { from: 's', until: 'xl', value: 1, },
                  { from: 'xl', value: -1, },
                ]}
                {...data}
                onClick={
                  biAction
                    ? () => biAction({
                      index: 0,
                      articleId: data.representedContent,
                    })
                    : null
                }
              />
            )}
            renderFooter={() => <Footer data={data} />}
          />
        </Teaser>
      )}
    />
);
}

Teaser4.defaultProps = teaserDefaultProps;
function Teaser4({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return (
    <Teaser
      data={data}
      gutter={1}
      onClick={
        biAction
          ? () => biAction({ index: 3, articleId: data.representedContent, })
          : null
      }
      gridMiscStyles={{ flexWrap: 'nowrap', }}
    >
      <TeaserMedia
        data={data}
        width={[ { until: 'xl', value: 0, }, ]}
        miscStyles={{ display: [ { until: 'l', value: 'none', }, ], }}
        onClick={
          biAction
            ? () => biAction({ index: 0, articleId: data.representedContent, })
            : null
        }
      >
        <Image
          data={data.image}
          lazyLoad={lazyLoadImages}
          imgOptions={{
            transforms: { aspect: 'regular', width: 189, },
          }}
        />
      </TeaserMedia>

      <TeaserContent
        data={data}
        width={[
          { from: 's', until: 'xl', value: 1, },
          { from: 'xl', value: 2 / 4, },
        ]}
        padding={[
          { until: 's', value: [ 1, 2, 0, ], },
          { from: 's', until: 'xl', value: [ 2, 2, 0, ], },
          { from: 'xl', value: [ 1, 0, 0, 1, ], },
        ]}
        footerPadding={[
          { until: 's', value: [ 1, 2, ], },
          { from: 's', until: 'xl', value: [ 2, 2, ], },
          { from: 'xl', value: [ 1, 0, 1, 1, ], },
        ]}
        footerColor={[ 'neutral', '-3', ]}
        footerMiscStyles={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            typeScale={[
              { until: 's', value: 0, },
              { from: 's', until: 'xl', value: 1, },
              { from: 'xl', value: -1, },
            ]}
            {...data}
            onClick={
              biAction
                ? () => biAction({ index: 0, articleId: data.representedContent, })
                : null
            }
          />
        )}
        renderFooter={() => <Footer data={data} />}
      />
    </Teaser>
  );
}

Teaser5.defaultProps = teaserDefaultProps;
function Teaser5({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return (
    <Teaser
      data={data}
      gutter={1}
      onClick={
        biAction
          ? () => biAction({ index: 3, articleId: data.representedContent, })
          : null
      }
      gridMiscStyles={{ alignContent: 'stretch', }}
    >
      <TeaserContent
        data={data}
        padding={[
          { until: 's', value: [ 1, 2, 0, ], },
          { from: 's', until: 'xl', value: [ 2, 2, 0, ], },
          { from: 'xl', value: [ 1, 1, 0, ], },
        ]}
        footerPadding={[
          { until: 's', value: [ 1, 2, ], },
          { from: 's', until: 'xl', value: [ 2, 2, ], },
          { from: 'xl', value: 1, },
        ]}
        footerColor={[ 'neutral', '-3', ]}
        footerMiscStyles={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            typeScale={[
              { until: 's', value: 0, },
              { from: 's', until: 'xl', value: 1, },
              { from: 'xl', value: -1, },
            ]}
            {...data}
            onClick={
              biAction
                ? () => biAction({ index: 0, articleId: data.representedContent, })
                : null
            }
          />
        )}
        renderFooter={() => <Footer data={data} />}
      />
    </Teaser>
  );
}

type FooterProps = {
  data: TeaserDataType,
  showAuthor: boolean,
  isRankOnTop: boolean,
};

Footer.defaultProps = { showAuthor: false, isRankOnTop: false, };
function Footer({ data, showAuthor, isRankOnTop, }: FooterProps): React.Node {
  return (
    <React.Fragment>
      {showAuthor && data.authors ? (
        <div>
          <FelaComponent
            style={{
              '&:after': {
                content: '"\\20|\\20"',
              },
            }}
            render="span"
          >
            <TeaserAuthors
              authors={data.authors}
              miscStyles={{ fontWeight: 'bold', }}
            />
          </FelaComponent>
          {data.publishDate || data.lastUpdate ? (
            <TeaserTime {...data} />
          ) : null}
          {' '}
        </div>
      ) : null}
      <CommentsCount commentsCount={data.commentsCounts} />
      {' '}
      {data.rank ? (
        <FelaComponent
          style={theme => ({
            flexBasis: 'auto',
            ...(isRankOnTop
              ? {
                extend: [
                  theme.mq(
                    { from: 'xl', },
                    { flexBasis: '100%', flexShrink: '0', order: '-1', }
                  ),
                ],
              }
              : {}),
          })}
          render="div"
        >
          <TeaserRank rank={data.rank} />
        </FelaComponent>
      ) : null}
    </React.Fragment>
  );
}
