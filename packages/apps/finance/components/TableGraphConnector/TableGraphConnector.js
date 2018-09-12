// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';

import StockTable from '../StockTable/StockTable';
import GraphController from '../GraphController/GraphController';
import type { StockData, } from '../StockTable/StockTable';
import SectionLink from '../SectionLink/SectionLink';

type Props = {};

type State = {
  ...StockData,
  selectedTime: string | null,
};

class TableGraphConnector extends React.Component<Props, State> {
  state: State;

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !this.state || (
        nextState.indexId !== this.state.indexId ||
        nextState.selectedTime !== this.state.selectedTime
      )
    );
  }

  changeStock: StockData => void = stockData => (
    this.setState(stockData)
  );

  changeTime: string => void = time => (
    this.setState({
      selectedTime: time,
    })
  );

  render(): Node {
    const { indexId, name, section, } = this.state || {};
    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          paddingTop: '2rem',
          backgroundColor: theme.color('neutral', '-10'),
        })}
      >
        <FelaComponent
          style={{
            direction: 'ltr',
            flexGrow: '1',
            marginEnd: '2rem',
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
        </FelaComponent>
        <FelaComponent
          style={{
            flexGrow: '1',
          }}
        >
          <GraphController
            selectedStockId={indexId}
            selectedStockName={name}
            changeTime={this.changeTime}
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
        </FelaComponent>
      </FelaComponent>
    );
  }
}

export default TableGraphConnector;
