import React, { Fragment, } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { IconBack, Query, } from '@haaretz/htz-components';

import type { StyleProps, } from '@haaretz/htz-css-tools';
import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { Asset, } from '../../types/asset';

import { TdComponent, } from '../AssetsTable/AssetsTable';
import SectionLink from '../SectionLink/SectionLink';

const TableQuery: (Array<string>) => DocumentNode = fields => gql`
  query SortableTable(
    $parentId: String,
    $assetSubSection: String,
    $assetsId: [String],
    $expirationBenchmarkDate: String,
    $count: Int!,
    $sortBy: String!,
    $sortOrder: String!,
    $offset: Int!
  ) {
    assetsList(
      parentId: $parentId,
      assetSubSection: $assetSubSection,
      assetsId: $assetsId,
      expirationBenchmarkDate: $expirationBenchmarkDate,
      count: $count,
      sortBy: $sortBy,
      sortOrder: $sortOrder,
      offset: $offset
    ) {
      id
      type
      ${fields.map(field => `${field.name}\n`)}
    }
  }
`;

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
  parentId?: string,
  assetsId?: Array<string>,
  type?: string,
  assetSubSection?: string,
  linkText: ?string,
  addLink: ?boolean,
  count?: number,
  loadMore: ?boolean,
  expirationBenchmarkDate?: string,
};

type State = {
  loadMore: boolean,
  sortBy?: string,
  sortOrder?: string,
  parentId?: string,
  expirationBenchmarkDate?: string,
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
      transform: 'translateY(-50%)',
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
export const TableLink: TableLinkProps => Node = ({ content, assetId, type, allowTab, }) => (
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
  type,
  linkText,
  addLink,
  loadMore,
  fields,
  sortOrder,
  assets,
  parentId,
  fetchData,
  fetchAll,
  client,
  count,
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
                    onClick={() => fetchData({ client, field, })}
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
            {fields.map((field: FieldType, index: number) => (
              <TdComponent
                key={`${field.name}-${asset.id}`}
                miscStyles={{
                  ...(field.style ? field.style(asset) : {}),
                  paddingStart: '2rem',
                }}
              >
                <TableLink
                  allowTab={index === 0}
                  content={field.value(asset)}
                  assetId={asset.id}
                  type={asset.type}
                />
              </TdComponent>
            ))}
          </FelaComponent>
        ))}
      </tbody>
    </FelaComponent>
    {
      addLink && type ?
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
      loadMore && assets.length <= count ?
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
          })}
          render={({ className, }) => (
            <button
              className={className}
              onClick={() => fetchAll(count || assets.length)}
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

class SortableTable extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
    headerMiscStyles: null,
    assetsId: null,
    parentId: null,
    type: null,
    assetSubSection: null,
    count: 5,
    expirationBenchmarkDate: null,
  };

  state = {
    sortBy: null,
    sortOrder: null,
    parentId: null,
    expirationBenchmarkDate: null,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      sortBy: prevState.sortBy || nextProps.initialSort,
      sortOrder: prevState.sortOrder ||
        nextProps.fields.find((field: FieldType) => (
          field.name === nextProps.initialSort
        )).sortingOrder,
      parentId: nextProps.parentId || prevState.parentId || null,
      expirationBenchmarkDate:
        nextProps.expirationBenchmarkDate || prevState.expirationBenchmarkDate || null,
    };
  }

  fetchData: ({ client: Object, field?: FieldType, props?: Props, }) => Promise<any> =
    async ({ client, field = null, props = null, }) => {
      const {
        fields,
        parentId,
        assetsId,
        count,
        assetSubSection,
        expirationBenchmarkDate,
      } = props || this.props;

      const sortBy = field ? field.name : this.state.sortBy;
      const sortOrder = field
        ? this.state.sortBy !== field.name
          ? field.sortingOrder
          : this.state.sortOrder === 'descend'
            ? 'ascend'
            : 'descend'
        : this.state.sortOrder;

      await client.query({
        query: TableQuery(fields),
        variables: {
          parentId,
          assetsId,
          count: assetsId ? assetsId.length : count,
          sortBy,
          sortOrder,
          assetSubSection,
          offset: 0,
          expirationBenchmarkDate,
        },
      });
      this.setState({
        sortBy,
        sortOrder,
      });
    };

  render(): Node {
    const {
      fields,
      parentId,
      assetsId,
      count,
      assetSubSection,
      expirationBenchmarkDate,
      ...props
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
          assetSubSection,
          offset: 0,
          expirationBenchmarkDate,
        }}
      >
        {({ loading, error, data, fetchMore, client, }) => {
          const fetchAll = (offset: number) => (
            fetchMore(
              {
                variables: {
                  offset,
                },
                updateQuery: (prev, { fetchMoreResult, }) => {
                  const assets = fetchMoreResult
                    ? [
                      ...prev.assetsList,
                      ...fetchMoreResult.assetsList,
                    ].sort((itemA, itemB) => {
                      const valueA = typeof itemA[sortBy] === 'string' ? itemA[sortBy].toUpperCase() : itemA[sortBy]; // ignore upper and lowercase
                      const valueB = typeof itemB[sortBy] === 'string' ? itemB[sortBy].toUpperCase() : itemB[sortBy]; // ignore upper and lowercase
                      if (valueA < valueB) {
                        return sortOrder === 'ascend' ? -1 : 1;
                      }
                      if (valueA > valueB) {
                        return sortOrder === 'ascend' ? 1 : -1;
                      }

                      // values must be equal
                      return 0;
                    })
                    : null;
                  return (
                    fetchMoreResult
                      ? Object.assign({}, prev, {
                        assetsList: assets,
                      })
                      : prev
                  );
                },
              }
            )
          );

          if (error) return null;
          if (loading) return null;

          const { assetsList: assets, }: Array<Asset> = data;
          return (
            <Table
              assets={assets}
              fetchData={this.fetchData}
              {...{ sortOrder, parentId, fetchMore, fields, client, count, sortBy, fetchAll, }}
              {...props}
            />
          );
        }}
      </Query>
    );
  }
}

export default SortableTable;

