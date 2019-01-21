// @flow
import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { rgba, } from '@haaretz/htz-css-tools';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import Card from '../../../Card/Card';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import Debug from '../../../Debug/Debug';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import H from '../../../AutoLevels/H';
import IconAlefLogoTransparent from '../../../Icon/icons/IconAlefLogoTransparent';
import IconAvatar from '../../../Icon/icons/IconAvatar';
import IconQuote from '../../../Icon/icons/IconQuote';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import Section from '../../../AutoLevels/Section';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserResponsiveText from '../../../TeaserResponsiveText/TeaserResponsiveText';
import getImageAssets from '../../../../utils/getImageAssets';

type SpawnPropsType = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

Spawn.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};

export default function Spawn({
  list,
  lazyLoadImages,
  biAction,
  gaAction,
}: SpawnPropsType): React.Node {
  const [
    comicData,
    editorialData,
    teaser1Data,
    teaser2Data,
    teaser3Data,
    teaser4Data,
    teaser5Data,
    quoteData,
  ] = (list && list.items) || [];
  return (
    <FelaTheme
      render={theme => (
        <ListView
          gutter={4}
          innerBackgroundColor="transparent"
          padding={[
            { until: 's', value: [ 0, 2, ], },
            { from: 's', value: [ 0, 4, ], },
          ]}
        >
          {/* LIST HEADER */}
          <GridItem
            stretchContent
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
          >
            <ListViewHeader {...list} />
          </GridItem>

          {/* Items */}
          <GridItem
            width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
            miscStyles={{ display: 'flex', flexWrap: 'wrap', }}
          >
            <Section isFragment>
              {/* COMIC (mobile only) */}
              {comicData ? (
                <Comic data={comicData} lazyLoadImages={lazyLoadImages} />
              ) : (
                <Debug>There is no data for the comic teaser</Debug>
              )}

              {/* TEASERS */}
              <Grid
                gutter={4}
                rowSpacing={[
                  { until: 's', value: { amount: 1, }, },
                  { from: 's', until: 'l', value: { amount: 4, }, },
                  { from: 'l', value: { amount: 4, nUp: 4, }, },
                ]}
              >
                {/* Editorial */}
                <GridItem
                  width={[
                    { until: 'l', value: 1, },
                    { from: 'l', value: 4 / 10, },
                  ]}
                  miscStyles={{ display: 'flex', }}
                >
                  {editorialData ? (
                    <Editorial data={editorialData} biAction={biAction} />
                  ) : (
                    <Debug>There is no data for the editorial teaser</Debug>
                  )}
                </GridItem>

                <GridItem
                  width={[
                    { until: 's', value: 1, },
                    { from: 's', until: 'l', value: 1 / 3, },
                    { from: 'l', value: 2 / 10, },
                  ]}
                  miscStyles={{ display: 'flex', }}
                >
                  {teaser1Data ? (
                    <OpEdTeaser
                      biAction={biAction}
                      data={teaser1Data}
                      index={2}
                      isStackedFromS
                      lazyLoadImages={lazyLoadImages}
                    />
                  ) : (
                    <Debug>There is no data for this teaser</Debug>
                  )}
                </GridItem>
                <GridItem
                  width={[
                    { until: 's', value: 1, },
                    { from: 's', until: 'l', value: 1 / 3, },
                    { from: 'l', value: 2 / 10, },
                  ]}
                  miscStyles={{ display: 'flex', }}
                >
                  {teaser2Data ? (
                    <OpEdTeaser
                      biAction={biAction}
                      data={teaser2Data}
                      index={3}
                      isStackedFromS
                      lazyLoadImages={lazyLoadImages}
                    />
                  ) : (
                    <Debug>There is no data for this teaser</Debug>
                  )}
                </GridItem>
                <GridItem
                  width={[
                    { until: 's', value: 1, },
                    { from: 's', until: 'l', value: 1 / 3, },
                    { from: 'l', value: 2 / 10, },
                  ]}
                  miscStyles={{ display: 'flex', }}
                >
                  {teaser3Data ? (
                    <OpEdTeaser
                      biAction={biAction}
                      data={teaser3Data}
                      index={4}
                      isStackedFromS
                      lazyLoadImages={lazyLoadImages}
                    />
                  ) : (
                    <Debug>There is no data for this teaser</Debug>
                  )}
                </GridItem>

                {/* Bottom Couple */}
                <GridItem
                  width={[
                    { until: 's', value: 1, },
                    { from: 's', until: 'l', value: 2 / 3, },
                    { from: 'l', value: 8 / 10, },
                  ]}
                  miscStyles={{
                    display: 'flex',
                    flexDirection: [ { until: 'l', value: 'column', }, ],
                    order: [ { until: 's', value: '1', }, ],
                  }}
                >
                  <Grid
                    gutter={4}
                    miscStyles={{
                      flexDirection: [ { until: 'l', value: 'column', }, ],
                      flexGrow: '1',
                    }}
                  >
                    <GridItem
                      width={[ { from: 'l', value: 1 / 2, }, ]}
                      miscStyles={{ display: 'flex', }}
                    >
                      {teaser4Data ? (
                        <OpEdTeaser
                          biAction={biAction}
                          data={teaser4Data}
                          index={5}
                          lazyLoadImages={lazyLoadImages}
                        />
                      ) : (
                        <Debug>There is no data for this teaser</Debug>
                      )}
                    </GridItem>
                    <GridItem
                      width={[ { from: 'l', value: 1 / 2, }, ]}
                      miscStyles={{ display: 'flex', }}
                    >
                      {teaser5Data ? (
                        <OpEdTeaser
                          biAction={biAction}
                          data={teaser5Data}
                          hasMarginTop
                          index={6}
                          lazyLoadImages={lazyLoadImages}
                        />
                      ) : (
                        <Debug>There is no data for this teaser</Debug>
                      )}
                    </GridItem>
                  </Grid>
                </GridItem>

                {/* Quote */}
                <GridItem
                  width={[
                    { until: 's', value: 1, },
                    { from: 's', until: 'l', value: 1 / 3, },
                    { from: 'l', value: 2 / 10, },
                  ]}
                  miscStyles={{ display: 'flex', }}
                >
                  {quoteData ? (
                    <QuoteTeaser data={quoteData} biAction={biAction} />
                  ) : (
                    <Debug>There is no data for this teaser</Debug>
                  )}
                </GridItem>
              </Grid>
            </Section>
          </GridItem>
        </ListView>
      )}
    />
  );
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type ComicPropTypes = {
  data: TeaserDataType,
  lazyLoadImages: ?boolean,
};

Comic.defaultProps = { lazyLoadImages: true, };
function Comic({ data, lazyLoadImages, }: ComicPropTypes): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Card
          miscStyles={{
            display: [ { from: 's', value: 'none', }, ],
            flexBasis: '100%',
            minWidth: '100%',
            flexShrink: '0',
            marginBottom: '1rem',
            position: 'relative',
          }}
        >
          <Image
            data={data.image}
            lazyLoad={lazyLoadImages}
            miscStyles={{ width: '100%', }}
            imgOptions={getImageAssets({
              bps: theme.bps,
              aspect: 'headline',
              sizes: [ { size: 'calc(100vw - 4rem)', }, ],
              widths: [ 599, 500, 400, ],
            })}
          />
          <FelaComponent
            style={{
              backgroundColor: theme.color('quaternary', 'base'),
              bottom: '0',
              fontWeight: '400',
              insetInlineStart: '0',
              paddingBottom: '1rem',
              paddingInlineEnd: '1rem',
              paddingInlineStart: '1rem',
              paddingTop: '1rem',
              position: 'absolute',
              extend: [ theme.type(-1), ],
            }}
            render={({ className, }) => (
              <H className={className}>
                <TeaserResponsiveText
                  text={data.title}
                  mobileText={data.titleMobile}
                />
              </H>
            )}
          />
        </Card>
      )}
    />
  );
}

