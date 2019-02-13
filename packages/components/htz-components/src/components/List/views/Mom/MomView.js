// @flow
import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import Debug from '../../../Debug/Debug';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import H from '../../../AutoLevels/H';
import HtzLink from '../../../HtzLink/HtzLink';
import IconArrowDiagonal from '../../../Icon/icons/IconArrowDiagonal';
import IconBack from '../../../Icon/icons/IconBack';
import IconComment from '../../../Icon/icons/IconComment';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView';
import Picture from '../../../Image/Picture';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import getImageAssets from '../../../../utils/getImageAssets';
import getPictureAssets from '../../../../utils/getPictureAssets';

type Props = {
  list: ListDataType,
  gaAction: () => void,
  biAction: ?ListBiActionType,
  lazyLoadImages: boolean,
};

const headerTypeScale = [
  { until: 's', value: 0, },
  { from: 's', until: 'l', value: 1, },
  { from: 'l', value: 0, },
];

Mom.defaultProps = { lazyLoadImages: true, };
export default function Mom({ list, gaAction, biAction, lazyLoadImages, }: Props): React.Node {
  const { title, description, items, url, urlDescription, } = list;
  const listViewPadding = [ { until: 's', value: '2rem', }, { from: 's', value: '4rem', }, ];

  return (
    <ListView
      innerBackgroundColor={[ 'primary', '-4', ]}
      // marginTop={[ { until: 's', value: 4, }, { from: 's', value: 0, }, ]}
      miscStyles={{
        paddingBottom: listViewPadding,
        paddingInlineStart: listViewPadding,
        paddingInlineEnd: listViewPadding,
        paddingTop: [ { from: 's', value: '4rem', }, ],
      }}
    >
      {/* LIST TITLE */}
      <GridItem width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}>
        <FelaComponent
          rule={({ theme, }) => ({
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'baseline',
          })}
          render={({ className, }) => (
            <HtzLink className={className} href={url}>
              <FelaComponent
                style={theme => ({
                  paddingStart: '1rem',
                  paddingEnd: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  backgroundColor: theme.color('neutral', '-1'),
                  color: theme.color('quaternary'),
                })}
              >
                <IconArrowDiagonal
                  size={[ { until: 's', value: 4, }, { from: 's', value: 3, }, ]}
                  miscStyles={{
                    bottom: '-.0.5em',
                    position: 'relative',
                  }}
                />
              </FelaComponent>
              <FelaComponent
                style={theme => ({
                  position: 'relative',
                  top: '1px',
                  extend: [ theme.type(2, { untilBp: 'xl', }), theme.type(1, { fromBp: 'xl', }), ],
                })}
                render={({ className, theme, }) => (
                  <H className={className}>
                    <FelaComponent
                      style={{
                        color: theme.color('neutral', '-1'),
                        backgroundColor: theme.color('quaternary'),
                        boxDecorationBreak: 'clone',
                        paddingInlineEnd: '1rem',
                        paddingInlineStart: '1rem',
                        extend: [
                          theme.mq(
                            { until: 'xl', },
                            {
                              paddingBottom: '1px',
                              paddingTop: '2px',
                            }
                          ),
                          theme.mq(
                            { from: 'xl', },
                            {
                              paddingBottom: '3px',
                              paddingTop: '5px',
                            }
                          ),
                        ],
                      }}
                      render="span"
                    >
                      {title}
                    </FelaComponent>
                  </H>
                )}
              />
            </HtzLink>
          )}
        />
        <FelaComponent style={theme => ({ ...theme.type(-1), marginBottom: '3rem', })} render="p">
          {description}
        </FelaComponent>
      </GridItem>

      {/* CONTENT */}
      <GridItem stretchContent width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}>
        <Grid gutter={4}>
          <GridItem
            stretchContent
            width={[
              { until: 'l', value: 1, },
              { from: 'l', until: 'xl', value: 6 / 10, },
              { from: 'xl', value: 3 / 10, },
            ]}
            miscStyles={{
              marginBottom: [
                { until: 's', value: '1rem', },
                { from: 's', until: 'xl', value: '4rem', },
              ],
            }}
          >
            {items[0] ? (
              <TeaserWithImg1
                data={items[0]}
                index={0}
                biAction={biAction}
                lazyLoadImages={lazyLoadImages}
              />
            ) : (
              <Debug>There is no data for the first teaser in this list</Debug>
            )}
          </GridItem>

          <GridItem
            stretchContent
            width={[
              { until: 'l', value: 1, },
              { from: 'l', until: 'xl', value: 4 / 10, },
              { from: 'xl', value: 2 / 10, },
            ]}
            miscStyles={{
              marginBottom: [
                { until: 's', value: '1rem', },
                { from: 's', until: 'xl', value: '4rem', },
              ],
            }}
          >
            <Grid
              gutter={4}
              miscStyles={{
                flexDirection: [ { until: 's', value: 'column', }, { from: 'xl', value: 'column', }, ],
                flexGrow: 1,
              }}
            >
              <GridItem
                stretchContent
                width={[ { from: 's', until: 'xl', value: 1 / 2, }, ]}
                miscStyles={{
                  marginBottom: [ { until: 's', value: '1rem', }, { from: 'xl', value: '4rem', }, ],
                }}
              >
                {items[1] ? (
                  <TextualTeaser data={items[1]} biAction={biAction} index={1} />
                ) : (
                  <Debug>This is no data for the second teaser in this list</Debug>
                )}
              </GridItem>
              <GridItem stretchContent width={[ { from: 's', until: 'xl', value: 1 / 2, }, ]}>
                {items[2] ? (
                  <TextualTeaser data={items[2]} biAction={biAction} index={2} />
                ) : (
                  <Debug>This is no data for the third teaser in this list</Debug>
                )}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem
            stretchContent
            width={[
              { from: 's', until: 'l', value: 2 / 3, },
              { from: 'l', until: 'xl', value: 3 / 5, },
              { from: 'xl', value: 3 / 10, },
            ]}
            miscStyles={{
              display: [ { until: 's', value: 'none', }, ],
              order: [ { from: 'l', until: 'xl', value: 1, }, ],
            }}
          >
            {items[3] ? (
              <TeaserWithImg2
                data={items[3]}
                index={3}
                biAction={biAction}
                lazyLoadImages={lazyLoadImages}
              />
            ) : (
              <Debug>This is no data for the fourth teaser in this list</Debug>
            )}
          </GridItem>
          <GridItem
            stretchContent
            width={[
              { from: 's', until: 'l', value: 1 / 3, },
              { from: 'l', until: 'xl', value: 2 / 5, },
              { from: 'xl', value: 2 / 10, },
            ]}
            miscStyles={{
              display: [ { until: 's', value: 'none', }, ],
              marginBottom: [ { until: 's', value: '1rem', }, ],
            }}
          >
            {items[4] ? (
              <TextualTeaser data={items[4]} biAction={biAction} index={4} isLargeText />
            ) : (
              <Debug>This is no data for the fifth teaser in this list</Debug>
            )}
          </GridItem>
        </Grid>
      </GridItem>

      {url && urlDescription ? (
        <GridItem
          width={1}
          miscStyles={{
            display: [ { until: 's', value: 'flex', }, { from: 's', value: 'none', }, ],
          }}
        >
          <FelaComponent
            style={theme => ({
              marginInlineStart: 'auto',
              color: theme.color('secondary'),
              fontWeight: '700',
              extend: [ theme.type(1), ],
            })}
            render={({ className, }) => (
              <HtzLink className={className} href={url}>
                <span>{urlDescription}</span>
                <IconBack />
              </HtzLink>
            )}
          />
        </GridItem>
      ) : null}
    </ListView>
  );
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type TeaserProps = {
  data: TeaserDataType,
  index: number,
  lazyLoadImages?: boolean,
  biAction: ?ListBiActionType,
};

