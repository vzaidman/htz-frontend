// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { Select, Button, } from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { Asset, } from '../../types/asset';

type State = {
  id: string,
  assetId: string,
  expirationBenchmarkDate: string,
  expirationDate: string,
  expirationBenchmarkDates: Array<string>,
}

type Props = {
  assets: Array<Asset>,
  children: ({ assetId: string, expirationDate: string, }) => Node,
}

const SelectionLabel = ({ content, }) => (
  <FelaComponent
    style={{
      fontWeight: '700',
      marginEnd: '2rem',
    }}
    render="span"
  >
    {content}
  </FelaComponent>
);

class ExpirationBenchmarkFilter extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    const { id, expirationBenchmarkDates, } = nextProps.assets[0];
    const expirationBenchmarkDate: string = expirationBenchmarkDates[0];
    return !prevState ? {
      id,
      expirationBenchmarkDate,
      expirationBenchmarkDates,
      assetId: id,
      expirationDate: expirationBenchmarkDate,
    }
      : prevState;
  }

  updateSelection: () => void = () => {
    this.setState(prevState => ({
      assetId: prevState.id,
      expirationDate: prevState.expirationBenchmarkDate,
    }));
  };

  render(): Node {
    const { children, assets, } = this.props;
    const {
      assetId,
      expirationDate,
      id,
      expirationBenchmarkDate,
      expirationBenchmarkDates,
    } = this.state;
    const selectedItem: ?Asset = assets.find(asset => asset.id === id);
    const selectedDate: ?string =
      expirationBenchmarkDates.find(expirationDate =>
        expirationDate === expirationBenchmarkDate
      );
    return (
      <Fragment>
        <FelaComponent style={{ position: 'relative', }}>
          <FelaComponent
            style={theme => ({
              ...theme.type(-2),
              alignItems: 'baseline',
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingStart: '2rem',
              paddingEnd: '2rem',
              position: 'absolute',
              end: '0',
              top: '0',
            })}
          >
            <SelectionLabel content="בחר נכס בסיס:" />
            <Select
              wrapperStyles={{
                marginEnd: '4rem',
              }}
              onChange={({ value, }) => {
                const selectedAsset: ?Asset = assets.find(asset => asset.id === value);
                this.setState(selectedAsset ? {
                  id: selectedAsset.id,
                  expirationBenchmarkDates: selectedAsset.expirationBenchmarkDates,
                  expirationBenchmarkDate: selectedAsset.expirationBenchmarkDates[0],
                } : {});
              }}
              controlledSelectedItem={selectedItem ? {
                value: selectedItem.id,
                display: selectedItem.name,
                key: selectedItem.id,
              } : {}}
              variant="graph"
              items={
                assets.map((asset: Asset) => (
                  {
                    value: asset.id,
                    display: asset.name,
                    key: asset.id,
                  }
                ))
              }
              attrs={{ 'aria-hidden': true, }}
              buttonMiscStyles={{
                paddingBottom: '0.5rem',
                paddingTop: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: '15rem',
              }}
            />
            <SelectionLabel content="בחר חודש פקיעה:" />
            <Select
              wrapperStyles={{
                marginEnd: '4rem',
              }}
              onChange={({ value, }) => {
                this.setState({
                  expirationBenchmarkDate: value,
                });
              }}
              controlledSelectedItem={{
                value: selectedDate,
                display: selectedDate,
                key: `${id}-${selectedDate || ''}`,
              }}
              variant="graph"
              items={
                expirationBenchmarkDates.map((expirationDate: string) => (
                  {
                    value: expirationDate,
                    display: expirationDate,
                    key: `${id}-${expirationDate}`,
                  }
                ))
              }
              attrs={{ 'aria-hidden': true, }}
              buttonMiscStyles={{
                paddingBottom: '0.5rem',
                paddingTop: '0.5rem',
                whiteSpace: 'nowrap',
                minWidth: '15rem',
              }}
            />
            <Button
              boxModel={{ hp: 2, vp: 0.5, }}
              fontSize={-1}
              variant="primaryOpaque"
              onClick={this.updateSelection}
            >
              הצג
            </Button>
          </FelaComponent>
        </FelaComponent>
        {children({ assetId, expirationDate, })}
      </Fragment>
    );
  }
}

export default ExpirationBenchmarkFilter;
