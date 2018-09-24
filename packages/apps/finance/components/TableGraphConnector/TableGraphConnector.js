// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaTheme, } from 'react-fela';
import { Grid, GridItem, } from '@haaretz/htz-components';

import StockTable from '../StockTable/StockTable';
import GraphController from '../GraphController/GraphController';
import type { StockData, } from '../StockTable/StockTable';
import SectionLink from '../SectionLink/SectionLink';

type Props = {
  marketId?: number | string | null,
};

type State = {
  ...StockData,
};

class TableGraphConnector extends React.Component<Props, State> {
  static defaultProps = {
    marketId: null,
  };

  state: State;

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !this.state || (
        nextProps.marketId !== this.props.marketId ||
        nextState.id !== this.state.id
      )
    );
  }

  changeStock: StockData => void = stockData => (
    this.setState(stockData)
  );

  render(): Node {
    const { id, name, type, } = this.state || {};
    const { marketId, } = this.props;
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
                marketId={marketId}
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
              />
              <SectionLink
                href={{
                  pathname: type ? `/${type}` : '/',
                  query: {
                    id,
                  },
                }}
                as={`/${type || ''}/${id || ''}`}
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
