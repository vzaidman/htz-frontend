// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import {
  borderTop,
  borderBottom,
  parseComponentProp,
} from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import CommentsCount from '../../../CommentsCount/CommentsCount';
import GeneralAdSlot from '../../../Ads/GeneralAdSlot';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import StickyListViewHeader from '../../../ListViewHeader/StickyListViewHeader';
import Picture from '../../../Image/Picture';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
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

export type Props = {
  list: ListDataType,
  gaAction: () => void,
  biAction: ?ListBiActionType,
  lazyLoadImages: boolean,
};

type State = {
  stocks: ?StocksType,
};

const headerTypo = [
  { until: 's', value: 0, },
  { from: 's', until: 'l', value: -1, },
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
      .fetch('https://apifinance.themarker.com/TheMarkerApi/GetIndexes', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
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
    const { items, dfp, ...restOfList } = list;

    return (
      <ListView
        padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
      >
        {/* Title */}
        <StickyListViewHeader
          width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
          miscStyles={{
            marginBottom: [
              { until: 's', value: '1rem', },
              { from: 's', until: 'l', value: '2rem', },
            ],
          }}
          {...restOfList}
        />

        {/* Content */}
        <GridItem
          width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
          stretchContent
        >
          <Grid gutter={4}>
            {/* Stocks */}
            {stocks && <Stocks stocks={stocks} />}
            {/* Teasers */}
            <GridItem
              miscStyles={{
                order: [ { from: 'l', until: 'xl', value: -1, }, ],
              }}
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
                    marginTop: [ { until: 's', value: '2rem', }, ],
                    display: 'flex',
                  }}
                >
                  <Grid
                    gutter={0}
                    rowSpacing={[
                      { until: 's', value: { amount: 2, }, },
                      { from: 's', value: { amount: 4, }, },
                    ]}
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
                  </Grid>
                </GridItem>
              </Grid>
            </GridItem>
            {dfp && dfp.length > 0
              ? dfp.map(banner => (
                <GridItem
                  key={banner.contentId}
                  width={[
                    { until: 's', value: 1, },
                    { from: 'xl', value: 4 / 10, },
                  ]}
                  miscStyles={{
                    display: [
                      { until: 's', value: 'block', },
                      { from: 's', until: 'xl', value: 'none', },
                      { from: 'xl', value: 'flex', },
                    ],
                    alignItems: [ { from: 'xl', value: 'center', }, ],
                    justifyContent: [ { from: 'xl', value: 'center', }, ],
                    width: [ { until: 's', value: '300px', }, ],
                  }}
                >
                  <GeneralAdSlot {...banner} styleRule={bannerStyle} />
                </GridItem>
              ))
              : null}
          </Grid>
        </GridItem>
      </ListView>
    );
  }
}

// /////////////////////////////////////////////////////////////////////
//                              TEASERS                               //
// /////////////////////////////////////////////////////////////////////

