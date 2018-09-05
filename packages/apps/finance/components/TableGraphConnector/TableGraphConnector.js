// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { IconBack, HtzLink } from '@haaretz/htz-components';

import StockTable from '../StockTable/StockTable';
import GraphController from '../GraphController/GraphController';
import type { StockData, } from '../StockTable/StockTable';

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
        style={{
          display: 'flex',
          marginTop: '2rem',
        }}
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
          <FelaComponent
            style={theme => ({
              ...theme.type(-2),
              backgroundColor: theme.color('neutral', '-5'),
              color: theme.color('neutral', '-1'),
              display: 'block',
              fontWeight: '700',
              paddingBottom: '1rem',
              paddingTop: '1rem',
              textAlign: 'center',
              ':before': {
                content: '"למידע נוסף על "',
              },
            })}
            render={({ className, }) => (
              <HtzLink
                href={{
                  pathname: `/${section || ''}`,
                  query: {
                    id: indexId,
                  },
                }}
                asPath={`/${section || ''}/${name || ''}`}
                className={className}
              >
                {name}
                <IconBack size={-1} />
              </HtzLink>
            )}
          />
        </FelaComponent>
      </FelaComponent>
    );
  }
}

export default TableGraphConnector;
