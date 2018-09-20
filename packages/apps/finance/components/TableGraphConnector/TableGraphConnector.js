// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaTheme, } from 'react-fela';
import { Grid, GridItem, } from '@haaretz/htz-components';

import StockTable from '../StockTable/StockTable';
import GraphController from '../GraphController/GraphController';
import type { StockData, } from '../StockTable/StockTable';
import SectionLink from '../SectionLink/SectionLink';

type Props = {};

type State = {
  ...StockData,
  selectedPeriod: string | null,
};

class TableGraphConnector extends React.Component<Props, State> {
  state: State;

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !this.state || (
        nextState.id !== this.state.id ||
        nextState.selectedPeriod !== this.state.selectedPeriod
      )
    );
  }

  changeStock: StockData => void = stockData => (
    this.setState(stockData)
  );

  changePeriod: string => void = period => (
    this.setState({
      selectedPeriod: period,
    })
  );

  render(): Node {
    const { id, name, type, } = this.state || {};
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
              <StockTable
                changeStock={this.changeStock}
                miscStyles={{
                  direction: 'rtl',
                  position: 'absolute',
                }}
              />
            </GridItem>
            <GridItem
              width={2 / 3}
            >
              <GraphController
                selectedStockId={id}
                selectedStockName={name}
                changePeriod={this.changePeriod}
              />
              <SectionLink
                href={{
                  pathname: `/${type || ''}`,
                  query: {
                    id,
                  },
                }}
                as={`/${type || ''}/${name || ''}`}
              >
                <span>למידע נוסף על {name}</span>
              </SectionLink>
            </GridItem>
          </Grid>
        )}
      />
    );
  }
}

export default TableGraphConnector;