type TeaserPropTypes = {
  data: TeaserDataType,
  lazyLoadImages?: boolean,
  biAction: ?ListBiActionType,
  index: number,
};

Editorial.defaultProps = { lazyLoadImages: true, index: 1, };
function Editorial({
  data,
  lazyLoadImages,
  index,
  biAction,
}: TeaserPropTypes): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={2}
          onClick={() => (biAction
            ? biAction({ index, articleId: data.contentId, })
            : undefined)
          }
          miscStyles={{
            flexBasis: '100%',
            paddingBottom: [
              { until: 's', value: '2rem', },
              { from: 's', value: '1rem', },
            ],
            paddingInlineEnd: '2rem',
            paddingInlineStart: '2rem',
            paddingTop: [
              { until: 'l', value: '2rem', },
              { from: 'l', value: '1rem', },
            ],
          }}
        >
          <TeaserMedia
            data={data}
            width={19}
            miscStyles={{ display: [ { from: 's', value: 'none', }, ], }}
          >
            <FelaComponent
              style={{
                borderRadius: '50%',
                padding: '2.5rem',
                backgroundColor: theme.color('primary', '-5'),
              }}
            >
              <IconAlefLogoTransparent size={12} color="primary" />
            </FelaComponent>
          </TeaserMedia>

          <TeaserContent
            data={data}
            padding={[ { from: 's', value: [ 1, 0, 4, ], }, ]}
            miscStyles={{ flexGrow: [ { from: 'l', value: '1', }, ], }}
            renderContent={() => (
              <React.Fragment>
                {data.authors ? (
                  <TeaserAuthors
                    authors={data.authors}
                    miscStyles={{
                      fontWeight: 'bold',
                      color: theme.color('primary'),
                      type: [
                        { until: 's', value: -2, },
                        { from: 'xl', value: -1, },
                      ],
                    }}
                  />
                ) : null}
                <TeaserHeader
                  {...data}
                  typeScale={[
                    { from: 's', until: 'xl', value: 3, },
                    { from: 'xl', value: 2, },
                  ]}
                  miscStyle={{ marginTop: [ { from: 's', value: '1rem', }, ], }}
                />
                <FelaComponent
                  render="p"
                  style={{
                    flexGrow: '1',
                    flexShrink: '0',
                    marginTop: '1rem',
                    overflow: 'hidden',

                    '&:after': {
                      backgroundImage: `linear-gradient(to top, ${theme.color(
                        'white'
                      )} 40%, ${rgba(theme.color('white'), 0) || ''} 100%)`,
                      bottom: '0',
                      content: '""',
                      height: '13rem',
                      left: '0',
                      position: 'absolute',
                      right: '0',
                    },
                    extend: [
                      theme.type(-2, { from: 'xl', }),
                      theme.mq({ until: 's', }, { display: 'none', }),
                      theme.mq({ from: 's', until: 'l', }, { height: '16rem', }),
                      theme.mq({ from: 'l', }, { height: '18rem', }),
                    ],
                  }}
                >
                  {data.firstParagraph
                    ? data.firstParagraph.replace(/&quot;/g, '"')
                    : ''}
                </FelaComponent>
                <FelaComponent
                  render="footer"
                  style={{
                    paddingBottom: '1rem',
                    paddingTop: '1rem',
                    extend: [
                      theme.type(-2, { until: 'xl', }),
                      theme.type(-3, { from: 'xl', }),
                      theme.mq(
                        { from: 's', },
                        {
                          bottom: '0',
                          left: '0',
                          paddingBottom: '1rem',
                          paddingInlineEnd: '2rem',
                          paddingInlineStart: '2rem',
                          position: 'absolute',
                          right: '0',
                        }
                      ),
                    ],
                  }}
                >
                  <CommentsCount commentsCount={data.commentsCounts} />
                </FelaComponent>
              </React.Fragment>
            )}
          />
        </Teaser>
      )}
    />
  );
}

