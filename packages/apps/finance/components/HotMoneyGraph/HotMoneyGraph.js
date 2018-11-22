// @flow
/* global fetch */
import React from 'react';
import { FelaTheme, } from 'react-fela';
import { Grid, GridItem, } from '@haaretz/htz-components';

import type { Node, } from 'react';

import AssetsTable from '../AssetsTable/AssetsTable';
import Graph from '../Graph/Graph';
import StockStats from '../AssetStats/AssetStats';

type Asset = {
  name: string,
  change: string,
  id: string,
};

type Props = {
  period: number,
  part: number,
  assets: Array<Asset>,
  headers: Array<{
    display: string,
    value: string,
    style: Object,
    percentage?: boolean,
  }>
};

type GraphData = Array<{
  time: number,
  value: number,
}>;

type State = {
  ...Asset,
  graphData: GraphData,
};

class HotMoneyGraph extends React.Component<Props, State> {
  state: State;

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !this.state || (
        nextProps !== this.props ||
        nextState.id !== this.state.id
      )
    );
  }

  changeAsset: Asset => void = stockData => {
    const { period, part, } = this.props;
    fetch(`https://cors-escape.herokuapp.com/http://apifinance.themarker.com/TheMarkerApi/HotMoneyCharts?indexId=${stockData.id}&part=${part}&period=${period}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', },
    })
      .then(res => res.json())
      .then(json => {
        const graphData: GraphData =
          json.chart.dataSource.map((asset: { time: number, value: number, }) => ({
            time: asset[0],
            value: asset[1],
          }));
        this.setState({
          ...stockData,
          graphData,
        });
      })
      .catch(err => console.log(err));
  };

  render(): Node {
    const { graphData, } = this.state || {};
    const { assets, headers, period, } = this.props;
    const time = period === 2 ? 'monthly' : period === 3 ? 'yearly' : 'quarterly';
    return (
      <FelaTheme
        render={theme => (
          <Grid
            gutter={2}
            miscStyles={{
              backgroundColor: theme.color('neutral', '-10'),
              marginStart: '0rem',
              marginEnd: '0rem',
              paddingTop: '2rem',
            }}
          >
            <GridItem
              width={1 / 3}
              miscStyles={{
                direction: 'ltr',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              <AssetsTable
                changeAsset={this.changeAsset}
                assets={assets}
                headers={headers}
                miscStyles={{
                  direction: 'rtl',
                  position: 'absolute',
                }}
              />
            </GridItem>
            <GridItem
              width={2 / 3}
            >
              <StockStats
                period={time}
                graphType="hotMoney"
                render={({ changeStats, }) => (
                graphData ?
                  <Graph
                    data={graphData}
                    type="line"
                    time={time}
                    changeStats={changeStats}
                    width={574}
                    height={308}
                    margin={{ top: 34, right: 10, bottom: 15, left: 50, }}
                  />
                : null
                )}
              />
            </GridItem>
          </Grid>
        )}
      />
    );
  }
}

export default HotMoneyGraph;
