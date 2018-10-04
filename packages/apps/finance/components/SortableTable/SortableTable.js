import React, { Fragment, } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { IconBack, } from '@haaretz/htz-components';

import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
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
    $sortOrder: String!,
    $offset: Int!
  ) {
    financeTable(
      parentId: $parentId,
      assetsId: $assetsId,
      count: $count,
      sortBy: $sortBy,
      sortOrder: $sortOrder,
      offset: $offset
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
  display: string,
  sortingOrder: 'ascend' | 'descend',
  style?: Object => StyleProps,
  content: Object => string,
}

type Props = {
  miscStyles?: Object,
  initialSort: string,
  fields: Array<FieldType>,
  parentId?: string,
  assetsId?: Array<string>,
  type: string,
  linkText: ?string,
  addLink: ?boolean,
  count?: number,
  count?: number,
  pagination: ?boolean,
};

type State = {
  pagination: boolean,
  sortBy?: string,
  sortOrder: string,
};

type SortIconsProps = {
  active: boolean,
  direction: string,
};

type TableLinkProps = {
  content: string,
  assetId: string,
  type: string,
  allowTab?: boolean,
};

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
const TableLink: TableLinkProps => Node = ({ content, assetId, type, allowTab, }) => (
  <FelaComponent
    style={{
      display: 'inline-block',
      width: '100%',
    }}
    render={({ className, }) => (
      <Link
        href={{
          pathname: `/asset/${type}`,
          query: {
            assetId,
            section: type,
          },
        }}
        as={`/${type}/${assetId}`}
      >
        <a
          {...!allowTab ? { tabIndex: -1, } : {}}
          className={className}
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
    count: 5,
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
    const {
      miscStyles,
      fields,
      parentId,
      type,
      linkText,
      assetsId,
      addLink,
      count,
      pagination,
    } = this.props;
    const { sortBy, sortOrder, } = this.state;
    return (
      <Query
        query={TableQuery(fields)}
        variables={{
          parentId,
          assetsId,
          count: assetsId ? assetsId.length : count,
          sortBy,
          sortOrder,
          offset: 0,
        }}
      >
        {({ loading, error, data: { financeTable: { assets, }, }, data, fetchMore, }) => {
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
                                {field.display}
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
                      {fields.map(field => (
                        <TdComponent
                          {...field.style ? { miscStyles: field.style(stock), } : {}}
                        >
                          <TableLink
                            allowTab
                            content={field.value(stock)}
                            assetId={stock.id}
                            type={type}
                          />
                        </TdComponent>
                      ))}
                    </FelaComponent>
                  ))}
                </tbody>
              </FelaComponent>
              {
                addLink ?
                  <SectionLink
                    href={{
                      pathname: `/${type || ''}`,
                      query: {
                        parentId,
                      },
                    }}
                    as={`/${type || ''}/${parentId || ''}`}
                  >
                    <span>{linkText || ''}</span>
                  </SectionLink>
                  : null
              }
              {
                pagination && assets.length <= count ?
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
                      width: '100%',
                      extend: [
                        ...(miscStyles
                          ? parseStyleProps(miscStyles, theme.mq, theme.type)
                          : []),
                      ],
                    })}
                    render={({ className, }) => (
                      <button
                        className={className}
                        onClick={() => (
                          fetchMore(
                            {
                              variables: {
                                offset: count || assets.length,
                              },
                              updateQuery: (prev, { fetchMoreResult, }) => (
                                fetchMoreResult
                                  ? Object.assign({}, prev, {
                                    financeTable: {
                                      assets: [
                                        ...prev.financeTable.assets,
                                        ...fetchMoreResult.financeTable.assets,
                                      ],
                                      __typename: 'FinanceTable',
                                    },
                                  })
                                  : prev
                              ),
                            }
                          )
                        )}
                      >
                        טען עוד
                        <IconBack
                          size={-1}
                          miscStyles={{
                            marginStart: '1rem',
                            transform: 'rotate(270deg)',
                          }}
                        />
                      </button>
                    )}
                  />
                  : null
              }
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default SortableTable;

