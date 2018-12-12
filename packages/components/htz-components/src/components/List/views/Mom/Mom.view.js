// @flow
import { FelaComponent, FelaTheme, } from 'react-fela';
import React, { type StatelessFunctionalComponent, } from 'react';

import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import H from '../../../AutoLevels/H';
import HtzLink from '../../../HtzLink/HtzLink';
import IconArrow from '../../../Icon/icons/IconArrow';
import IconBack from '../../../Icon/icons/IconBack';
import IconComment from '../../../Icon/icons/IconComment';
import ListView from '../../../ListView/ListView';
import Picture from '../../../Image/Picture';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import pictureAssetProps from '../../../../utils/getPictureAssets';

type Props = {
  list: {
    title: string,
    description: string,
    url: string,
    urlDescription: string,
    items: Array<TeaserDataType>,
  },
  listId: string,
  gaAction: () => void,
  biAction: ({
    actionCode: number,
    additionalInfo: {
      ArticleId: string,
      ListId: string,
      NoInList: number,
      ViewName: string,
    },
  }) => void,
};

const headerTypo = [ { until: 's', value: -1, }, { from: 's', value: 0, }, ];
const pictureOptions = {
  defaultImgOptions: {
    sizes: '108px',
    aspect: 'regular',
    widths: [ 108, 216, ],
  },
  sources: [
    {
      from: 'xl',
      sizes: '281px',
      aspect: 'headline',
      widths: [ 281, ],
    },
    {
      from: 'l',
      sizes: '314px',
      aspect: 'headline',
      widths: [ 314, ],
    },
    {
      from: 'm',
      sizes: '476px',
      aspect: 'headline',
      widths: [ 476, ],
    },
    {
      from: 's',
      sizes: '364px',
      aspect: 'headline',
      widths: [ 364, ],
    },
  ],
};