TeaserWithImg1.defaultProps = { lazyLoadImages: true, };

function TeaserWithImg1({ data, index, lazyLoadImages, biAction, }: TeaserProps): React.Node {
  const itemId = data.representedContent == null ? data.contentId : data.representedContent;
  return (
    <Teaser
      data={data}
      gutter={2}
      onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
      isStacked={[ { from: 'xl', value: true, }, ]}
    >
      <TeaserMedia
        data={data}
        width={[
          { until: 's', value: 20, },
          { from: 's', until: 'l', value: 8 / 12, },
          { from: 'l', until: 'xl', value: 4 / 6, },
        ]}
        isStacked={[ { from: 'xl', value: true, }, ]}
        onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
        miscStyles={{
          order: [ { from: 's', until: 'xl', value: '1', }, ],
        }}
      >
        <FelaTheme
          render={theme => (
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: data.image,
                defaultImgOptions: {
                  sizes: '108px',
                  aspect: 'square',
                  widths: [ 108, ],
                },
                sources: [
                  {
                    aspect: 'headline',
                    from: 's',
                    sizes: [
                      { from: 'xl', size: '281px', },
                      { from: 'l', size: '314px', },
                      { from: 'm', size: '476px', },
                      { from: 's', size: '364px', },
                    ],
                    widths: [ 473, 364, 314, 281, ],
                  },
                ],
              })}
            />
          )}
        />
      </TeaserMedia>
      <TeaserContent
        data={data}
        padding={[
          { until: 's', value: [ 1, 0, 0, 1, ], },
          { from: 's', until: 'l', value: [ 2, 2, 0, 0, ], },
          { from: 'l', until: 'xl', value: [ 1, 1, 0, 0, ], },
          { from: 'xl', value: [ 1, 1, 0, ], },
        ]}
        footerPadding={[
          { until: 's', value: [ 1, 0, 1, 1, ], },
          { from: 's', until: 'l', value: [ 1, 2, 1, 0, ], },
          { from: 'l', value: [ 1, 1, 1, 0, ], },
          { from: 'xl', value: 1, },
        ]}
        isStacked={[ { from: 'xl', value: true, }, ]}
        footerMiscStyles={{
          type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            typeScale={headerTypeScale}
            {...data}
            onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
          />
        )}
        renderFooter={() => (
          <FelaComponent
            style={theme => ({
              color: theme.color('primary'),
              fontWeight: '700',
            })}
            render="span"
          >
            {data.commentsCounts}
            <IconComment size={2} />
          </FelaComponent>
        )}
      />
    </Teaser>
  );
}

