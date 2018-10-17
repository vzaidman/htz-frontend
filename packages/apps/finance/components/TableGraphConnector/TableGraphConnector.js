// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';
import { Grid, GridItem, } from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { Asset, } from '../../types/asset';

import StockTable from '../AssetsTable/AssetsTable';
import GraphController from '../GraphController/GraphController';
import SectionLink from '../SectionLink/SectionLink';

type Props = {
  assetId?: number | string | null,
  assetsId: ?Array<string>,
  isExchange?: boolean,
};

type State = {
  ...Asset,
};

class TableGraphConnector extends React.Component<Props, State> {
  static defaultProps = {
    assetId: null,
    assetsId: null,
    isExchange: false,
  };

  state: State;

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      !this.state || (
        nextProps.assetId !== this.props.assetId ||
        nextState.id !== this.state.id
      )
    );
  }

  changeAsset: Asset => void = stockData => (
    this.setState(stockData)
  );

  render(): Node {
    const { id, name, type, } = this.state || {};
    const { assetId, assetsId, isExchange, } = this.props;
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
                changeAsset={this.changeAsset}
                assetId={assetId}
                assetsId={assetsId}
                isExchange={isExchange}
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
                  pathname: `/asset/${type || ''}`,
                  query: {
                    assetId: id,
                    section: type,
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
