import React from 'react';
import type { ChildrenArray, Element, Node, StatelessFunctionalComponent, } from 'react';
import { FelaComponent, } from 'react-fela';
import { Select, IconBack, } from '@haaretz/htz-components';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import Tab from '../Tab/Tab';
import TabList from '../TabList/TabList';
import TabPanel from '../TabPanel/TabPanel';
import Graph from '../Graph/Graph';
import StockStats from '../StockStats/StockStats';

type ButtonProps = {
  children: ChildrenArray<Element<any>>,
  controls: string,
}

type Props = {
  selectedStockId: ?string,
  selectedStockName: ?string,
  changeTime: string => void,
  miscStyles: ?Object,
}

type State = {
  selectedTime: string,
  selectedGraph: {
    value: string,
    display: string,
  },
};

class GraphController extends React.Component<Props, State> {
  state;

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      selectedTime: !prevState
        ? 'daily'
        : prevState.selectedTime,
      selectedGraph: !prevState
        ? { value: 'line', display: 'גרף קוי', }
        : prevState.selectedGraph,
    };
  }

  componentDidMount() {
    const { selectedTime, } = this.state;
    this.props.changeTime(selectedTime);
  }

  componentDidUpdate() {
    const { selectedTime, } = this.state;
    this.props.changeTime(selectedTime);
  }
  changeSelectedTime = time => {
    this.setState({
      selectedTime: time,
    });
  };

  render(): Node {
    const { selectedTime, } = this.state;
    const { selectedStockId, selectedStockName, miscStyles, } = this.props;
    const Button: StatelessFunctionalComponent<ButtonProps> =
      ({ children, controls, }) => {
        const selected: boolean = selectedTime === controls;
        return (
          <FelaComponent
            style={theme => ({
              ...(selected ? {
                backgroundColor: theme.color('primary'),
                color: theme.color('neutral', '-10'),
                fontWeight: '700',
              } : {
                backgroundColor: theme.color('neutral', '-1'),
              }),
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              paddingInlineStart: '2rem',
              ':not(:last-of-type)': {
                ':after': {
                  paddingInlineStart: '2rem',
                  content: selected ? '""' : '"|"',
                },
              },
              ':last-of-type': {
                paddingInlineEnd: '2rem',
              },
            })}
            render={({ className, }) => (
              <Tab
                className={className}
                onClick={() => this.changeSelectedTime(controls)}
                selected={selected}
                controls={`graph-${controls}`}
                presentation
              >
                {children}
              </Tab>
            )}
          />
        );
      };

    return (
      <FelaComponent
        style={theme => ({
          extend: [
            ...(miscStyles
              ? parseStyleProps(miscStyles, theme.mq, theme.type)
              : []),
          ],
        })}
        render={({ className, }) => (
          <TabPanel
            className={className}
            id={`stock-${selectedStockId}`}
          >
            <FelaComponent
              style={theme => ({
                color: theme.color('neutral', '-5'),
                display: 'flex',
                marginBottom: '1rem',
                ...theme.type(-1),
              })}
              render={({ className, }) => (
                <TabList className={className}>
                  <Button controls="daily">
                    יומי
                  </Button>
                  <Button controls="weekly">
                    שבועי
                  </Button>
                  <Button controls="monthly">
                    חודשי
                  </Button>
                  <Button controls="yearly">
                    שנתי
                  </Button>
                  <Button controls="tripleYear">
                    3 שנים
                  </Button>
                  <Button controls="max">
                    מקסימום
                  </Button>
                  <FelaComponent
                    style={{
                      flexGrow: '1',
                    }}
                  >
                    {<Select
                      onChange={selectedItem => {
                        this.setState({ selectedGraph: selectedItem, });
                      }}
                      controlledSelectedItem={this.state.selectedGraph}
                      variant="graph"
                      items={
                        [
                          { value: 'line', display: 'גרף קוי', },
                          { value: 'scatter', display: 'גרף פיזור', },
                        ]
                      }
                      attrs={{ 'aria-hidden': true, }}
                      miscStyles={{
                        flexGrow: '1',
                        position: 'absolute',
                      }}
                      buttonMiscStyles={{
                        paddingBottom: '0.5rem',
                        paddingTop: '0.5rem',
                        whiteSpace: 'nowrap',
                        minWidth: '15rem',
                        width: '100%',
                      }}
                    />}
                  </FelaComponent>
                </TabList>
              )}
            />
            <TabPanel id={`graph-${selectedTime}`}>
              <StockStats
                render={({ changeStats, }) => (
                  <Graph
                    type={this.state.selectedGraph.value}
                    indexId={selectedStockId}
                    time={selectedTime}
                    changeStats={changeStats}
                  />
                )}
                miscStyles={{
                  marginBottom: '0.5rem',
                }}
              />
              <FelaComponent
                style={theme => ({
                  ...theme.type(-2),
                  backgroundColor: theme.color('neutral', '-5'),
                  color: theme.color('neutral', '-1'),
                  fontWeight: '700',
                  paddingBottom: '1rem',
                  paddingTop: '1rem',
                  textAlign: 'center',
                  ':before': {
                    content: '"למידע נוסף על "',
                  },
                })}
              >
                {selectedStockName}
                <IconBack size={-1} />
              </FelaComponent>
            </TabPanel>
          </TabPanel>
        )}
      />
    );
  }
}

export default GraphController;
