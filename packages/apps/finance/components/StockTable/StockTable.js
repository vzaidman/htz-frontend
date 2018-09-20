// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';
import type { ChildrenArray, Node, StatelessFunctionalComponent, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import Tabs from '../Tabs/Tabs';
import { Query, } from '../ApolloBoundary/ApolloBoundary';

const TableQuery: DocumentNode = gql`
  query GraphTable($assetsId: [String]){
    financeTable(assetsId: $assetsId){
      assets {
        name
        value
        changePercentage
        id
        type
      }
    }
  }
`;

type TdComponentProps = {
  children: ChildrenArray<Node> | Node,
  miscStyles?: Object,
  isActive?: boolean,
}

export const TdComponent: StatelessFunctionalComponent<TdComponentProps> =
// eslint-disable-next-line react/prop-types
  ({ children, miscStyles, }) => (
    <FelaComponent
      style={theme => ({
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
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

export type StockData = {
  name: string,
  value: string,
  changePercentage: string,
  id: string,
  type: string,
}

type Props = {
  data: {
    assets: Array<StockData>,
  },
  miscStyles: ?Object,
  changeStock: StockData => void,
}

type State = {
  stock: StockData,
  selectedIndex: number,
};

const tabRule = ({ theme, isActive, isPrevious, }) => ({
  cursor: 'pointer',
  ...borderBottom('2px', 1, 'solid', isActive || isPrevious ? 'transparent' : theme.color('neutral', '-6')),
  ...(isActive ? {
    color: theme.color('neutral', '-10'),
    backgroundColor: theme.color('neutral', '-1'),
  } : {
    ':hover': {
      backgroundColor: theme.color('neutral', '-6'),
    },
  }),
});

class StockTable extends React.Component<Props, State> {
  state: State;

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return !prevState ?
      { stock: nextProps.data.assets[0], }
      : prevState;
  }

  componentDidMount() {
    this.props.changeStock(this.state.stock);
  }

  componentDidUpdate() {
    this.props.changeStock(this.state.stock);
  }

  changeSelectedIndexId: (StockData, number) => void = (stockData, index) => {
    this.setState({
      stock: stockData,
      selectedIndex: index,
    });
  };

  render(): Node {
    const { data: { assets: data, }, miscStyles, } = this.props;
    const { stock: { id, }, } = this.state;
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
                שם נייר
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
            <Tabs
              activeTab={this.state.selectedIndex}
            >
              <TabList render="tbody">
                {data.map((stock: StockData, index: number) => {
                  const isActive: boolean = id === stock.id;
                  const isPrevious: boolean =
                    data[index + 1] && id === data[index + 1].id;
                  return (
                    <Tab
                      isPrevious={isPrevious}
                      index={index}
                      key={stock.id}
                      rule={tabRule}
                      onClick={() => this.changeSelectedIndexId(stock, index)}
                      controls={`stock-${stock.id}`}
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
                        {stock.name}
                      </TdComponent>
                      <TdComponent>{stock.value}</TdComponent>
                      <TdComponent
                        isActive={isActive}
                        miscStyles={{
                          color: Number(stock.changePercentage) < 0 ? 'red' : 'green',
                          direction: 'ltr',
                          fontWeight: '700',
                          paddingEnd: '2rem',
                          position: 'relative',
                          textAlign: 'start',
                          ':after': {
                            ...(
                              isActive ?
                                {
                                  width: '4rem',
                                  content: '""',
                                  /* selected black arrow svg image */
                                  backgroundImage: 'url("data:image/svg+xml; utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%205%2010%27%3E%3Cpolygon%20fill%3D%27white%27%20points%3D%270%2C0%205%2C0%2C%200%2C5%205%2C10%200%2C10%27%2F%3E%3C%2Fsvg%3E")',
                                  end: '0',
                                  position: 'absolute',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  // accommodate a `display: table` bug, that caused `height: 100%`
                                  // to leave two narrow lines at the top and bottom
                                  ...theme.mq({ from: 'xl', }, { height: 'calc(100% + 3px)', }),
                                  ...theme.mq({ until: 'xl', }, { height: 'calc(100% + 2px)', }),
                                }
                                : {}
                            ),
                          },
                        }}
                      >
                        <FelaComponent
                          style={{
                            ':before': {
                              content: Number(stock.changePercentage) > 0 ? '"+"' : '"-"',
                            },
                            ':after': {
                              content: '"%"',
                            },
                          }}
                          render="span"
                        >
                          {Math.abs(Number(stock.changePercentage))}
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

export default (props: any) => (
  <Query
    query={TableQuery}
    variables={{
      assetsId: [ '2', '142', '137', '-2000', '164', '143', '167', '145', '149', ],
    }}
  >
    {({ loading, error, data: { financeTable, }, }) => {
      if (error) return null;
      if (loading) return null;
      return (
        <StockTable data={financeTable} {...props} />
      );
    }}
  </Query>
);