TeaserWithImg2.defaultProps = { lazyLoadImages: true, };
function TeaserWithImg2({ data, index, lazyLoadImages, biAction, }: TeaserProps): React.Node {
  const itemId = data.representedContent == null ? data.contentId : data.representedContent;
  return (
    <Teaser
      data={data}
      gutter={2}
      onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
      isStacked={[ { from: 's', until: 'l', value: true, }, { from: 'xl', value: true, }, ]}
    >
      <TeaserMedia
        data={data}
        width={[ { from: 'l', until: 'xl', value: 4 / 6, }, ]}
        isStacked={[ { from: 's', until: 'l', value: true, }, { from: 'xl', value: true, }, ]}
        onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
      >
        <FelaTheme
          render={theme => (
            <Image
              lazyLoad={lazyLoadImages}
              data={data.image}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                widths: [ 472, 364, 314, 281, ],
                sizes: [
                  { from: 'xl', size: '281px', },
                  { from: 'l', size: '314px', },
                  { from: 'm', size: '472px', },
                  { from: 's', size: '430px', },
                  { size: '364px', },
                ],
              })}
            />
          )}
        />
      </TeaserMedia>

      <TeaserContent
        data={data}
        padding={[
          { from: 's', until: 'l', value: [ 2, 2, 0, ], },
          { from: 'l', until: 'xl', value: [ 1, 0, 0, 1, ], },
          { from: 'xl', value: [ 1, 1, 0, ], },
        ]}
        footerPadding={[
          { from: 's', until: 'l', value: [ 1, 2, 1, ], },
          { from: 'l', until: 'xl', value: [ 1, 0, 1, 1, ], },
          { from: 'xl', value: [ 1, 1, 1, ], },
        ]}
        isStacked={[ { from: 's', until: 'l', value: true, }, { from: 'xl', value: true, }, ]}
        footerMiscStyles={{
          type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            typeScale={headerTypeScale}
            {...data}
            onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
          />
        )}
        renderFooter={() => (
          <FelaComponent
            style={theme => ({
              color: theme.color('primary'),
              fontWeight: '700',
            })}
            render="span"
          >
            {data.commentsCounts}
            <IconComment size={2} />
          </FelaComponent>
        )}
      />
    </Teaser>
  );
}

type TextualTeaserPropTypes = TeaserProps & { isLargeText: boolean, };

// eslint-disable-next-line react/default-props-match-prop-types
TextualTeaser.defaultProps = { lazyLoadImages: undefined, isLargeText: false, };
function TextualTeaser({ data, index, biAction, isLargeText, }: TextualTeaserPropTypes): React.Node {
  return (
    <Teaser
      data={data}
      gutter={2}
      onClick={biAction ? () => biAction({ index, articleId: data.representedContent, }) : null}
      miscStyles={{
        flexGrow: '1',
      }}
      gridItemMiscStyles={{ alignContent: 'stretch', }}
    >
      <TeaserContent
        data={data}
        padding={[ { until: 's', value: [ 1, 2, 0, ], }, { from: 's', value: [ 2, 2, 0, ], }, ]}
        gridItemMiscStyles={{ height: '100%', }}
        footerPadding={[ 1, 2, ]}
        footerMiscStyles={{
          marginTop: 'auto',
          type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            {...data}
            typeScale={
              isLargeText ? headerTypeScale : [ { until: 'xl', value: 0, }, { from: 'xl', value: -1, }, ]
            }
            onClick={
              biAction ? () => biAction({ index, articleId: data.representedContent, }) : null
            }
          />
        )}
        renderFooter={() => (
          <FelaComponent
            style={theme => ({
              color: theme.color('primary'),
              fontWeight: '700',
            })}
            render="span"
          >
            {data.commentsCounts}
            <IconComment size={2} />
          </FelaComponent>
        )}
      />
    </Teaser>
  );
}
