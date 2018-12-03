import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';
import type { Assets, Asset, } from '../../pages/section/money';

import { TdComponent, } from '../AssetsTable/AssetsTable';
import { SortIcons, } from '../SortableTable/SortableTable';

type FieldType = {
  name: string,
  display: string,
  sortingOrder: 'ascend' | 'descend',
  style?: Object => StyleProps,
  value: Object => string,
}

type Props = {
  miscStyles?: StyleProps,
  headerMiscStyles?: StyleProps,
  initialSort: string, // eslint-disable-line react/no-unused-prop-types
  fields: Array<FieldType>,
  data: Assets,
};

type State = {
  sortBy?: string,
  sortOrder?: string,
};

const tdHeaderStyle: (Object, StyleProps) => Object = (theme, miscStyles) => ({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'start',
  backgroundColor: theme.color('neutral', '-6'),
  extend: [
    ...(miscStyles
      ? parseStyleProps(miscStyles, theme.mq, theme.type)
      : []),
  ],
});

/* eslint-disable react/prop-types */
const Table = ({
  miscStyles,
  headerMiscStyles,
  fields,
  sortData,
  sortOrder,
  assets,
  sortBy,
}) => (
  <Fragment>
    <FelaComponent
      style={(theme: Object) => ({
        ...theme.type(-2),
        tableLayout: 'fixed',
        whiteSpace: 'nowrap',
        width: '100%',
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render="table"
    >
      <thead>
        <tr>
          {fields.map((field: FieldType) => (
            <TdComponent
              key={field.name}
              miscStyles={{
                whiteSpace: 'pre-wrap',
                verticalAlign: 'bottom',
                paddingTop: '0',
                paddingBottom: '0',
              }}
            >
              <FelaComponent
                style={{ width: '100%', }}
                render={({ className, }) => (
                  <button
                    className={className}
                    onClick={() => sortData(field)}
                  >
                    <FelaComponent
                      style={theme => ({
                        ...tdHeaderStyle(theme, headerMiscStyles),
                        display: 'flex',
                        alignItems: 'flex-end',
                        paddingEnd: '2rem',
                        fontWeight: sortBy === field.name ? '700' : '300',
                      })}
                    >
                      <SortIcons
                        active={sortBy === field.name}
                        sortOrder={sortOrder}
                      />
                      <span>{field.display}</span>
                    </FelaComponent>
                  </button>
                )}
              />
            </TdComponent>
          ))}
        </tr>
      </thead>
      <tbody>
        {assets.map((asset: Asset) => (
          <FelaComponent
            key={asset.id}
            style={theme => ({
              backgroundColor: theme.color('neutral', '-10'),
              extend: [
                borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
              ],
            })}
            render="tr"
          >
            {fields.map((field: FieldType) => (
              <TdComponent
                key={`${field.name}-${asset.id}`}
                miscStyles={{
                  ...(field.style ? field.style(asset) : {}),
                  paddingStart: '2rem',
                }}
              >
                {field.value(asset)}
              </TdComponent>
            ))}
          </FelaComponent>
        ))}
      </tbody>
    </FelaComponent>
  </Fragment>
);


class StaticSortableTable extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
    headerMiscStyles: null,
  };

  state = {
    sortBy: null,
    sortOrder: null,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      sortBy: prevState.sortBy || nextProps.initialSort,
      sortOrder: prevState.sortOrder ||
        nextProps.fields.find((field: FieldType) => (
          field.name === nextProps.initialSort
        )).sortingOrder,
    };
  }

  sortData: FieldType => void = field => {
    const { name, sortingOrder, } = field;
    const { data, } = this.props;
    const sortOrder = field
      ? this.state.sortBy !== name
        ? sortingOrder
        : this.state.sortOrder === 'descend'
          ? 'ascend'
          : 'descend'
      : this.state.sortOrder;

    data.sort((itemA, itemB) => {
      const valueA =
        typeof itemA[name] === 'string' ? itemA[name].toUpperCase() : itemA[name]; // ignore upper and lowercase
      const valueB =
        typeof itemB[name] === 'string' ? itemB[name].toUpperCase() : itemB[name]; // ignore upper and lowercase
      if (valueA < valueB) {
        return sortOrder === 'ascend' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'ascend' ? 1 : -1;
      }

      // values must be equal
      return 0;
    });

    this.setState({
      sortBy: name,
      sortOrder,
    });

    console.log(data);
  };

  render(): Node {
    const {
      data,
      ...props
    } = this.props;

    const { sortBy, sortOrder, } = this.state;
    return (
      <Table
        assets={data}
        sortData={this.sortData}
        {...{ sortOrder, sortBy, }}
        {...props}
      />
    );
  }
}

export default StaticSortableTable;

