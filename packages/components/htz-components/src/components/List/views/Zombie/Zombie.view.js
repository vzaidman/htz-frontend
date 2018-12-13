// @flow
import { FelaComponent, FelaTheme, } from 'react-fela';
import {
  borderTop,
  borderBottom,
  borderEnd,
  parseComponentProp,
} from '@haaretz/htz-css-tools';
import * as React from 'react';
import config from 'config';

import type { DfpDataType, } from '../../../../flowTypes/DfpDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import Picture from '../../../Image/Picture';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import pictureAssetProps from '../../../../utils/getPictureAssets';

type StockType = {
  name: string,
  value: number,
  change: number,
};

type StocksType = {
  "142": StockType,
  "137": StockType,
  "9001": StockType,
  "29.10.@CCO": StockType,
  "30.10.!DJI": StockType,
};

type Props = {
  list: ListDataType & { dfp: Array<DfpDataType>, },
  gaAction: () => void,
  biAction: ListBiActionType,
  lazyLoadImages: boolean,
};

type State = {
  stocks: ?StocksType,
};

const headerTypo = [
  { until: 'l', value: -1, },
  { from: 'l', until: 'xl', value: 0, },
  { from: 'xl', value: -1, },
];

const stockWidth = [
  { until: 'l', value: 1 / 3, },
  { from: 'l', until: 'xl', value: 1, },
  { from: 'xl', value: 1 / 5, },
];

export default class Zombie extends React.Component<Props, State> {
  state = { stocks: null, };

  // TODO: This is only temporary. Once predicta's API is up
  //       we should fetch this from the GraphQL server with Apollo,
  //       so that it happens on the server
  componentDidMount() {
    if (!this.state.stocks) {
      this.fetchStocks();
    }
  }

