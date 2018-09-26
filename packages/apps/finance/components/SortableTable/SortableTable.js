import React, { Fragment, } from 'react';
import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import Link from 'next/link';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';
import type { StockData, } from '../StockTable/StockTable';
import { TdComponent, } from '../StockTable/StockTable';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import SectionLink from '../SectionLink/SectionLink';

const TableQuery: (Array<string>) => DocumentNode = fields => gql`
  query Table(
    $parentId: String,
    $assetsId: [String],
    $count: Int!,
    $sortBy: String!,
    $sortOrder: String!
  ) {
    financeTable(
      parentId: $parentId,
      assetsId: $assetsId,
      count: $count
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      assets {
        id
        type
        ${fields.map(field => `${field.name}\n`)}
      }
    }
  }
`;

type FieldType = {
  name: string,
  sortingOrder: 'ascend' | 'descend',
}

type Props = {
  miscStyles?: Object,
  initialSort: string,
  fields: Array<FieldType>,
  parentId?: string,
  assetsId?: Array<string>,
  type: string,
  linkText: string,
};

type State = {
  sortBy?: string,
  sortOrder: string,
};

type SortIconsProps = {
  active: boolean,
  direction: string,
};

type TableLinkProps = {
  content: string,
  id: string,
  type: string,
  allowTab?: boolean,
};

const headerTitles: Object = new Map([
  [ 'name', 'שם נייר', ],
  [ 'value', 'שער אחרון', ],
  [ 'changePercentage', '% שינוי', ],
  [ 'symbol', 'סימול בוול סטריט', ],
  [ 'arbGap', '% פער', ],
]);

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
  // num
);

// eslint-disable-next-line react/prop-types
const SortIcons: SortIconsProps => Node = ({ active, sortOrder, }) => (
  <FelaComponent
    style={{
      fontSize: '1.5rem',
      marginEnd: '1rem',
    }}
    render={({ theme, className, }) => {
      const ascendFill: string =
        active && sortOrder === 'ascend'
          ? theme.color('neutral', '-2')
          : theme.color('neutral', '-4');
      const descendFill: string =
        active && sortOrder === 'descend'
          ? theme.color('neutral', '-2')
          : theme.color('neutral', '-4');
      return (
        <svg className={className} viewBox="0 0 20 40" width="0.5em" height="1em">
          <polygon fill={ascendFill} points="0,15 10,0 20,15" />
          <polygon fill={descendFill} points="0,25 10,40 20,25" />
        </svg>
      );
    }}
  />
);

// eslint-disable-next-line react/prop-types
const TableLink: TableLinkProps => Node = ({ content, id, type, allowTab, }) => (
  <FelaComponent
    style={{
      display: 'inline-block',
      width: '100%',
    }}
    render={({ className, }) => (
      <Link
        href={{
          pathname: `/${type || ''}/${id || ''}`,
          query: {
            id,
          },
        }}
        as={`/${type || ''}/${id || ''}`}
      >
        <a
          {...!allowTab ? { tabIndex: -1, } : {}}
          className={className}
          href={`/${type || ''}/${id || ''}`}
        >
          {content}
        </a>
      </Link>
    )}
  />
);

const tdHeaderStyle: Object => Object = theme => ({
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'start',
  backgroundColor: theme.color('neutral', '-6'),
});

class SortableTable extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
    assetsId: null,
    parentId: null,
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

  reSort: FieldType => void = field => {
    const { sortBy, sortOrder, } = this.state;
    this.setState({
      sortBy: field.name,
      sortOrder:
        sortBy !== field.name ? field.sortingOrder :
          sortOrder === 'descend' ? 'ascend' : 'descend',
    });
  };

  render(): Node {
    const { miscStyles, fields, parentId, type, linkText, assetsId, } = this.props;
    const { sortBy, sortOrder, } = this.state;
    return (
      <Query
        query={TableQuery(fields)}
        variables={{
          parentId,
          assetsId,
          count: assetsId ? assetsId.length : 5,
          sortBy,
          sortOrder,
        }}
      >
        {({ loading, error, data: { financeTable: { assets, }, }, }) => {
          if (error) return null;
          if (loading) return null;
          return (
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
                        miscStyles={{
                        paddingTop: '0',
                        paddingBottom: '0',
                      }}
                      >
                        <FelaComponent
                          style={{ width: '100%', }}
                          render={({ className, }) => (
                            <button
                              className={className}
                              onClick={() => this.reSort(field)}
                            >
                              <FelaComponent
                                style={theme => ({
                                  ...tdHeaderStyle(theme),
                                  paddingEnd: '2rem',
                                  fontWeight: sortBy === field.name ? '700' : '300',
                                })}
                              >
                                <SortIcons
                                  active={sortBy === field.name}
                                  sortOrder={sortOrder}
                                />
                                {headerTitles.get(field.name)}
                              </FelaComponent>
                            </button>
                          )}
                        />
                      </TdComponent>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assets.map((stock: StockData) => (
                    <FelaComponent
                      style={theme => ({
                        backgroundColor: theme.color('neutral', '-10'),
                        extend: [
                          borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
                        ],
                      })}
                      render="tr"
                    >
                      <TdComponent
                        miscStyles={{
                          fontWeight: '700',
                          maxWidth: '17rem',
                          overflow: 'hidden',
                          paddingStart: '2rem',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <TableLink
                          allowTab
                          content={stock.name}
                          id={stock.id}
                          type={type}
                        />
                      </TdComponent>
                      <TdComponent>
                        <TableLink
                          content={numToString(stock.value || stock.symbol)}
                          id={stock.id}
                          type={type}
                        />
                      </TdComponent>
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
                        <TableLink
                          content={`
                            ${Number(stock.changePercentage || stock.arbGap) > 0 ? '+' : '-'}
                            ${numToString(Math.abs(Number(stock.changePercentage || stock.arbGap)))}%
                          `}
                          id={stock.id}
                          type={type}
                        />
                      </TdComponent>
                    </FelaComponent>
                  ))}
                </tbody>
              </FelaComponent>
              <SectionLink
                href={{
                  pathname: `/${type || ''}/${parentId || ''}`,
                  query: {
                    parentId,
                  },
                }}
                as={`/${type || ''}/${parentId || ''}`}
              >
                <span>{linkText}</span>
              </SectionLink>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default SortableTable;

