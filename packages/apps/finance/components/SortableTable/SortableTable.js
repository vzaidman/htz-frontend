import React from 'react';
import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';
import type { StockData, } from '../StockTable/StockTable';
import { TdComponent, } from '../StockTable/StockTable';
import { Query, } from '../ApolloBoundary/ApolloBoundary';

const TableQuery: (Array<string>) => DocumentNode = fields => gql`
  query Table(
    $parentId: String!,
    $count: Int!,
    $sortBy: String!,
    $sortOrder: String!
  ) {
    financeTable(
      parentId: $parentId,
      count: $count
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      assets {
        id
        type
        ${fields.map(field => `${field}\n`)}
      }
    }
  }
`;

type Props = {
  miscStyles?: Object,
  initialSort: string,
  fields: Array<string>,
  parentId: number | string,
};

type State = {
  sortBy?: string,
  sortOrder: string,
};

type SortIconsProps = {
  active: boolean,
  direction: string,
};

const headerTitles: Object = new Map([
  [ 'name', 'שם נייר', ],
  [ 'value', 'שער אחרון', ],
  [ 'changePercentage', '% שינוי', ],
  [ 'symbol', 'סימול בוול סטריט', ],
  [ 'arbGap', '% פער', ],
]);

const SortIcons: SortIconsProps => Node = ({ active, }) => (
  <FelaComponent
    style={{
      fontSize: '1.25rem',
      marginEnd: '1rem',
    }}
    render={({ theme, className, }) => {
      const fill: string = active ? theme.color('neutral', '-2') : theme.color('neutral', '-4');
      return (
        <svg className={className} viewBox="0 0 20 20" width="1.25em" height="1.25em">
          <polygon fill={fill} points="0,7 10,0 20,7" />
          <polygon fill={fill} points="0,13 10,20 20,13" />
        </svg>
      );
    }}
  />
);

const tdHeaderStyle: Object => Object = theme => ({
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
  marginBottom: '1rem',
  backgroundColor: theme.color('neutral', '-6'),
});

class SortableTable extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
  };

  state = {
    sortBy: null,
    sortOrder: 'descend',
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      sortBy: prevState.sortBy || nextProps.initialSort,
    };
  }

  reSort: string => void = field => {
    console.log(field);
    const { sortBy, sortOrder, } = this.state;
    this.setState({
      sortBy: field,
      sortOrder:
        sortBy !== field ? 'descend' :
          sortOrder === 'descend' ? 'ascend' : 'descend',
    });
  };

  render(): Node {
    const { miscStyles, fields, parentId, } = this.props;
    const { sortBy, sortOrder, } = this.state;
    return (
      <Query
        query={TableQuery(fields)}
        variables={{
          parentId,
          count: 5,
          sortBy,
          sortOrder,
        }}
      >
        {({ loading, error, data: { financeTable: { assets, }, }, }) => {
          if (error) return null;
          if (loading) return null;
          return (
            <FelaComponent
              style={(theme: Object) => ({
                ...theme.type(-1),
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
                  {fields.map((field: string) => (
                    <TdComponent
                      miscStyles={{
                      paddingTop: '0',
                      paddingBottom: '0',
                    }}
                    >
                      <button
                        onClick={() => this.reSort(field)}
                      >
                        <FelaComponent
                          style={theme => ({
                          ...tdHeaderStyle(theme),
                          paddingEnd: '2rem',
                        })}
                        >
                          <SortIcons active={sortBy === field} />
                          {headerTitles.get(field)}
                        </FelaComponent>
                      </button>
                    </TdComponent>
                  ))}
                </tr>
              </thead>
              {assets.map((stock: StockData) => (
                <FelaComponent
                  style={theme => ({
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: theme.color('neutral', '-6'),
                  },
                })}
                  render="tr"
                >
                  <TdComponent
                    miscStyles={{
                    fontWeight: '700',
                    paddingStart: '1rem',
                    paddingEnd: '2rem',
                    maxWidth: '17rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  >
                    {stock.name}
                  </TdComponent>
                  <TdComponent>{stock.value || stock.symbol}</TdComponent>
                  <TdComponent
                    miscStyles={{
                    color: Number(stock.changePercentage || stock.arbGap) < 0 ? 'red' : 'green',
                    direction: 'ltr',
                    fontWeight: '700',
                    paddingEnd: '2rem',
                    position: 'relative',
                    textAlign: 'start',
                  }}
                  >
                    <FelaComponent
                      style={{
                      ':before': {
                        content: Number(stock.changePercentage || stock.arbGap) > 0 ? '"+"' : '"-"',
                      },
                      ':after': {
                        content: '"%"',
                      },
                    }}
                      render="span"
                    >
                      {Math.abs(Number(stock.changePercentage || stock.arbGap))}
                    </FelaComponent>
                  </TdComponent>
                </FelaComponent>
              ))}
            </FelaComponent>
          );
        }}
      </Query>
    );
  }
}

export default SortableTable;

