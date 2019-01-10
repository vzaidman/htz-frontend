// @flow
import { FelaComponent, FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import H from '../../../AutoLevels/H';
import HtzLink from '../../../HtzLink/HtzLink';
import IconArrow from '../../../Icon/icons/IconArrow';
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
import { isTeaser, } from '../../../../utils/validateType';

type Props = {
  list: ListDataType,
  gaAction: () => void,
  biAction: ListBiActionType,
  lazyLoadImages: boolean,
};

Mom.defaultProps = { lazyLoadImages: true, };

const headerTypeScale = [ { until: 's', value: -1, }, { from: 's', value: 0, }, ];

export default function Mom({ list, gaAction, biAction, lazyLoadImages, }: Props): React.Node {
  const { title, description, items, url, urlDescription, } = list;
  const listViewPadding = [ { until: 's', value: '2rem', }, { from: 's', value: '4rem', }, ];

  return (
    <ListView
      innerBackgroundColor={[ 'primary', '-4', ]}
      miscStyles={{
        paddingBottom: listViewPadding,
        paddingInlineStart: listViewPadding,
        paddingInlineEnd: listViewPadding,
        paddingTop: listViewPadding,
      }}
    >
      {/* LIST TITLE */}
      <GridItem width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}>
        <FelaComponent
          rule={({ theme, }) => ({
            marginBottom: '2rem',
            display: 'flex',
            extend: [ theme.type(2), ],
          })}
          render={({ className, }) => (
            <HtzLink className={className} href={url}>
              <FelaComponent
                style={theme => ({
                  ...theme.type(3),
                  paddingStart: '1rem',
                  paddingEnd: '1rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  backgroundColor: theme.color('neutral', '-1'),
                  color: theme.color('quaternary'),
                  height: 'fit-content',
                })}
              >
                <IconArrow miscStyles={{ transform: 'rotate(-45deg)', }} />
              </FelaComponent>
              <H>
                <FelaComponent
                  style={theme => ({
                    color: theme.color('neutral', '-1'),
                    backgroundColor: theme.color('quaternary'),
                    boxDecorationBreak: 'clone',
                    paddingEnd: '1rem',
                    paddingStart: '1rem',
                    paddingBottom: '1rem',
                  })}
                  render="span"
                >
                  <FelaComponent
                    style={{
                      position: 'relative',
                    }}
                    render="span"
                  >
                    {title}
                  </FelaComponent>
                </FelaComponent>
              </H>
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
            <TeaserWithImg1 data={items[0]} index={0} {...{ biAction, lazyLoadImages, }} />
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
                <TextualTeaser data={items[1]} {...{ biAction, index: 1, }} />
              </GridItem>
              <GridItem stretchContent width={[ { from: 's', until: 'xl', value: 1 / 2, }, ]}>
                <TextualTeaser data={items[2]} {...{ biAction, index: 2, }} />
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
            <TeaserWithImg2 data={items[3]} index={3} {...{ biAction, lazyLoadImages, }} />
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
            <TextualTeaser data={items[4]} {...{ biAction, index: 4, }} />
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
  biAction: ListBiActionType,
};

TeaserWithImg1.defaultProps = { lazyLoadImages: true, };

function TeaserWithImg1({ data, index, lazyLoadImages, biAction, }: TeaserProps): React.Node {
  const articleId = data.contentId;

  return isTeaser(data) ? (
    <Teaser
      data={data}
      gutter={2}
      onClick={() => biAction({ index, articleId, })}
      gridMiscStyles={{
        flexDirection: [ { from: 'xl', value: 'column', }, ],
      }}
    >
      <TeaserMedia
        data={data}
        width={[
          { until: 's', value: 20, },
          { from: 's', until: 'l', value: 8 / 12, },
          { from: 'l', until: 'xl', value: 4 / 6, },
        ]}
        miscStyles={{
          flexGrow: [ { from: 'xl', value: '0', }, ],
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
                  aspect: 'regular',
                  widths: [ 108, 216, ],
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
        padding={[ { until: 's', value: [ 1, 0, 0, 1, ], }, { from: 's', value: [ 1, 1, 0, 0, ], }, ]}
        footerPadding={[ { until: 's', value: [ 2, 0, 1, 1, ], }, { from: 's', value: [ 2, 1, 1, 0, ], }, ]}
        gridItemMiscStyles={{
          flexBasis: [ { from: 'xl', value: 'auto', }, ],
          flexGrow: [ { from: 'xl', value: '1', }, ],
        }}
        renderContent={() => <TeaserHeader typeScale={headerTypeScale} {...data} />}
        renderFooter={() => (
          <FelaComponent
            style={theme => ({
              color: theme.color('primary'),
              fontWeight: '700',
              extend: [ theme.type(-3), ],
            })}
            render="span"
          >
            {data.commentsCounts}
            <IconComment size={2} />
          </FelaComponent>
        )}
      />
    </Teaser>
  ) : null;
}

TeaserWithImg2.defaultProps = { lazyLoadImages: true, };

function TeaserWithImg2({ data, index, lazyLoadImages, biAction, }: TeaserProps): React.Node {
  const articleId = data.contentId;

  return isTeaser(data) ? (
    <Teaser
      data={data}
      gutter={2}
      onClick={() => biAction({ index, articleId, })}
      gridMiscStyles={{
        flexDirection: [
          { from: 's', until: 'l', value: 'column', },
          { from: 'xl', value: 'column', },
        ],
      }}
    >
      <TeaserMedia
        data={data}
        width={[ { from: 'l', until: 'xl', value: 4 / 6, }, ]}
        miscStyles={{
          flexGrow: [ { from: 's', until: 'l', value: '0', }, { from: 'xl', value: '0', }, ],
        }}
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
          { from: 's', until: 'l', value: [ 1, 1, 0, ], },
          { from: 'l', until: 'xl', value: [ 1, 0, 0, 1, ], },
          { from: 'xl', value: [ 1, 1, 0, ], },
        ]}
        footerPadding={[
          { from: 's', until: 'l', value: [ 2, 1, 1, ], },
          { from: 'l', until: 'xl', value: [ 2, 0, 1, 1, ], },
          { from: 'xl', value: [ 2, 1, 1, ], },
        ]}
        gridItemMiscStyles={{
          flexBasis: [ { from: 's', until: 'l', value: 'auto', }, { from: 'xl', value: 'auto', }, ],
          flexGrow: [ { from: 's', until: 'l', value: '1', }, { from: 'xl', value: '1', }, ],
        }}
        renderContent={() => <TeaserHeader typeScale={headerTypeScale} {...data} />}
        renderFooter={() => (
          <FelaComponent
            style={theme => ({
              color: theme.color('primary'),
              fontWeight: '700',
              extend: [ theme.type(-3), ],
            })}
            render="span"
          >
            {data.commentsCounts}
            <IconComment size={2} />
          </FelaComponent>
        )}
      />
    </Teaser>
  ) : null;
}

TextualTeaser.defaultProps = { lazyLoadImages: undefined, };
function TextualTeaser({ data, index, biAction, }: TeaserProps): React.Node {
  const articleId = data.contentId;
  return isTeaser(data) ? (
    <Teaser
      data={data}
      gutter={2}
      onClick={() => biAction({ index, articleId, })}
      miscStyles={{ flexGrow: '1', }}
    >
      <TeaserContent
        data={data}
        padding={[ 1, 1, 0, ]}
        footerPadding={[ { until: 's', value: 1, }, { from: 's', value: [ 2, 1, 1, ], }, ]}
        renderContent={() => <TeaserHeader {...data} typeScale={headerTypeScale} />}
        renderFooter={() => (
          <FelaComponent
            style={theme => ({
              color: theme.color('primary'),
              fontWeight: '700',
              extend: [ theme.type(-3), ],
            })}
            render="span"
          >
            {data.commentsCounts}
            <IconComment size={2} />
          </FelaComponent>
        )}
      />
    </Teaser>
  ) : null;
}
