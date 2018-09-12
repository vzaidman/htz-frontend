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
        nextState.indexId !== this.state.indexId ||
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
    const { indexId, name, section, } = this.state || {};
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
                overflowY: 'scroll',
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
                selectedStockId={indexId}
                selectedStockName={name}
                changePeriod={this.changePeriod}
              />
              <SectionLink
                href={{
                  pathname: `/${section || ''}`,
                  query: {
                    id: indexId,
                  },
                }}
                as={`/${section || ''}/${name || ''}`}
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
