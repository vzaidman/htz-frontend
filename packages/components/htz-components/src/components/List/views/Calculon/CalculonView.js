// @flow

import { FelaComponent, FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type {
  ListDataType,
  ListItemType,
} from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import { isTeaser, } from '../../utils/validateTeaser';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
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
  const [ teaser1Data, teaser2Data, teaser3Data, teaser4Data, teaser5Data, ] = (list && list.items) || [];

  return (
    <ListView gutter={4} innerBackgroundColor="transparent">
      {/* Header */}
      <GridItem
        stretchContent
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
      >
        <ListViewHeader {...list} />
      </GridItem>

      {/* Items */}
      <GridItem
        stretchContent
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
      >
        <Section isFragment>
          <Grid
            gutter={4}
            rowSpacing={[
              { until: 's', value: { amount: 1, }, },
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
              <Teaser1 data={teaser1Data} />
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
              <Teaser2 data={teaser2Data} />
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
              <Teaser3 data={teaser3Data} />
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
              <Teaser4 data={teaser4Data} />
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
              <Teaser5 data={teaser5Data} />
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
  data: ListItemType,
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
  return isTeaser(data) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={
            biAction
              ? () => biAction({ index: 0, articleId: data.contentId, })
              : null
          }
          gridMiscStyles={{
            flexDirection: [ { until: 'l', value: 'column', }, ],
          }}
        >
          {data.image ? (
            <TeaserMedia
              data={data}
              width={[
                { from: 'l', until: 'xl', value: 7 / 10, },
                { from: 'xl', value: 6 / 8, },
              ]}
              miscStyles={{
                flexBasis: [ { until: 'l', value: 'auto', }, ],
                flexGrow: [ { until: 'l', value: '0', }, ],
              }}
            >
              <Image
                data={data.image}
                lazyLoad={lazyLoadImages}
                imgOptions={getImageAssets({
                  bps: theme.bps,
                  aspect: 'headline',
                  sizes: [
                    { from: 'xl', size: '621px', },
                    { from: 'l', size: '591px', },
                    { from: 'm', size: '504px', },
                    { from: 's', size: '392px', },
                    { size: 'calc(100vw - 4rem)', },
                  ],
                  widths: [ 621, 591, 504, 392, 400, ],
                })}
              />
            </TeaserMedia>
          ) : null}
          <TeaserContent
            data={data}
            width={[
              { from: 'l', until: 'xl', value: 3 / 10, },
              { from: 'xl', value: 2 / 8, },
            ]}
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 2, 1, 1, ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            gridItemMiscStyles={{
              flexBasis: [ { until: 'l', value: 'auto', }, ],
              flexGrow: [ { until: 'l', value: '1', }, ],
            }}
            renderContent={() => (
              <TeaserHeader
                typeScale={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'l', value: 2, },
                  { from: 'l', until: 'xl', value: 3, },
                  { from: 'xl', value: 2, },
                ]}
                {...data}
              />
            )}
            renderFooter={() => (isTeaser(data) ? (
              <Footer data={data} showAuthor isRankOnTop />
            ) : null)
            }
          />
        </Teaser>
      )}
    />
  ) : null;
}

Teaser2.defaultProps = teaserDefaultProps;
function Teaser2({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return isTeaser(data) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={1}
          gridMiscStyles={{
            flexWrap: 'nowrap',
            flexDirection: [
              { from: 's', until: 'l', value: 'column', },
              { from: 'xl', value: 'column', },
            ],
          }}
          onClick={
            biAction
              ? () => biAction({ index: 1, articleId: data.contentId, })
              : null
          }
        >
          {data.image ? (
            <TeaserMedia
              data={data}
              width={[
                { until: 's', value: 17, },
                { from: 'l', until: 'xl', value: 2 / 5, },
              ]}
              miscStyles={{
                flexBasis: [
                  { from: 's', until: 'l', value: 'auto', },
                  { from: 'xl', value: 'auto', },
                ],
                flexGrow: [
                  { from: 's', until: 'l', value: '0', },
                  { from: 'xl', value: '0', },
                ],
              }}
            >
              <Picture
                lazyLoad={lazyLoadImages}
                {...getPictureAssets({
                  bps: theme.bps,
                  imgData: data.image,
                  defaultImgOptions: {
                    sizes: [
                      { from: 'l', size: '158px', },
                      { from: 'm', size: '240px', },
                      { from: 's', size: '184px', },
                      { size: '17rem', },
                    ],
                    aspect: 'square',
                    widths: [ 102, 158, 184, 204, 240, 400, ],
                  },
                  sources: [
                    {
                      aspect: 'vertical',
                      from: 'xl',
                      sizes: '188px',
                      widths: [ 188, ],
                    },
                  ],
                })}
              />
            </TeaserMedia>
          ) : null}
          <TeaserContent
            data={data}
            width={[ { from: 'l', until: 'xl', value: 3 / 5, }, ]}
            padding={[ 1, 0, 0, 1, ]}
            padding={[ 1, 0, 1, 1, ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            gridItemMiscStyles={{
              flexBasis: [
                { from: 's', until: 'l', value: 'auto', },
                { from: 'xl', value: 'auto', },
              ],
              flexGrow: [
                { from: 's', until: 'l', value: '1', },
                { from: 'xl', value: '1', },
              ],
              flexShrink: [
                { from: 's', until: 'l', value: '0', },
                { from: 'xl', value: '0', },
              ],
            }}
            renderContent={() => (
              <TeaserHeader
                typeScale={[
                  { until: 's', value: -1, },
                  { from: 'xl', value: -1, },
                ]}
                {...data}
              />
            )}
            renderFooter={() => (isTeaser(data) ? <Footer data={data} /> : null)
            }
          />
        </Teaser>
      )}
    />
  ) : null;
}