  // TODO: Temp, replace with GraphQL whenever predicta will be ready.
  fetchStocks = () => {
    global
      .fetch(
        'https://cors-escape.herokuapp.com/http://apifinance.themarker.com/TheMarkerApi/GetIndexes',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', },
        }
      )
      .then(res => res.json())
      .then(json => {
        const stocksIds: Array<string> = [
          '142',
          '137',
          '9001',
          '29.10.@CCO',
          '30.10.!DJI',
        ];
        const stocks: StocksType = Object.keys(json).reduce(
          (result: StocksType, source) => {
            const parssedSource = json[source].DataSource
              ? json[source].DataSource.reduce(
                (relevantSources, sourceInfo) => {
                  const id = sourceInfo[5];
                  const sourceInfoObj: ?StockType = stocksIds.includes(id)
                    ? {
                      name: sourceInfo[1],
                      value: sourceInfo[3],
                      change: sourceInfo[4],
                    }
                    : null;
                  return ({
                    ...relevantSources,
                    ...(sourceInfoObj ? { [id]: sourceInfoObj, } : {}),
                  }: StocksType);
                },
                {}
              )
              : null;
            return ({
              ...result,
              ...(parssedSource ? { ...parssedSource, } : {}),
            }: StocksType);
          },
          ({}: any)
        );
        this.setState({
          stocks,
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    const { list, biAction, lazyLoadImages, } = this.props;
    const { stocks, } = this.state;
    const { title, extraLinks, } = list;

    let items;
    let dfp;

    if (config.has('appName') && config.get('appName') === 'styleguide') {
      // eslint-disable-next-line  no-underscore-dangle
      items = list.items.filter(item => item.__typename === 'TeaserInList');
      /* eslint-disable  no-underscore-dangle */
      dfp = list.dfp
        ? list.dfp.filter(item => item.__typename === 'DfpBanner')
        : null;
      /* eslint-enable  no-underscore-dangle */
    }
    else {
      items = list.items;
      dfp = list.dfp;
    }

    return (
      <FelaTheme
        render={theme => (
          <ListView
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
            {/* Title */}
            <GridItem
              width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
              miscStyles={{
                marginBottom: [
                  { until: 's', value: '1rem', },
                  { from: 's', until: 'l', value: '2rem', },
                ],
              }}
            >
              <ListViewHeader title={title} extraLinks={extraLinks} />
            </GridItem>

            {/* Content */}
            <GridItem
              width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
              stretchContent
            >
              <Grid gutter={4}>
                {/* Stocks */}
                <GridItem
                  stretchContent
                  width={[
                    { until: 'l', value: 1, },
                    { from: 'l', until: 'xl', value: 2 / 10, },
                    { from: 'xl', value: 1, },
                  ]}
                  miscStyles={{
                    marginBottom: [
                      { until: 's', value: '1rem', },
                      { from: 's', until: 'l', value: '2rem', },
                      { from: 'xl', value: '4rem', },
                    ],
                  }}
                >
                  <FelaComponent
                    style={{
                      height: '100%',
                      backgroundColor: theme.color('neutral', '-10'),
                      extend: [
                        borderTop(
                          '1px',
                          0,
                          'solid',
                          theme.color('neutral', '-2')
                        ),
                        borderBottom(
                          '1px',
                          0,
                          'solid',
                          theme.color('neutral', '-2')
                        ),
                      ],
                    }}
                  >
                    {stocks ? (
                      <Grid gutter={0} miscStyles={{ height: '100%', }}>
                        <GridItem
                          miscStyles={stockWrapperStyle(theme)}
                          width={stockWidth}
                        >
                          <FelaComponent style={stockStyle(theme)}>
                            <FelaComponent
                              style={{ ...theme.type(-2), fontWeight: '700', }}
                            >
                              {stocks['142'].name}
                            </FelaComponent>
                            <FelaComponent
                              style={{
                                color: theme.color('neutral', '-3'),
                                extend: [
                                  parseComponentProp(
                                    'display',
                                    [
                                      { until: 's', value: 'block', },
                                      { from: 's', value: 'inline', },
                                    ],
                                    theme.mq,
                                    (prop, value) => ({ [prop]: value, })
                                  ),
                                ],
                              }}
                              render="span"
                            >
                              {stocks['142'].value}
                            </FelaComponent>
                            <FelaComponent
                              style={stockYieldStyle(
                                theme,
                                stocks['142'].change
                              )}
                              render="span"
                            >
                              {stocks['142'].change
                                ? `${
                                  stocks['142'].change > 0 ? '+' : '-'
                                }${numToHebrewString(
                                  Math.abs(stocks['142'].change)
                                )}%`
                                : ''}
                            </FelaComponent>
                          </FelaComponent>
                        </GridItem>
                        <GridItem
                          miscStyles={stockWrapperStyle(theme, true)}
                          width={stockWidth}
                        >
                          <FelaComponent style={stockStyle(theme)}>
                            <FelaComponent
                              style={{ ...theme.type(-2), fontWeight: '700', }}
                            >
                              {stocks['137'].name}
                            </FelaComponent>
                            <FelaComponent
                              style={{
                                color: theme.color('neutral', '-3'),
                                extend: [
                                  parseComponentProp(
                                    'display',
                                    [
                                      { until: 's', value: 'block', },
                                      { from: 's', value: 'inline', },
                                    ],
                                    theme.mq,
                                    (prop, value) => ({ [prop]: value, })
                                  ),
                                ],
                              }}
                              render="span"
                            >
                              {stocks['137'].value}
                            </FelaComponent>
                            <FelaComponent
                              style={stockYieldStyle(
                                theme,
                                stocks['137'].change
                              )}
                              render="span"
                            >
                              {stocks['137'].change
                                ? `${
                                  stocks['137'].change > 0 ? '+' : '-'
                                }${numToHebrewString(
                                  Math.abs(stocks['137'].change)
                                )}%`
                                : ''}
                            </FelaComponent>
                          </FelaComponent>
                        </GridItem>
                        <GridItem
                          miscStyles={stockWrapperStyle(theme)}
                          width={stockWidth}
                        >
                          <FelaComponent style={stockStyle(theme)}>
                            <FelaComponent
                              style={{ ...theme.type(-2), fontWeight: '700', }}
                            >
                              {stocks[9001].name}
                            </FelaComponent>
                            <FelaComponent
                              style={{
                                color: theme.color('neutral', '-3'),
                                extend: [
                                  parseComponentProp(
                                    'display',
                                    [
                                      { until: 's', value: 'block', },
                                      { from: 's', value: 'inline', },
                                    ],
                                    theme.mq,
                                    (prop, value) => ({ [prop]: value, })
                                  ),
                                ],
                              }}
                              render="span"
                            >
                              {stocks[9001].value}
                            </FelaComponent>
                            <FelaComponent
                              style={stockYieldStyle(
                                theme,
                                stocks[9001].change
                              )}
                              render="span"
                            >
                              {stocks[9001].change
                                ? `${
                                  stocks[9001].change > 0 ? '+' : '-'
                                }${numToHebrewString(
                                  Math.abs(stocks[9001].change)
                                )}%`
                                : ''}
                            </FelaComponent>
                          </FelaComponent>
                        </GridItem>
                        <GridItem
                          miscStyles={stockWrapperStyle(theme)}
                          width={stockWidth}
                        >
                          <FelaComponent style={stockStyle(theme)}>
                            <FelaComponent
                              style={{ ...theme.type(-2), fontWeight: '700', }}
                            >
                              {stocks['29.10.@CCO'].name}
                            </FelaComponent>
                            <FelaComponent
                              style={{
                                color: theme.color('neutral', '-3'),
                                extend: [
                                  parseComponentProp(
                                    'display',
                                    [
                                      { until: 's', value: 'block', },
                                      { from: 's', value: 'inline', },
                                    ],
                                    theme.mq,
                                    (prop, value) => ({ [prop]: value, })
                                  ),
                                ],
                              }}
                              render="span"
                            >
                              {stocks['29.10.@CCO'].value}
                            </FelaComponent>
                            <FelaComponent
                              style={stockYieldStyle(
                                theme,
                                stocks['29.10.@CCO'].change
                              )}
                              render="span"
                            >
                              {stocks['29.10.@CCO'].change
                                ? `${
                                  stocks['29.10.@CCO'].change > 0 ? '+' : '-'
                                }${numToHebrewString(
                                  Math.abs(stocks['29.10.@CCO'].change)
                                )}%`
                                : ''}
                            </FelaComponent>
                          </FelaComponent>
                        </GridItem>
                        <GridItem
                          miscStyles={stockWrapperStyle(theme, true)}
                          width={stockWidth}
                        >
                          <FelaComponent style={stockStyle(theme, false)}>
                            <FelaComponent
                              style={{ ...theme.type(-2), fontWeight: '700', }}
                            >
                              {stocks['30.10.!DJI'].name}
                            </FelaComponent>
                            <FelaComponent
                              style={{ color: theme.color('neutral', '-3'), }}
                              render="span"
                            >
                              {stocks['30.10.!DJI'].value}
                            </FelaComponent>
                            <FelaComponent
                              style={stockYieldStyle(
                                theme,
                                stocks['30.10.!DJI'].change
                              )}
                              render="span"
                            >
                              {stocks['30.10.!DJI'].change
                                ? `${
                                  stocks['30.10.!DJI'].change > 0 ? '+' : '-'
                                }${numToHebrewString(
                                  Math.abs(stocks['30.10.!DJI'].change)
                                )}%`
                                : ''}
                            </FelaComponent>
                          </FelaComponent>
                        </GridItem>
                      </Grid>
                    ) // TODO: placeholder instead of null
                      : null}
                  </FelaComponent>
                </GridItem>

                <GridItem
                  width={[
                    { until: 'l', value: 1, },
                    { from: 'l', until: 'xl', value: 8 / 10, },
                    { from: 'xl', value: 6 / 10, },
                  ]}
                >
                  <Grid gutter={4}>
                    <GridItem
                      width={[
                        { until: 's', value: 1, },
                        { from: 's', until: 'l', value: 6 / 12, },
                        { from: 'l', until: 'xl', value: 5 / 8, },
                        { from: 'xl', value: 3 / 6, },
                      ]}
                    >
                      <MainTeaser
                        data={items[0]}
                        biAction={biAction}
                        lazyLoadImages={lazyLoadImages}
                      />
                    </GridItem>
                    <GridItem
                      width={[
                        { until: 's', value: 1, },
                        { from: 's', until: 'l', value: 6 / 12, },
                        { from: 'l', until: 'xl', value: 3 / 8, },
                        { from: 'xl', value: 3 / 6, },
                      ]}
                      miscStyles={{
                        marginTop: [ { until: 's', value: '1rem', }, ],
                      }}
                      stretchContent
                    >
                      <TextualTeaser
                        data={items[1]}
                        index={1}
                        biAction={biAction}
                      />
                      <TextualTeaser
                        data={items[2]}
                        index={2}
                        biAction={biAction}
                      />
                      <TextualTeaser
                        data={items[3]}
                        index={3}
                        biAction={biAction}
                      />
                    </GridItem>
                  </Grid>
                </GridItem>
                {dfp && dfp.length > 0 ? (
                  <GridItem
                    width={[
                      { until: 'l', value: 1, },
                      { from: 'xl', value: 4 / 10, },
                    ]}
                    miscStyles={{
                      paddingStart: [ { until: 's', value: '2rem', }, ],
                      paddingEnd: [ { until: 's', value: '2rem', }, ],
                      display: [
                        { until: 'l', value: 'block', },
                        { from: 'l', until: 'xl', value: 'none', },
                        { from: 'xl', value: 'block', },
                      ],
                      width: [ { until: 's', value: '300px', }, ],
                      height: [ { until: 's', value: '250px', }, ],
                    }}
                  >
                    <GeneralAdSlot {...dfp[0]} />
                  </GridItem>
                ) : null}
              </Grid>
            </GridItem>
            {dfp && dfp.length > 0 ? (
              <GridItem
                width={1}
                miscStyles={{
                  display: [
                    { until: 'l', value: 'none', },
                    { from: 'l', until: 'xl', value: 'block', },
                    { from: 'xl', value: 'none', },
                  ],
                }}
              >
                <GeneralAdSlot {...dfp[0]} />
              </GridItem>
            ) : null}
          </ListView>
        )}
      />
    );
  }
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type TeaserProps = {
  biAction: ListBiActionType,
  data: TeaserDataType,
  index: 0 | 1 | 2 | 3,
  lazyLoadImages: ?boolean,
};

MainTeaser.defaultProps = { lazyLoadImages: true, index: 0, };

function MainTeaser({
  biAction,
  data,
  index,
  lazyLoadImages,
}: TeaserProps): React.Node {
  const articleId = data.contentId;

  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={biAction({ index, articleId, })}
          gridMiscStyles={{ flexDirection: 'column', }}
        >
          {data.image ? (
            <TeaserMedia
              data={data}
              miscStyles={{ flexGrow: '0', flexShrink: '0', }}
            >
              <Picture
                lazyLoad={lazyLoadImages}
                {...pictureAssetProps({
                  bps: theme.bps,
                  imgData: data.image,
                  defaultImgOptions: {
                    sizes: '108px',
                    aspect: 'headline',
                    widths: [ 108, 216, ],
                  },
                  sources: [
                    {
                      from: 's',
                      aspect: 'regular',
                      sizes: [
                        { from: 'xl', size: '280px', },
                        { from: 'l', size: '292px', },
                        { from: 'm', size: '350px', },
                        { from: 's', size: '364px', },
                      ],
                      widths: [ 280, 292, 350, 364, ],
                    },
                  ],
                })}
              />
            </TeaserMedia>
          ) : null}

          <TeaserContent
            data={data}
            padding={[ 1, 1, 0, ]}
            gridItemMiscStyles={{ flexBasis: 'auto', }}
            footerColor={[ 'neutral', '-3', ]}
            footerPadding={[
              { until: 's', value: 1, },
              { from: 's', value: [ 2, 1, 1, ], },
            ]}
            footerMiscStyles={{ type: -2, }}
            renderContent={() => (
              <TeaserHeader
                typeScale={[ { until: 's', value: 1, }, { from: 's', value: 2, }, ]}
                {...data}
              />
            )}
            renderFooter={() => <Footer data={data} showAuthors />}
          />
        </Teaser>
      )}
    />
  );
}

TextualTeaser.defaultProps = { lazyLoadImages: false, };

function TextualTeaser({ biAction, data, index, }: TeaserProps): React.Node {
  const articleId = data.contentId;
  return (
    <Teaser
      data={data}
      onClick={() => biAction({ index, articleId, })}
      miscStyles={{
        flexGrow: '1',
        marginTop:
          index === 1
            ? 0
            : [ { until: 's', value: '1rem', }, { from: 's', value: '4rem', }, ],
      }}
    >
      <TeaserContent
        data={data}
        padding={[ 1, 1, 0, ]}
        footerPadding={[ 2, 1, 1, ]}
        footerMiscStyles={{ type: -2, }}
        renderContent={() => <TeaserHeader {...data} typeScale={headerTypo} />}
        renderFooter={() => <Footer data={data} />}
      />
    </Teaser>
  );
}

type FooterProps = { data: TeaserDataType, showAuthors: boolean, };

Footer.defaultProps = { showAuthors: false, };

function Footer({ data, showAuthors, }: FooterProps): React.Node {
  return (
    <React.Fragment>
      {showAuthors && data.authors ? (
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
        miscStyles={{ marginInlineEnd: '1rem', }}
      />
    </React.Fragment>
  );
}

// /////////////////////////////////////////////////////////////////////
//                          STYLE and UTILS                           //
// /////////////////////////////////////////////////////////////////////

function numToHebrewString(num: number): string {
  return num.toLocaleString('he', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function stockWrapperStyle(theme: Object, hideOnM: boolean = false): Object {
  return {
    extend: [
      theme.type(-1),
      hideOnM
        ? {
          display: [
            { until: 'l', value: 'none', },
            { from: 'l', value: 'block', },
          ],
        }
        : {},
    ],
  };
}

function stockStyle(
  theme: Object,
  border: boolean = true,
  hideOnM: boolean = false
) {
  return {
    paddingEnd: '2rem',
    paddingBottom: '1rem',
    height: '100%',
    extend: [
      parseComponentProp(
        'paddingTop',
        [
          { until: 'l', value: '1rem', },
          { from: 'l', until: 'xl', value: '2rem', },
          { from: 'xl', value: '1rem', },
        ],
        theme.mq,
        (prop, value) => ({ [prop]: value, })
      ),
      parseComponentProp(
        'paddingStart',
        [
          { until: 's', value: '1rem', },
          { from: 's', until: 'l', value: '2rem', },
          { from: 'l', until: 'xl', value: '1rem', },
          { from: 'xl', value: '2rem', },
        ],
        theme.mq,
        (prop, value) => ({ [prop]: value, })
      ),
      ...(border
        ? [
          ...[
            !hideOnM
              ? theme.mq(
                { until: 'l', },
                borderEnd('1px', 'solid', theme.color('neutral', '-5'))
              )
              : [],
          ],
          theme.mq(
            { from: 'l', until: 'xl', },
            {
              ...borderBottom('1px', 0, 'solid', theme.color('neutral', '-5')),
            }
          ),
          theme.mq(
            { from: 'xl', },
            borderEnd('1px', 'solid', theme.color('neutral', '-5'))
          ),
        ]
        : []),
    ],
  };
}

function stockYieldStyle(theme: Object, change?: ?number): Object {
  return {
    color:
      change && change < 0 ? theme.color('negative') : theme.color('positive'),
    direction: 'ltr',
    fontWeight: '700',
    paddingEnd: '1rem',
    position: 'relative',
    textAlign: 'start',
    extend: [
      theme.mq({ until: 'm', }, { display: 'inline-block', marginTop: '1rem', }),
    ],
  };
}