QuoteTeaser.defaultProps = { lazyLoadImages: true, index: 7, };
function QuoteTeaser({ data, biAction, index, }: TeaserPropTypes): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          onClick={() => (biAction
            ? biAction({ index, articleId: data.contentId, })
            : undefined)
          }
          gutter={2}
          backgroundColor={[ 'neutral', '-2', ]}
          isStacked={[ { from: 's', value: true, }, ]}
          miscStyles={{
            paddingBottom: [
              { until: 's', value: '2rem', },
              { from: 's', value: '1rem', },
            ],
            paddingInlineEnd: '2rem',
            paddingInlineStart: '2rem',
            paddingTop: [
              { until: 'l', value: '2rem', },
              { from: 'l', value: '1rem', },
            ],
            width: '100%',
          }}
        >
          <GridItem
            width={[ { until: 's', value: 19, }, ]}
            miscStyles={{
              alignItems: [ { until: 's', value: 'center', }, ],
              display: 'flex',
              flexBasis: [ { from: 's', value: 'auto', }, ],
              flexGrow: [ { from: 's', value: '0', }, ],
              flexShrink: [ { from: 's', value: '0', }, ],
              justifyContent: [ { until: 's', value: 'center', }, ],
            }}
          >
            <IconQuote
              size={[
                { until: 's', value: 9, },
                { from: 's', until: 'xl', value: 8, },
                { from: 'xl', value: 7, },
              ]}
              color={[ 'quaternary', 'base', ]}
            />
          </GridItem>

          <TeaserContent
            data={data}
            color="white"
            padding={0}
            footerPadding={[ 1, 0, 0, ]}
            footerColor="white"
            footerMiscStyles={{
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            isStacked={[ { from: 's', value: true, }, ]}
            renderContent={() => (
              <TeaserHeader
                {...data}
                typeScale={[ { from: 'xl', value: -1, }, ]}
                showKicker={false}
              />
            )}
            renderFooter={() => (
              <React.Fragment>
                {data.authors ? (
                  <TeaserAuthors
                    authors={data.authors}
                    miscStyles={{ marginInlineEnd: '1rem', fontWeight: 'bold', }}
                  />
                ) : null}
                <CommentsCount
                  commentsCount={data.commentsCounts}
                  color="white"
                  miscStyles={{ marginInlineEnd: '1rem', }}
                />
              </React.Fragment>
            )}
          />
        </Teaser>
      )}
    />
  );
}