type TeaserProps = {
  biAction: ?ListBiActionType,
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
}: TeaserProps): Node {
  const itemId = data.representedContent == null ? data.contentId : data.representedContent;

  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={
            biAction ? () => biAction({ index, articleId: itemId, }) : null
          }
          isStacked
        >
          <TeaserMedia
            data={data}
            onClick={
              biAction ? () => biAction({ index, articleId: itemId, }) : null
            }
            isStacked
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...pictureAssetProps({
                bps: theme.bps,
                imgData: data.image,
                defaultImgOptions: {
                  sizes: 'calc(100vw - 4rem)',
                  aspect: 'headline',
                  widths: [ 352, 400, 575, ],
                },
                sources: [
                  {
                    from: 's',
                    aspect: 'regular',
                    sizes: [
                      { from: 'xl', size: '281px', },
                      { from: 'l', size: '393px', },
                      { from: 'm', size: '348px', },
                      { from: 's', size: '264px', },
                    ],
                    widths: [ 528, 393, 348, 281, 264, ],
                  },
                ],
              })}
            />
          </TeaserMedia>

          <TeaserContent
            data={data}
            padding={[
              { until: 's', value: [ 1, 1, 0, ], },
              { from: 's', value: [ 1, 2, 0, ], },
            ]}
            isStacked
            footerColor={[ 'neutral', '-3', ]}
            footerPadding={[
              { until: 's', value: 1, },
              { from: 's', until: 'l', value: [ 2, 2, 1, ], },
              { from: 'l', value: [ 2, 1, 1, ], },
            ]}
            footerMiscStyles={{ type: -3, }}
            renderContent={() => (
              <TeaserHeader
                typeScale={[
                  { until: 's', value: 1, },
                  { from: 's', until: 'xl', value: 2, },
                  { from: 'xl', value: 1, },
                ]}
                onClick={
                  biAction ? () => biAction({ index, articleId: itemId, }) : null
                }
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

function TextualTeaser({ biAction, data, index, }: TeaserProps): Node {
  const itemId = data.representedContent == null ? data.contentId : data.representedContent;

  return (
    <GridItem width={1} miscStyles={{ flexGrow: '1', }} stretchContent>
      <Teaser
        data={data}
        onClick={biAction ? () => biAction({ index, articleId: itemId, }) : null}
        miscStyles={{
          flexGrow: '1',
        }}
        gridMiscStyles={{ alignContent: 'stretch', }}
      >
        <TeaserContent
          data={data}
          padding={[
            { until: 's', value: [ 1, 2, 0, ], },
            { from: 's', until: 'l', value: [ 2, 2, 0, ], },
            { from: 'l', value: [ 1, 1, 0, ], },
          ]}
          footerPadding={[
            { until: 'l', value: [ 1, 2, ], },
            { from: 'l', value: [ 1, 1, ], },
          ]}
          footerMiscStyles={{ type: -3, }}
          renderContent={() => (
            <TeaserHeader
              {...data}
              typeScale={headerTypo}
              onClick={
                biAction ? () => biAction({ index, articleId: itemId, }) : null
              }
            />
          )}
          renderFooter={() => <Footer data={data} />}
        />
      </Teaser>
    </GridItem>
  );
}

type FooterProps = { data: TeaserDataType, showAuthors: boolean, };

Footer.defaultProps = { showAuthors: false, };

function Footer({ data, showAuthors, }: FooterProps): Node {
  return (
    <React.Fragment>
      {showAuthors && data.authors ? (
        <span style={{ marginInlineEnd: '1rem', }}>
          <TeaserAuthors
            authors={data.authors}
            miscStyles={{ fontWeight: 'bold', }}
          />
          {data.commentsCounts && data.commentsCounts > 4 ? (
            <span> | </span>
          ) : null}
        </span>
      ) : null}
      <CommentsCount commentsCount={data.commentsCounts} />
    </React.Fragment>
  );
}

// /////////////////////////////////////////////////////////////////////
//                               STOCKS                               //
// /////////////////////////////////////////////////////////////////////

type StockProps = StockType & {
  hideOnM: boolean,
};

Stock.defaultProps = {
  hideOnM: false,
};

function Stock({ name, value, change, hideOnM, }: StockProps): Node {
  return (
    <FelaTheme
      render={theme => (
        <GridItem
          gutter={2}
          rule={[ { until: 'l', value: true, }, { from: 'xl', value: true, }, ]}
          miscStyles={stockWrapperStyle(theme, hideOnM)}
          width={stockWidth}
        >
          <Grid miscStyles={stockStyle(theme)} gutter={1}>
            <GridItem
              width={[ { until: 'l', value: 1, }, { from: 'xl', value: 1, }, ]}
              miscStyles={stockNameStyle(theme)}
            >
              {name}
            </GridItem>
            <GridItem
              width={[ { until: 'l', value: 1, }, { from: 'xl', value: 1, }, ]}
            >
              <Grid gutter={1}>
                <GridItem
                  width={[ { until: 's', value: 1, }, ]}
                  miscStyles={stockYieldStyle(theme, change)}
                >
                  {change
                    ? `${change > 0 ? '+' : '-'}${numToHebrewString(
                      Math.abs(change)
                    )}`
                    : ''}
                </GridItem>
                <GridItem
                  width={[ { until: 's', value: 1, }, ]}
                  miscStyles={stockValueStyle(theme)}
                >
                  {value}
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </GridItem>
      )}
    />
  );
}

type StocksProps = {
  stocks: StocksType,
};

function Stocks({ stocks, }: StocksProps): Node {
  return (
    <FelaTheme
      render={theme => (
        <GridItem
          gutter={4}
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
              backgroundColor: theme.color('white'),
              extend: [
                theme.mq(
                  { until: 'l', },
                  {
                    ...borderTop(
                      '2px',
                      0,
                      'solid',
                      theme.color('neutral', '-5')
                    ),
                    ...borderBottom(
                      '2px',
                      0,
                      'solid',
                      theme.color('neutral', '-5')
                    ),
                  }
                ),
                theme.mq(
                  { from: 'l', },
                  {
                    ...borderTop(
                      '1px',
                      0,
                      'solid',
                      theme.color('neutral', '-3')
                    ),
                    ...borderBottom(
                      '1px',
                      0,
                      'solid',
                      theme.color('neutral', '-3')
                    ),
                  }
                ),
              ],
            }}
          >
            <Grid
              gutter={0}
              miscStyles={{
                height: [ { from: 'l', until: 'xl', value: '100%', }, ],
                ':before': [
                  { until: 'l', value: startRule(theme), },
                  { from: 'l', until: 'xl', value: null, },
                  { from: 'xl', value: startRule(theme), },
                ],
              }}
            >
              <Stock {...stocks['142']} />
              <Stock {...stocks['137']} hideOnM />
              <Stock {...stocks['9001']} />
              <Stock {...stocks['29.10.@CCO']} />
              <Stock {...stocks['30.10.!DJI']} hideOnM />
            </Grid>
          </FelaComponent>
        </GridItem>
      )}
    />
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

function startRule(theme: Object): Object {
  return {
    content: '""',
    width: '1px',
    backgroundColor: theme.color('neutral', '-5'),
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100%',
    display: [ { from: 'l', until: 'xl', value: 'none', }, ],
  };
}

function stockNameStyle(theme: Object): Object {
  return {
    fontWeight: '700',
    flexGrow: 0,
    ...theme.type(-2, { untilBp: 's', }),
    ...theme.type(-1, { fromBp: 's', untilBp: 'xl', }),
    ...theme.type(-2, { fromBp: 'xl', }),
  };
}

function stockValueStyle(theme: Object): Object {
  return {
    flexBasis: 'auto',
    color: theme.color('neutral', '-3'),
    ...theme.type(-2, { untilBp: 's', }),
    ...theme.type(0, { fromBp: 's', untilBp: 'xl', }),
  };
}

function stockYieldStyle(theme: Object, change?: ?number): Object {
  return {
    order: [ { until: 's', value: 1, }, ],
    flexGrow: 0,
    color:
      change && change < 0 ? theme.color('negative') : theme.color('positive'),
    direction: 'ltr',
    fontWeight: '700',
    textAlign: 'start',
    flexBasis: 'auto',
    ...theme.type(0, { untilBp: 'xl', }),
  };
}

function stockWrapperStyle(theme: Object, hideOnM: boolean = false): Object {
  return {
    padding: [
      { until: 's', value: '1rem 1rem', },
      { from: 's', until: 'l', value: '2rem', },
      { from: 'l', until: 'xl', value: '2rem 1rem 0', },
      { from: 'xl', value: '0 2rem', },
    ],
    ...theme.type(-1),
    ...(hideOnM
      ? {
        display: [
          { until: 'l', value: 'none', },
          { from: 'l', value: 'block', },
        ],
      }
      : {}),
  };
}

function stockStyle(theme: Object) {
  return {
    paddingBottom: '1rem',
    height: '100%',
    ...parseComponentProp(
      'paddingTop',
      [
        { until: 'l', value: '1rem', },
        { from: 'l', until: 'xl', value: '2rem', },
        { from: 'xl', value: '1rem', },
      ],
      theme.mq,
      (prop, value) => ({ [prop]: value, })
    ),
    ...theme.mq(
      { from: 'l', until: 'xl', },
      {
        flexDirection: 'column',
        ...borderBottom('1px', 0, 'solid', theme.color('neutral', '-5')),
      }
    ),
  };
}

function bannerStyle({ theme, }) {
  return {
    extend: [
      theme.mq(
        { until: 's', },
        {
          ':not(:empty)': {
            marginTop: '5rem',
            '&::before': {
              content: '"- פרסומת -"',
              color: theme.color('neutral', -3),
              display: 'block',
              paddingTop: '0rem',
              paddingBottom: '0rem',
              textAlign: 'center',
              ...theme.type(-2),
            },
          },
        }
      ),
    ],
  };
}