Teaser3.defaultProps = teaserDefaultProps;
function Teaser3({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return isTeaser(data) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={1}
          onClick={
            biAction
              ? () => biAction({ index: 2, articleId: data.contentId, })
              : null
          }
          gridMiscStyles={{ flexWrap: 'nowrap', }}
        >
          {data.image ? (
            <TeaserMedia
              data={data}
              width={[
                { until: 's', value: 17, },
                { from: 's', until: 'l', value: 4 / 12, },
                { from: 'l', until: 'xl', value: 2 / 5, },
                { from: 'xl', value: 2 / 4, },
              ]}
            >
              <Picture
                lazyLoad={lazyLoadImages}
                {...getPictureAssets({
                  bps: theme.bps,
                  imgData: data.image,
                  defaultImgOptions: {
                    sizes: [
                      { from: 'l', until: 'xl', size: '158px', },
                      { size: '17rem', },
                    ],
                    aspect: 'square',
                    widths: [ 102, 158, 204, ],
                  },
                  sources: [
                    {
                      aspect: 'regular',
                      from: 'xl',
                      sizes: '202px',
                      widths: [ 202, ],
                    },
                    {
                      aspect: 'regular',
                      from: 's',
                      until: 'l',
                      sizes: [
                        { from: 's', until: 'm', size: '188px', },
                        { from: 'm', until: 'l', size: '256px', },
                      ],
                      widths: [ 188, 376, 256, 512, ],
                    },
                  ],
                })}
              />
            </TeaserMedia>
          ) : null}
          <TeaserContent
            data={data}
            width={[
              { from: 's', until: 'l', value: 8 / 12, },
              { from: 'l', until: 'xl', value: 3 / 5, },
              { from: 'xl', value: 2 / 4, },
            ]}
            padding={[ 1, 0, 0, 1, ]}
            footerPadding={[ 1, 0, 1, 1, ]}
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
                  { until: 's', value: -1, },
                  { from: 'xl', value: -1, },
                ]}
                {...data}
              />
            )}
            renderFooter={() => (isTeaser(data) ? <Footer data={data} /> : null)
            }
          />
        </Teaser>
      )}
    />
  ) : null;
}

Teaser4.defaultProps = teaserDefaultProps;
function Teaser4({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return isTeaser(data) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={1}
          onClick={
            biAction
              ? () => biAction({ index: 3, articleId: data.contentId, })
              : null
          }
          gridMiscStyles={{ flexWrap: 'nowrap', }}
        >
          {data.image ? (
            <TeaserMedia
              data={data}
              width={[ { until: 'xl', value: 0, }, ]}
              miscStyles={{ display: [ { until: 'l', value: 'none', }, ], }}
            >
              <Image
                data={data.image}
                lazyLoad={lazyLoadImages}
                imgOptions={{
                  transforms: { aspect: 'regular', width: 198, },
                }}
              />
            </TeaserMedia>
          ) : null}
          <TeaserContent
            data={data}
            width={[
              { from: 's', until: 'l', value: 8 / 12, },
              { from: 'l', until: 'xl', value: 3 / 5, },
              { from: 'xl', value: 2 / 4, },
            ]}
            padding={[
              { until: 'xl', value: [ 1, 1, 0, ], },
              { from: 'xl', value: [ 1, 0, 0, 1, ], },
            ]}
            footerPadding={[
              { until: 'xl', value: 1, },
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
                  { until: 's', value: -1, },
                  { from: 'xl', value: -1, },
                ]}
                {...data}
              />
            )}
            renderFooter={() => (isTeaser(data) ? <Footer data={data} /> : null)
            }
          />
        </Teaser>
      )}
    />
  ) : null;
}

Teaser5.defaultProps = teaserDefaultProps;
function Teaser5({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return isTeaser(data) ? (
    <Teaser
      data={data}
      gutter={1}
      onClick={
        biAction
          ? () => biAction({ index: 3, articleId: data.contentId, })
          : null
      }
    >
      <TeaserContent
        data={data}
        padding={[ 1, 1, 0, ]}
        footerPadding={1}
        footerColor={[ 'neutral', '-3', ]}
        footerMiscStyles={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            typeScale={[ { until: 's', value: -1, }, { from: 'xl', value: -1, }, ]}
            {...data}
          />
        )}
        renderFooter={() => (isTeaser(data) ? <Footer data={data} /> : null)}
      />
    </Teaser>
  ) : null;
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
