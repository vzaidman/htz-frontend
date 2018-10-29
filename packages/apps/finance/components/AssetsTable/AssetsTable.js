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
  query GraphTable($assetsId: [String], $assetId: String, $count: Int) {
    financeTable(assetsId: $assetsId, assetId: $assetId, count: $count) {
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

type AssetsTableProps = {
  data: Array<Asset>,
  miscStyles: ?Object,
  changeAsset: Asset => void,
  // eslint-disable-next-line react/no-unused-prop-types
  assetId?: string | number,
  isExchange: boolean,
};

type State = {
  asset: Asset,
  selectedIndex: number,
  assetId?: string | number,
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
  static defaultProps = {
    assetId: null,
  };

  state: State;

  static getDerivedStateFromProps(
    nextProps: AssetsTableProps,
    prevState: State
  ) {
    return {
      ...(!prevState || nextProps.assetId !== prevState.assetId
        ? {
          asset: nextProps.data[0],
          selectedIndex: 0,
          assetId: nextProps.assetId,
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

  changeSelectedIndexId: (Asset, number) => void = (asset, index) => {
    this.setState({
      asset,
      selectedIndex: index,
    });
  };

  render(): Node {
    const { data, miscStyles, isExchange, } = this.props;
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
            <TdComponent
              miscStyles={{
                paddingTop: '0',
                paddingBottom: '0',
              }}
            >
              <FelaComponent
                style={theme => ({
                  paddingStart: '1rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  paddingEnd: '2rem',
                  marginBottom: '1rem',
                  backgroundColor: theme.color('neutral', '-6'),
                })}
              >
                {isExchange ? 'מטבע' : 'שם נייר'}
              </FelaComponent>
            </TdComponent>
            <TdComponent
              miscStyles={{
                paddingTop: '0',
                paddingBottom: '0',
              }}
            >
              <FelaComponent
                style={theme => ({
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  paddingEnd: '2rem',
                  marginBottom: '1rem',
                  backgroundColor: theme.color('neutral', '-6'),
                })}
              >
                שער אחרון
              </FelaComponent>
            </TdComponent>
            <TdComponent
              miscStyles={{
                paddingTop: '0',
                paddingBottom: '0',
              }}
            >
              <FelaComponent
                style={theme => ({
                  paddingEnd: '5rem',
                  paddingTop: '0.75rem',
                  paddingBottom: '0.75rem',
                  marginBottom: '1rem',
                  backgroundColor: theme.color('neutral', '-6'),
                  ':before': {
                    content: '"% "',
                  },
                })}
              >
                שינוי
              </FelaComponent>
            </TdComponent>
          </tr>
        </thead>
        <FelaTheme
          render={theme => (
            <Tabs activeTab={this.state.selectedIndex}>
              <TabList render="tbody">
                {data.map((asset: Asset, index: number) => {
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
                        {asset.name}
                      </TdComponent>
                      <TdComponent>{numToString(asset.value)}</TdComponent>
                      <TdComponent
                        isActive={isActive}
                        miscStyles={{
                          color:
                            Number(asset.changePercentage) < 0
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
                        }}
                      >
                        <FelaComponent
                          style={{
                            ':before': {
                              content:
                                Number(asset.changePercentage) > 0
                                  ? '"+"'
                                  : '"-"',
                            },
                            ':after': {
                              content: '"%"',
                            },
                          }}
                          render="span"
                        >
                          {numToString(
                            Math.abs(Number(asset.changePercentage))
                          )}
                        </FelaComponent>
                      </TdComponent>
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
  const { assetId, assetsId, } = props;
  return (
    <Query
      query={TableQuery}
      variables={{
        ...(assetId
          ? {
              assetId: assetId.toString(),
              count: 9,
            }
          : {
              assetsId,
            }),
      }}
    >
      {({ loading, error, data: { financeTable, }, }) => {
        if (error) return null;
        if (loading) return null;
        return <AssetsTable data={financeTable} {...props} />;
      }}
    </Query>
  );
};
