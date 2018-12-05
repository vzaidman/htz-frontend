// @flow
import React, { type StatelessFunctionalComponent, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';

import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import ListView from '../../../ListView/ListView';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import Image from '../../../Image/Image';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import TeaserRank from '../../../TeaserRank/TeaserRank';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import getImageAssets from '../../../../utils/getImageAssets';

type Props = {
  list: {
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

const Slugs: StatelessFunctionalComponent<Props> = ({ list, listId, gaAction, biAction, }) => {
  const clickAction = ({ index, articleId, }: { index: number, articleId: string, }) => {
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
  const { items, } = list;
  return (
    <FelaTheme
      render={theme => (
        <ListView
          gutter={0}
          innerBackgroundColor={[ 'primary', '-6', ]}
          outerBackgroundColor={[ 'primary', '-6', ]}
          miscStyles={{
            paddingInlineStart: [
              { until: 's', value: '2rem', },
              { from: 's', until: 'xl', value: '4rem', },
            ],
            paddingInlineEnd: [
              { until: 's', value: '2rem', },
              { from: 's', until: 'xl', value: '4rem', },
            ],
          }}
        >
          {/* List Meta Title */}
          <GridItem width={1} miscStyles={{ marginTop: '2rem', }}>
            <FelaComponent
              style={theme => ({
                color: theme.color('primary'),
                extend: [
                  borderTop(2, 0, 'solid', theme.color('primary')),
                  theme.type(2),
                  theme.mq(
                    { until: 's', },
                    {
                      backgroundColor: 'white',
                      paddingBottom: '2rem',
                      paddingInlineStart: '2rem',
                      marginBottom: '1rem',
                    }
                  ),
                  theme.mq(
                    {
                      from: 's',
                      until: 'l',
                    },
                    {
                      marginBottom: '5rem',
                    }
                  ),
                  theme.mq(
                    {
                      from: 'l',
                    },
                    {
                      marginBottom: '3rem',
                    }
                  ),
                  theme.mq({ from: 's', }, { fontWeight: 'bold', }),
                ],
              })}
              render={({ className, }) => <div className={className}>בחירת העורכים</div>}
            />
          </GridItem>

          {/* Main Elements ListView Grid Items */}
          <GridItem width={[ { until: 'xl', value: 1, }, { from: 'xl', value: 10 / 12, }, ]}>
            {/* Main Elements Grid */}
            <Grid gutter={0} miscStyles={{ paddingBottom: '3rem', }}>
              {/* List main/first element */}
              <GridItem
                width={[
                  { until: 'l', value: 1, },
                  { from: 'l', until: 'xl', value: 5 / 12, },
                  { from: 'xl', value: 6 / 12, },
                ]}
                miscStyles={{
                  order: [ { until: 'l', value: 0, }, { from: 'l', value: 1, }, ],
                  paddingInlineStart: [
                    { from: 's', until: 'l', value: '14rem', },
                    { from: 'l', value: '3.5rem', },
                  ],
                  paddingInlineEnd: [
                    { from: 's', until: 'l', value: '14rem', },
                    { from: 'xl', value: '3.5rem', },
                  ],
                }}
              >
                <Teaser data={items[0]} gutter={0} onClick={() => clickAction({ index: 0, articleId: items[0].contentId, })}>
                  <TeaserMedia data={items[0]} width={1}>
                    <Image
                      imgOptions={{
                        ...getImageAssets({
                          bps: theme.bps,
                          aspect: 'square',
                          sizes: '(max-width: 600px) 250px, 450px',
                          widths: [ 260, 470, ],
                        }),
                      }}
                      data={items[0].image}
                    />
                  </TeaserMedia>

                  <TeaserContent
                    footerMiscStyles={{ type: -2, }}
                    gridItemMiscStyles={{
                      alignItems: 'center',
                      paddingBottom: [
                        { until: 's', value: '4rem', },
                        { from: 's', until: 'l', value: '5rem', },
                        { from: 'l', value: '4rem', },
                      ],
                    }}
                    footerColor={[ 'neutral', '-3', ]}
                    data={items[0]}
                    renderContent={teaserData => (
                      <TeaserHeader
                        {...teaserData}
                        typeScale={[ { from: 'l', until: 'xl', value: 2, }, { from: 'xl', value: 3, }, ]}
                      />
                    )}
                    renderFooter={teaserData => (
                      <span style={{ marginInlineEnd: '1rem', }}>
                        {teaserData.authors ? (
                          <span style={{ marginInlineEnd: '1rem', }}>
                            <TeaserAuthors
                              authors={teaserData.authors}
                              miscStyles={{ fontWeight: 'bold', }}
                            />
                            <span> | </span>
                            <TeaserTime {...teaserData} />
                          </span>
                        ) : null}
                        <CommentsCount
                          commentsCount={teaserData.commentsCounts}
                          miscStyles={{ marginInlineEnd: '1rem', }}
                        />
                        {teaserData.rank ? <TeaserRank rank={teaserData.rank} /> : null}
                      </span>
                    )}
                  />
                </Teaser>
              </GridItem>

              <GridItem
                stretchContent
                width={[
                  { until: 'l', value: 1, },
                  { from: 'l', until: 'xl', value: 7 / 12, },
                  { from: 'xl', value: 6 / 12, },
                ]}
              >
                <Grid
                  rowSpacing={[ { from: 's', value: { amount: 3, nUp: 1, }, }, ]}
                  miscStyles={{
                    marginTop: [
                      { until: 's', value: '1.5rem', },
                      { from: 's', until: 'l', value: '4rem', },
                    ],
                  }}
                  gutter={1}
                >
                  {/* List Twins elements */}
                  <GridItem width={[ { until: 's', value: 1 / 2, }, { from: 's', value: 1, }, ]}>
                    <Teaser data={items[1]} gutter={0} onClick={() => clickAction({ index: 1, articleId: items[1].contentId, })}>
                      <TeaserMedia
                        data={items[1]}
                        width={[
                          { until: 's', value: 1, },
                          { from: 's', until: 'l', value: 4 / 12, },
                          { from: 'l', until: 'xl', value: 3 / 7, },
                          { from: 'xl', value: 3 / 5, },
                        ]}
                      >
                        <Image
                          imgOptions={{
                            ...getImageAssets({
                              bps: theme.bps,
                              aspect: 'regular',
                              sizes: '(max-width: 600px) 120px, (max-width: 1200px) 200px, 300px',
                              widths: [ 120, 200, 300, ],
                            }),
                          }}
                          data={items[1].image}
                        />
                      </TeaserMedia>
                      <TeaserContent
                        width={[
                          { until: 's', value: 1, },
                          { from: 's', until: 'l', value: 8 / 12, },
                          { from: 'l', until: 'xl', value: 4 / 7, },
                          { from: 'xl', value: 2 / 5, },
                        ]}
                        data={items[1]}
                        renderContent={teaserData => <TeaserHeader {...teaserData} />}
                        footerColor={[ 'neutral', '-3', ]}
                        footerMiscStyles={{ type: -2, }}
                        gridItemMiscStyles={{
                          ...theme.mq({ until: 's', }, { paddingBottom: '5rem', }),
                        }}
                        renderFooter={teaserData => (
                          <span style={{ marginInlineEnd: '1rem', }}>
                            {teaserData.authors ? (
                              <span style={{ marginInlineEnd: '1rem', }}>
                                <TeaserAuthors
                                  authors={teaserData.authors}
                                  miscStyles={{ fontWeight: 'bold', }}
                                />
                                <span> | </span>
                                <TeaserTime {...teaserData} />
                              </span>
                            ) : null}
                            <CommentsCount
                              commentsCount={teaserData.commentsCounts}
                              miscStyles={{
                                marginInlineEnd: '1rem',
                                display: [ { until: 's', value: 'none', }, ],
                              }}
                            />
                            {teaserData.rank ? (
                              <TeaserRank
                                rank={teaserData.rank}
                                miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}
                              />
                            ) : null}
                          </span>
                        )}
                      />
                    </Teaser>
                  </GridItem>
                  <GridItem width={[ { until: 's', value: 1 / 2, }, { from: 's', value: 1, }, ]}>
                    <Teaser data={items[2]} gutter={0} onClick={() => clickAction({ index: 0, articleId: items[2].contentId, })}>
                      <TeaserMedia
                        data={items[2]}
                        width={[
                          { until: 's', value: 1, },
                          { from: 's', until: 'l', value: 4 / 12, },
                          { from: 'l', until: 'xl', value: 3 / 7, },
                          { from: 'xl', value: 3 / 5, },
                        ]}
                      >
                        <Image
                          imgOptions={{
                            ...getImageAssets({
                              bps: theme.bps,
                              aspect: 'regular',
                              sizes: '(max-width: 600px) 120px, (max-width: 1200px) 200px, 300px',
                              widths: [ 110, 200, 300, ],
                            }),
                          }}
                          data={items[2].image}
                        />
                      </TeaserMedia>
                      <TeaserContent
                        width={[
                          { until: 's', value: 1, },
                          { from: 's', until: 'l', value: 8 / 12, },
                          { from: 'l', until: 'xl', value: 4 / 7, },
                          { from: 'xl', value: 2 / 5, },
                        ]}
                        data={items[2]}
                        renderContent={teaserData => <TeaserHeader {...teaserData} />}
                        footerColor={[ 'neutral', '-3', ]}
                        footerMiscStyles={{ type: -2, }}
                        gridItemMiscStyles={{
                          ...theme.mq({ until: 's', }, { paddingBottom: '6rem', }),
                        }}
                        renderFooter={teaserData => (
                          <span>
                            {teaserData.authors ? (
                              <span style={{ marginInlineEnd: '1rem', }}>
                                <TeaserAuthors
                                  authors={teaserData.authors}
                                  miscStyles={{ fontWeight: 'bold', }}
                                />
                                <span> | </span>
                                <TeaserTime {...teaserData} />
                              </span>
                            ) : null}
                            <CommentsCount
                              commentsCount={teaserData.commentsCounts}
                              miscStyles={{
                                marginInlineEnd: '1rem',
                                display: [ { until: 's', value: 'none', }, ],
                              }}
                            />
                            {teaserData.rank ? (
                              <TeaserRank
                                rank={teaserData.rank}
                                miscStyles={{ display: [ { until: 's', value: 'none', }, ], }}
                              />
                            ) : null}
                          </span>
                        )}
                      />
                    </Teaser>
                  </GridItem>
                  {/* END of List Twins elements  */}
                  {/* Last List Element (No Picture) */}
                  <GridItem width={1} miscStyles={{ marginTop: '3rem', }}>
                    <Teaser data={items[3]} onClick={() => clickAction({ index: 0, articleId: items[3].contentId, })}>
                      <TeaserContent
                        data={items[3]}
                        gridItemMiscStyles={{
                          paddingBottom: [
                            { until: 'm', value: '3rem', },
                            { from: 'm', value: '7rem', },
                          ],
                        }}
                        renderContent={teaserData => <TeaserHeader {...teaserData} />}
                        footerMiscStyles={{ type: -2, marginTop: '1rem', }}
                        footerColor={[ 'neutral', '-3', ]}
                        renderFooter={teaserData => (
                          <span>
                            {teaserData.authors ? (
                              <span style={{ marginInlineEnd: '1rem', }}>
                                <TeaserAuthors
                                  authors={teaserData.authors}
                                  miscStyles={{ fontWeight: 'bold', }}
                                />
                                <span> | </span>
                                <TeaserTime {...teaserData} />
                              </span>
                            ) : null}
                            <CommentsCount
                              commentsCount={teaserData.commentsCounts}
                              miscStyles={{ marginInlineEnd: '1rem', }}
                            />
                            {teaserData.rank ? <TeaserRank rank={teaserData.rank} /> : null}
                          </span>
                        )}
                      />
                    </Teaser>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>

          {/* DFP ! */}
          <GridItem
            width={[ { until: 'xl', value: 1, }, { from: 'xl', value: 2 / 12, }, ]}
            miscStyles={{
              marginBottom: '7rem',
              marginTop: '4rem',
              backgroundColor: 'yellow',
            }}
          >
            <div>DFP! WIP!</div>
            <div>DFP! WIP!</div>
          </GridItem>
        </ListView>
      )}
    />
  );
};

export default Slugs;