type OpEdTeaserPropTypes = TeaserPropTypes & {
  hasMarginTop: boolean,
  isStackedFromS: boolean,
};

OpEdTeaser.defaultProps = {
  lazyLoadImages: true,
  isStackedFromS: false,
  hasMarginTop: false,
};

function OpEdTeaser({
  biAction,
  data,
  hasMarginTop,
  index,
  isStackedFromS,
  lazyLoadImages,
}: OpEdTeaserPropTypes): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={2}
          onClick={() => (biAction
            ? biAction({ index, articleId: data.contentId, })
            : undefined)
          }
          isStacked={isStackedFromS ? [ { from: 's', value: true, }, ] : false}
          miscStyles={{
            width: '100%',
            ...(hasMarginTop
              ? {
                marginTop: [
                  { until: 's', value: '1rem', },
                  { from: 's', until: 'l', value: '4rem', },
                ],
              }
              : {}),
            paddingBottom: isStackedFromS
              ? [ { until: 's', value: '2rem', }, { from: 's', value: '1rem', }, ]
              : '2rem',
            paddingInlineEnd: '2rem',
            paddingInlineStart: '2rem',
            // paddingInlineEnd: [
            //   { until: 'l', value: '2rem', },
            //   { from: 'l', value: '1rem', },
            // ],
            // paddingInlineStart: [
            //   { until: 'l', value: '2rem', },
            //   { from: 'l', value: '1rem', },
            // ],
            paddingTop: '2rem',
          }}
        >
          <GridItem
            width={isStackedFromS ? [ { until: 's', value: 19, }, ] : 19}
            miscStyles={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              ...(isStackedFromS
                ? {
                  flexBasis: [ { from: 's', value: 'auto', }, ],
                  flexGrow: [ { from: 's', value: '0', }, ],
                  flexShrink: [ { from: 's', value: '0', }, ],
                }
                : {}),
            }}
          >
            <FelaComponent
              style={{
                backgroundColor: theme.color('primary', '-5'),
                borderRadius: '50%',
                height: '17rem',
                overflow: 'hidden',
                paddingTop: '1rem',
                width: '17rem',
              }}
            >
              {data.authorImage && data.authorImage.kind === 'image' ? (
                <Image
                  bgcolor={[ 'primary', '-5', ]}
                  data={data.authorImage}
                  imgOptions={getImageAssets({
                    bps: theme.bps,
                    aspect: 'square',
                    sizes: [ { size: '17rem', }, ],
                    widths: [ 204, 119, 102, ],
                  })}
                  lazyLoad={lazyLoadImages}
                />
              ) : (
                <IconAvatar
                  size={17}
                  color={[ 'primary', '-3', ]}
                  miscStyles={{
                    transform: 'translateY(1rem)',
                  }}
                />
              )}
            </FelaComponent>
          </GridItem>

          <TeaserContent
            data={data}
            padding={isStackedFromS ? [ { from: 's', value: [ 1, 0, 0, ], }, ] : 0}
            isStacked={isStackedFromS ? [ { from: 's', value: true, }, ] : false}
            gridItemMiscStyles={{
              ...(isStackedFromS
                ? { textAlign: [ { from: 's', value: 'center', }, ], }
                : {}),
              justifyContent: isStackedFromS
                ? [ { until: 's', value: 'center', }, ]
                : 'center',
            }}
            footerPadding={[ 1, 0, 0, ]}
            footerColor={[ 'neutral', '-3', ]}
            footerMiscStyles={{
              marginTop: isStackedFromS ? [ { until: 's', value: '0', }, ] : '0',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            renderContent={() => (
              <React.Fragment>
                {data.authors ? (
                  <TeaserAuthors
                    authors={data.authors}
                    miscStyles={{
                      color: theme.color('primary'),
                      fontWeight: 'bold',
                      type: [
                        { until: 'xl', value: -1, },
                        { from: 'xl', value: -2, },
                      ],
                    }}
                  />
                ) : null}
                <TeaserHeader
                  {...data}
                  typeScale={[ { from: 'xl', value: -1, }, ]}
                />
              </React.Fragment>
            )}
            renderFooter={() => (
              <CommentsCount
                commentsCount={data.commentsCounts}
                miscStyles={{ marginInlineEnd: '1rem', }}
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}
