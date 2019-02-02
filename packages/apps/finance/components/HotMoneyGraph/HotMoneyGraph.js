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
  change?: string,
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
  }>,
};

type GraphData = Array<{
  time: number,
  value: number,
}>;

type State = {
  graphData: ?GraphData,
  selectedIndex: number,
};

class HotMoneyGraph extends React.Component<Props, State> {
  state = {
    graphData: null,
    selectedIndex: 0,
  };

  componentDidUpdate() {
    if (this.props.assets.length && !this.state.graphData) this.changeAsset(0);
  }

  changeAsset: number => void = selectedIndex => {
    const { period, part, assets, } = this.props;
    fetch(
      `https://apifinance.themarker.com/TheMarkerApi/HotMoneyCharts?indexId=${
        assets[selectedIndex].id
      }&part=${part}&period=${period}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      }
    )
      .then(res => res.json())
      .then(json => {
        const graphData: GraphData = json.chart.dataSource.map(
          (asset: { time: number, value: number, }) => ({
            time: asset[0],
            value: asset[1],
          })
        );
        this.setState({
          graphData,
          selectedIndex,
        });
      })
      .catch(err => console.log(err));
  };

  render(): Node {
    const { assets, headers, period, } = this.props;
    if (!assets.length) return null;
    const { graphData, selectedIndex, } = this.state;
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
                selectedIndex={selectedIndex}
                miscStyles={{
                  direction: 'rtl',
                  position: 'absolute',
                }}
              />
            </GridItem>
            <GridItem width={2 / 3}>
              <StockStats
                period={time}
                graphType="hotMoney"
                render={({ changeStats, }) => (graphData ? (
                  <Graph
                    data={graphData}
                    type="line"
                    time={time}
                    changeStats={changeStats}
                    width={574}
                    height={250}
                    margin={{ top: 34, right: 10, bottom: 15, left: 50, }}
                  />
                ) : null)}
              />
            </GridItem>
          </Grid>
        )}
      />
    );
  }
}

export default HotMoneyGraph;
