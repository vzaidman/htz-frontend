// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import { Query, } from '@haaretz/htz-components';
import gql from 'graphql-tag';

import type { ChildrenArray, Node, StatelessFunctionalComponent, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import type { Asset, } from '../../types/asset';

import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import Tabs from '../Tabs/Tabs';

const TableQuery: DocumentNode = gql`
  query GraphTable($assetsId: [String], $assetId: String, $count: Int, $sortBy: String, $sortOrder: String) {
    assetsList(assetsId: $assetsId, assetId: $assetId, count: $count, sortBy: $sortBy, sortOrder: $sortOrder) {
      name
      value
      changePercentage
      id
      type
    }
  }
`;

type TdComponentProps = {
  children: ChildrenArray<Node> | Node,
  miscStyles?: Object,
  isActive?: boolean,
};

const numToString: number => string = num =>
  num.toLocaleString('he', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const TdComponent: StatelessFunctionalComponent<TdComponentProps> =
  // eslint-disable-next-line react/prop-types
  ({ children, miscStyles, }) => (
    <FelaComponent
      style={theme => ({
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        verticalAlign: 'top',
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render="td"
    >
      {children}
    </FelaComponent>
  );

type FeedAsset = {
  name: string,
  change: string,
  id: string,
};

type Header = {
  display: string,
  value: string,
  style: Object,
  percentage?: boolean,
};

type AssetsTableProps = {
  data: Array<Asset | FeedAsset>,
  miscStyles: ?Object,
  changeAsset: (Asset | FeedAsset) => void,
  headers: Array<Header>,
};

type State = {
  asset: Asset | FeedAsset,
  selectedIndex: number,
  assetId?: string | number,
  assets: Array<Asset> | Array<FeedAsset>,
};

const tabRule = ({ theme, isActive, isPrevious, }) => ({
  cursor: 'pointer',
  ...borderBottom(
    '2px',
    1,
    'solid',
    isActive || isPrevious ? 'transparent' : theme.color('neutral', '-6')
  ),
  ...(isActive
    ? {
      color: theme.color('neutral', '-10'),
      backgroundColor: theme.color('neutral', '-1'),
    }
    : {
      ':hover': {
        backgroundColor: theme.color('neutral', '-6'),
      },
    }),
});

class AssetsTable extends React.Component<AssetsTableProps, State> {
  state: State;

  static getDerivedStateFromProps(
    nextProps: AssetsTableProps,
    prevState: State
  ) {
    return {
      ...(nextProps && prevState && nextProps.data !== prevState.assets
        ? {
          asset: nextProps.data[0],
          selectedIndex: 0,
          assets: nextProps.data,
        }
        : nextProps !== prevState
          ? {
            ...(!prevState ? { asset: nextProps.data[0], } : {}),
            ...(!prevState ? { selectedIndex: 0, } : {}),
          }
          : prevState),
    };
  }

  componentDidMount() {
    this.props.changeAsset(this.state.asset);
  }

  componentDidUpdate() {
    this.props.changeAsset(this.state.asset);
  }

  changeSelectedIndexId: (Asset | FeedAsset, number) => void = (asset, index) => {
    this.setState({
      asset,
      selectedIndex: index,
    });
  };

  render(): Node {
    const { data, miscStyles, headers, } = this.props;
    const {
      asset: { id, },
    } = this.state;
    return (
      <FelaComponent
        style={(theme: Object) => ({
          ...theme.type(-2),
          whiteSpace: 'nowrap',
          width: 'calc(100% - 1rem)',
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
            {headers.map((header: Header) => (
              <TdComponent
                key={header.value}
                miscStyles={{
                  paddingTop: '0',
                  paddingBottom: '0',
                }}
              >
                <FelaComponent
                  style={header.style}
                >
                  {header.display}
                </FelaComponent>
              </TdComponent>
            ))}
          </tr>
        </thead>
        <FelaTheme
          render={theme => (
            <Tabs activeTab={this.state.selectedIndex}>
              <TabList render="tbody">
                {data.map((asset: Asset | FeedAsset, index: number) => {
                  const isActive: boolean = id === asset.id;
                  const isPrevious: boolean =
                    data[index + 1] && id === data[index + 1].id;
                  return (
                    <Tab
                      isPrevious={isPrevious}
                      index={index}
                      key={asset.id}
                      rule={tabRule}
                      onClick={() => this.changeSelectedIndexId(asset, index)}
                      controls={`asset-${asset.id}`}
                      render="tr"
                      presentation={false}
                      // eslint-disable-next-line no-return-assign
                    >
                      {headers.map((header: Header, i: number) => {
                        const isLast: boolean = i === (headers.length - 1);
                        return (
                          <TdComponent
                            key={`${header.value}-${asset.id}`}
                            isActive={isActive}
                            miscStyles={
                              !i
                                ? {
                                  fontWeight: '700',
                                  paddingStart: '1rem',
                                  paddingEnd: '2rem',
                                  maxWidth: '17rem',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }
                                : isLast
                                  ? {
                                    color:
                                      Number(asset[header.value]) < 0
                                        ? isActive
                                        ? theme.color('negative', '-2')
                                        : theme.color('negative')
                                        : isActive
                                        ? theme.color('positive', '-2')
                                        : theme.color('positive'),
                                    direction: 'ltr',
                                    fontWeight: '700',
                                    paddingEnd: '2rem',
                                    position: 'relative',
                                    textAlign: 'start',
                                    ':after': {
                                      ...(isActive
                                        ? {
                                          width: '4rem',
                                          content: '""',
                                          /* selected black arrow svg image */
                                          backgroundImage:
                                            'url("data:image/svg+xml; utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%205%2010%27%3E%3Cpolygon%20fill%3D%27white%27%20points%3D%270%2C0%205%2C0%2C%200%2C5%205%2C10%200%2C10%27%2F%3E%3C%2Fsvg%3E")',
                                          end: '0',
                                          position: 'absolute',
                                          top: '50%',
                                          transform: 'translateY(-50%)',
                                          // accommodate a `display: table` bug, that caused `height: 100%`
                                          // to leave two narrow lines at the top and bottom
                                          ...theme.mq(
                                            { from: 'xl', },
                                            { height: 'calc(100% + 3px)', }
                                          ),
                                          ...theme.mq(
                                            { until: 'xl', },
                                            { height: 'calc(100% + 2px)', }
                                          ),
                                        }
                                        : {}),
                                    },
                                  }
                                  : {}
                            }
                          >
                            {
                              isLast ?
                                <FelaComponent
                                  style={{
                                      ':before': {
                                        content:
                                          Number(asset[header.value]) > 0
                                            ? '"+"'
                                            : '"-"',
                                      },
                                      ...(header.percentage ? {
                                        ':after': {
                                          content: '"%"',
                                        },
                                      }
                                      : {}),
                                    }}
                                  render="span"
                                >
                                  {header.percentage
                                    ? numToString(Math.abs(Number(asset[header.value])))
                                    : Math.abs(Number(asset[header.value]))
                                  }
                                </FelaComponent>
                                : asset[header.value]
                            }
                          </TdComponent>
                        );
                      })}
                    </Tab>
                  );
                })}
              </TabList>
            </Tabs>
          )}
        />
      </FelaComponent>
    );
  }
}

export default (props: any) => {
  const { assetId, assetsId, sortBy, sortOrder, assets, } = props;
  return !assets
    ? (
      <Query
        query={TableQuery}
        variables={{
          ...(assetId
            ? {
                assetId: assetId.toString(),
                count: 9,
                ...(sortBy ? {
                    sortBy,
                    sortOrder,
                  } : {}
                ),
              }
            : {
                assetsId,
              }),
        }}
      >
        {({ loading, error, data: { assetsList, }, }) => {
          if (error) return null;
          if (loading) return null;
          return <AssetsTable data={assetsList} {...props} />;
        }}
      </Query>
    )
    : assets.length
      ? (
        <AssetsTable data={assets} {...props} />
      )
      : null;
};
