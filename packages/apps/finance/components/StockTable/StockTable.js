// @flow
import React from 'react';
import type { ChildrenArray, Node, StatelessFunctionalComponent, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import stocksData from '../dummyData/stocksList01';
import Tabs from '../Tabs/Tabs';

type TdComponentProps = {
  children: ChildrenArray<Node> | Node,
  miscStyles?: Object,
  isActive?: boolean,
}

export const TdComponent: StatelessFunctionalComponent<TdComponentProps> =
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
  points: string,
  change: string,
  indexId: string,
  section: string,
}

type Props = {
  data: {
    dataSource: Array<StockData>,
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
      { stock: nextProps.data.dataSource[0], }
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
    const { data: { dataSource: data, }, miscStyles, } = this.props;
    const { stock: { indexId, }, } = this.state;
    return (
      <FelaComponent
        style={(theme: Object) => ({
          ...theme.type(-1),
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
                  paddingEnd: '4rem',
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
                  const isActive: boolean = indexId === stock.indexId;
                  const isPrevious: boolean =
                    data[index + 1] && indexId === data[index + 1].indexId;
                  return (
                    <Tab
                      isPrevious={isPrevious}
                      index={index}
                      key={stock.indexId}
                      rule={tabRule}
                      onClick={() => this.changeSelectedIndexId(stock, index)}
                      controls={`stock-${stock.indexId}`}
                      render="tr"
                      presentation={false}
                    >
                      <TdComponent
                        miscStyles={{
                          fontWeight: '700',
                          paddingStart: '1rem',
                          maxWidth: '24rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        render="td"
                      >
                        {stock.name}
                      </TdComponent>
                      <TdComponent>{stock.points}</TdComponent>
                      <TdComponent
                        isActive={isActive}
                        miscStyles={{
                          color: Number(stock.change) < 0 ? 'red' : 'green',
                          direction: 'ltr',
                          fontWeight: '700',
                          paddingEnd: '4rem',
                          position: 'relative',
                          textAlign: 'start',
                          ':after': {
                            ...(
                              isActive ?
                                {
                                  borderTop: `3.25rem solid ${theme.color('neutral', '-10')}`,
                                  borderBottom: `3.25rem solid ${theme.color('neutral', '-10')}`,
                                  borderStart: `4rem solid ${theme.color('neutral', '-1')}`,
                                  content: '""',
                                  end: '0',
                                  position: 'absolute',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                }
                                : {}
                            ),
                          },
                        }}
                        render="td"
                      >
                        <FelaComponent
                          style={{
                            ':before': {
                              content: Number(stock.change) > 0 ? '"+"' : '"-"',
                            },
                            ':after': {
                              content: '"%"',
                            },
                          }}
                          render="span"
                        >
                          {Math.abs(Number(stock.change))}
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
  <StockTable data={stocksData} {...props} />
);