const Mom: StatelessFunctionalComponent<Props> = ({
  list,
  listId,
  gaAction,
  biAction,
}) => {
  const clickAction = ({
    index,
    articleId,
  }: {
    index: number,
    articleId: string,
  }) => {
    biAction({
      actionCode: 109,
      additionalInfo: {
        ArticleId: articleId,
        ListId: listId,
        NoInList: index + 1,
        ViewName: 'Mom',
      },
    });
  };

  const { title, description, items, url, urlDescription, } = list;
  return (
    <ListView
      innerBackgroundColor={[ 'primary', '-4', ]}
      miscStyles={{
        paddingBottom: '2rem',
        paddingInlineStart: [
          { until: 's', value: '2rem', },
          { from: 's', value: '4rem', },
        ],
        paddingInlineEnd: [
          { until: 's', value: '2rem', },
          { from: 's', value: '4rem', },
        ],
        paddingTop: '2rem',
      }}
    >
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
      >
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
        <FelaComponent
          style={theme => ({ ...theme.type(-1), marginBottom: '3rem', })}
          render="p"
        >
          {description}
        </FelaComponent>
      </GridItem>

      {/* CONTENT */}
      <GridItem
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
      >
        <Grid gutter={4} miscStyles={{ height: '100%', }}>
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
                { from: 's', until: 'l', value: '3rem', },
                { from: 's', until: 'xl', value: '4rem', },
              ],
            }}
          >
            <Teaser
              data={items[0]}
              gutter={2}
              isRev={false}
              onClick={() => clickAction({ index: 0, articleId: items[0].contentId, })
              }
              gridMiscStyles={{
                flexWrap: [ { until: 'xl', value: 'nowrap', }, ],
              }}
            >
              {items[0].image ? (
                <TeaserMedia
                  data={items[0]}
                  width={[
                    { until: 's', value: 20, },
                    { from: 's', until: 'l', value: 8 / 12, },
                    { from: 'l', until: 'xl', value: 4 / 6, },
                    { from: 'xl', value: 1, },
                  ]}
                  miscStyles={{
                    order: [ { from: 's', until: 'xl', value: '1', }, ],
                  }}
                >
                  <FelaTheme
                    render={theme => (items[0].image ? (
                      <Picture
                        {...pictureAssetProps({
                          bps: theme.bps,
                          imgData: items[0].image,
                          ...pictureOptions,
                        })}
                      />
                    ) : null)
                    }
                  />
                </TeaserMedia>
              ) : null}
              <TeaserContent
                data={items[0]}
                padding={[
                  { until: 's', value: [ 0.5, 0, 4, 1, ], },
                  { from: 's', until: 'm', value: [ 2, 3, 0, 2, ], },
                  { from: 'm', until: 'xl', value: [ 2, 2, 0, 2, ], },
                  { from: 'xl', value: [ 1, 2, 0, 2, ], },
                ]}
                footerPadding={[
                  { until: 's', value: [ 3, 0, 1, 1, ], },
                  { from: 's', until: 'm', value: [ 2, 3, 1, 2, ], },
                  { from: 'm', until: 'xl', value: [ 2, 2, 1, 2, ], },
                  { from: 'xl', value: [ 2, 2, 1, 2, ], },
                ]}
                renderContent={data => (
                  <TeaserHeader
                    {...data}
                    typeScale={headerTypo}
                    miscStyles={{
                      paddingBottom: '4rem',
                    }}
                  />
                )}
                renderFooter={data => (
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
                { from: 's', until: 'l', value: '3rem', },
                { from: 's', until: 'xl', value: '4rem', },
              ],
            }}
          >
            <Grid
              gutter={4}
              miscStyles={{
                height: [ { from: 'l', value: '100%', }, ],
              }}
            >
              <GridItem
                stretchContent
                width={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'xl', value: 1 / 2, },
                  { from: 'xl', value: 1, },
                ]}
                miscStyles={{
                  marginBottom: [
                    { until: 's', value: '1rem', },
                    { from: 'xl', value: '4rem', },
                  ],
                }}
              >
                <Teaser
                  data={items[1]}
                  gutter={2}
                  isRev={false}
                  onClick={() => clickAction({ index: 1, articleId: items[1].contentId, })
                  }
                >
                  <TeaserContent
                    data={items[1]}
                    padding={[
                      { until: 's', value: [ 2, 2, 5, 2, ], },
                      { from: 's', until: 'l', value: [ 2, 2, 4, 2, ], },
                      { from: 'l', until: 'xl', value: [ 2, 2, 5, 2, ], },
                      { from: 'xl', value: [ 1, 2, 5, 2, ], },
                    ]}
                    footerPadding={[
                      { until: 's', value: [ 3, 2, 1, 1, ], },
                      { from: 's', until: 'l', value: [ 2, 2, 1, 2, ], },
                      { from: 'l', until: 'xl', value: [ 2, 2, 1, 2, ], },
                      { from: 'xl', value: [ 2, 2, 1, 2, ], },
                    ]}
                    renderContent={data => (
                      <TeaserHeader {...data} typeScale={headerTypo} />
                    )}
                    renderFooter={data => (
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
              </GridItem>
              <GridItem
                stretchContent
                width={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'xl', value: 1 / 2, },
                  { from: 'xl', value: 1, },
                ]}
              >
                <Teaser
                  data={items[2]}
                  gutter={2}
                  isRev={false}
                  onClick={() => clickAction({ index: 2, articleId: items[2].contentId, })
                  }
                >
                  <TeaserContent
                    data={items[2]}
                    padding={[
                      { until: 's', value: [ 2, 2, 5, 2, ], },
                      { from: 's', until: 'l', value: [ 2, 2, 4, 2, ], },
                      { from: 'l', until: 'xl', value: [ 2, 2, 5, 2, ], },
                      { from: 'xl', value: [ 1, 2, 5, 2, ], },
                    ]}
                    footerPadding={[
                      { until: 's', value: [ 3, 2, 1, 1, ], },
                      { from: 's', until: 'l', value: [ 2, 2, 1, 2, ], },
                      { from: 'l', until: 'xl', value: [ 2, 2, 1, 2, ], },
                      { from: 'xl', value: [ 2, 2, 1, 2, ], },
                    ]}
                    renderContent={data => (
                      <TeaserHeader {...data} typeScale={headerTypo} />
                    )}
                    renderFooter={data => (
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
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem
            stretchContent
            width={[
              { until: 's', value: 1, },
              { from: 's', until: 'l', value: 2 / 3, },
              { from: 'l', until: 'xl', value: 3 / 5, },
              { from: 'xl', value: 3 / 10, },
            ]}
            miscStyles={{
              display: [ { until: 's', value: 'none', }, ],
              order: [ { from: 'l', until: 'xl', value: 1, }, ],
              marginBottom: [
                { until: 's', value: '1rem', },
                { from: 's', until: 'l', value: '3rem', },
                { from: 's', until: 'xl', value: '4rem', },
              ],
            }}
          >
            <Teaser
              data={items[3]}
              gutter={2}
              isRev={false}
              onClick={() => clickAction({ index: 3, articleId: items[3].contentId, })
              }
            >
              {items[3].image ? (
                <TeaserMedia
                  data={items[3]}
                  width={[
                    { until: 'm', value: 1, },
                    { from: 'm', until: 'l', value: 8 / 12, },
                    { from: 'l', until: 'xl', value: 4 / 6, },
                    { from: 'xl', value: 1, },
                  ]}
                >
                  <FelaTheme
                    render={theme => (items[3].image ? (
                      <Picture
                        {...pictureAssetProps({
                          bps: theme.bps,
                          imgData: items[3].image,
                          ...pictureOptions,
                        })}
                      />
                    ) : null)
                    }
                  />
                </TeaserMedia>
              ) : null}
              <TeaserContent
                data={items[3]}
                padding={[
                  { until: 's', value: [ 1, 0, 0, 1, ], },
                  { from: 's', until: 'm', value: [ 2, 2, 4, 2, ], },
                  { from: 'm', until: 'xl', value: [ 2, 0, 0, 2, ], },
                  { from: 'xl', value: [ 1, 2, 0, 2, ], },
                ]}
                footerPadding={[
                  { until: 's', value: [ 3, 0, 1, 1, ], },
                  { from: 's', until: 'm', value: [ 2, 2, 1, 2, ], },
                  { from: 'm', until: 'xl', value: [ 2, 0, 1, 2, ], },
                  { from: 'xl', value: [ 2, 2, 1, 2, ], },
                ]}
                renderContent={data => (
                  <TeaserHeader
                    {...data}
                    typeScale={headerTypo}
                    miscStyles={{
                      paddingBottom: '4rem',
                    }}
                  />
                )}
                renderFooter={data => (
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
          </GridItem>
          <GridItem
            stretchContent
            width={[
              { until: 's', value: 1, },
              { from: 's', until: 'l', value: 1 / 3, },
              { from: 'l', until: 'xl', value: 2 / 5, },
              { from: 'xl', value: 2 / 10, },
            ]}
            miscStyles={{
              display: [ { until: 's', value: 'none', }, ],
              marginBottom: [
                { until: 's', value: '1rem', },
                { from: 's', until: 'l', value: '3rem', },
                { from: 's', until: 'xl', value: '4rem', },
              ],
            }}
          >
            <Teaser
              data={items[4]}
              gutter={2}
              isRev={false}
              onClick={() => clickAction({ index: 4, articleId: items[4].contentId, })
              }
            >
              <TeaserContent
                data={items[4]}
                padding={[
                  { until: 's', value: [ 1, 0, 0, 1, ], },
                  { from: 's', until: 'm', value: [ 2, 2, 4, 2, ], },
                  { from: 'm', until: 'xl', value: [ 2, 2, 0, 2, ], },
                  { from: 'xl', value: [ 1, 2, 0, 2, ], },
                ]}
                footerPadding={[
                  { until: 's', value: [ 3, 0, 1, 1, ], },
                  { from: 's', until: 'm', value: [ 2, 2, 1, 2, ], },
                  { from: 'm', until: 'xl', value: [ 2, 2, 1, 2, ], },
                  { from: 'xl', value: [ 2, 2, 1, 2, ], },
                ]}
                renderContent={data => (
                  <TeaserHeader
                    {...data}
                    typeScale={headerTypo}
                    miscStyles={{
                      paddingBottom: '4rem',
                    }}
                  />
                )}
                renderFooter={data => (
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
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem
        width={1}
        miscStyles={{
          direction: 'ltr',
          display: [ { from: 's', value: 'none', }, ],
        }}
      >
        <FelaComponent
          style={theme => ({
            ...theme.type(1),
            alignItems: 'center',
            color: theme.color('secondary'),
            display: 'inline-flex',
          })}
          render={({ className, }) => (
            <HtzLink className={className} href={url}>
              <IconBack />
              <p>{urlDescription}</p>
            </HtzLink>
          )}
        />
      </GridItem>
    </ListView>
  );
};

export default Mom;
