// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { Grid, GridItem, Query, } from '@haaretz/htz-components';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import AssetsTable from '../AssetsTable/AssetsTable';
import GraphController from '../GraphController/GraphController';
import SectionLink from '../SectionLink/SectionLink';

const TableQuery: DocumentNode = gql`
  query GraphTable(
    $assetsId: [String]
    $assetId: String
    $count: Int
    $sortBy: String
    $sortOrder: String
  ) {
    assetsList(
      assetsId: $assetsId
      assetId: $assetId
      count: $count
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      name
      value
      changePercentage
      id
      type
    }
  }
`;

type Props = {
  assetId?: number | string | null,
  assetsId: ?Array<string>,
  isExchange?: boolean,
  sortBy: ?string,
  sortOrder: ?"ascend" | ?"descend",
};

type State = {
  selectedIndex: number,
};

class TableGraphConnector extends React.Component<Props, State> {
  static defaultProps = {
    assetId: null,
    assetsId: null,
    isExchange: false,
    sortBy: null,
    sortOrder: null,
  };

  state = {
    selectedIndex: 0,
  };

  changeAsset: number => void = index => this.setState({ selectedIndex: index, });

  render(): Node {
    const { assetId, assetsId, isExchange, sortBy, sortOrder, } = this.props;
    return (
      <Query
        query={TableQuery}
        variables={{
          ...(assetId
            ? {
              assetId: assetId.toString(),
              count: 9,
              ...(sortBy
                ? {
                  sortBy,
                  sortOrder,
                }
                : {}),
            }
            : {
              assetsId,
            }),
        }}
      >
        {({ loading, error, data: { assetsList, }, }) => {
          if (error) return null;
          if (loading) return null;
          const { selectedIndex, } = this.state;
          const { id, name, type, } = assetsList[selectedIndex];
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
                    <AssetsTable
                      changeAsset={this.changeAsset}
                      assets={assetsList}
                      selectedIndex={selectedIndex}
                      isExchange={isExchange}
                      headers={[
                        {
                          display: 'שם אפיק',
                          value: 'name',
                          style: {
                            paddingStart: '1rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            paddingEnd: '2rem',
                            marginBottom: '1rem',
                            backgroundColor: theme.color('neutral', '-6'),
                          },
                        },
                        {
                          display: 'שער אחרון',
                          value: 'value',
                          style: {
                            paddingEnd: '5rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            marginBottom: '1rem',
                            backgroundColor: theme.color('neutral', '-6'),
                          },
                        },
                        {
                          display: '% שינוי',
                          percentage: true,
                          value: 'changePercentage',
                          style: {
                            paddingEnd: '5rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            marginBottom: '1rem',
                            backgroundColor: theme.color('neutral', '-6'),
                          },
                        },
                      ]}
                      miscStyles={{
                        direction: 'rtl',
                        position: 'absolute',
                      }}
                    />
                  </GridItem>
                  <GridItem width={2 / 3}>
                    <GraphController assetId={id} />
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
                      <span>{`למידע נוסף על ${name}`}</span>
                    </SectionLink>
                  </GridItem>
                </Grid>
              )}
            />
          );
        }}
      </Query>
    );
  }
}

export default TableGraphConnector;
