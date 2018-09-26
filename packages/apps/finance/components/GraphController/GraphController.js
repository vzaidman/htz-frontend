import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { Select, } from '@haaretz/htz-components';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import Tab from '../Tab/Tab';
import TabList from '../TabList/TabList';
import TabPanel from '../TabPanel/TabPanel';
import Graph from '../Graph/Graph';
import StockStats from '../StockStats/StockStats';
import Tabs from '../Tabs/Tabs';

type Props = {
  selectedStockId: ?string,
  miscStyles?: Object,
}

type State = {
  selectedPeriod: string,
  selectedIndex: number,
  selectedGraph: {
    value: string,
    display: string,
  },
};

const tabRule: Object => Object = ({ theme, isActive, }) => ({
  ...(isActive ? {
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
      content: isActive ? '""' : '"|"',
    },
  },
  ':last-of-type': {
    paddingInlineEnd: '2rem',
  },
});

class GraphController extends React.Component<Props, State> {
  static defaultProps = {
    miscStyles: null,
  };

  state;

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      selectedPeriod: !prevState
        ? 'daily'
        : prevState.selectedPeriod,
      selectedGraph: !prevState
        ? { value: 'line', display: 'גרף קוי', }
        : prevState.selectedGraph,
    };
  }

  changeSelectedTime = ({ period, index, }) => {
    this.setState({
      selectedPeriod: period,
      selectedIndex: index,
    });
  };

  render(): Node {
    const { selectedPeriod, selectedIndex, } = this.state;
    const { selectedStockId, miscStyles, } = this.props;

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
                <Tabs
                  activeTab={selectedIndex}
                >
                  <TabList className={className}>
                    <Tab
                      index={0}
                      controls="graph-daily"
                      presentation
                      rule={tabRule}
                      onClick={() => this.changeSelectedTime({ period: 'daily', index: 0, })}
                    >
                      <span>
                            יומי
                      </span>
                    </Tab>
                    <Tab
                      index={1}
                      controls="graph-weekly"
                      presentation
                      rule={tabRule}
                      onClick={() => this.changeSelectedTime({ period: 'weekly', index: 1, })}
                    >
                      <span>
                            שבועי
                      </span>
                    </Tab>
                    <Tab
                      index={2}
                      controls="graph-monthly"
                      presentation
                      rule={tabRule}
                      onClick={() => this.changeSelectedTime({ period: 'monthly', index: 2, })}
                    >
                      <span>
                            חודשי
                      </span>
                    </Tab>
                    <Tab
                      index={3}
                      controls="graph-yearly"
                      presentation
                      rule={tabRule}
                      onClick={() => this.changeSelectedTime({ period: 'yearly', index: 3, })}
                    >
                      <span>
                            שנתי
                      </span>
                    </Tab>
                    <Tab
                      index={4}
                      controls="graph-tripleYear"
                      presentation
                      rule={tabRule}
                      onClick={() => this.changeSelectedTime({ period: 'tripleYear', index: 4, })}
                    >
                      <span>
                            3 שנים
                      </span>
                    </Tab>
                    <Tab
                      index={5}
                      controls="graph-max"
                      presentation
                      rule={tabRule}
                      onClick={() => this.changeSelectedTime({ period: 'max', index: 5, })}
                    >
                      <span>
                            מקסימום
                      </span>
                    </Tab>
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
                  <TabPanel id={`graph-${selectedPeriod}`}>
                    <StockStats
                      period={this.state.selectedPeriod}
                      graphType={this.state.selectedGraph.value}
                      render={({ changeStats, }) => (selectedStockId ?
                        <Graph
                          type={this.state.selectedGraph.value}
                          indexId={selectedStockId}
                          time={selectedPeriod}
                          changeStats={changeStats}
                        />
                       : null)}
                      miscStyles={{
                        marginBottom: '0.5rem',
                      }}
                    />
                  </TabPanel>
                </Tabs>
              )}
            />
          </TabPanel>
        )}
      />
    );
  }
}

export default GraphController;
