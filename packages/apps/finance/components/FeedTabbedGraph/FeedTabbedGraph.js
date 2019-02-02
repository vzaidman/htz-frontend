// @flow
/* global fetch */
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';

import Tabs from '../Tabs/Tabs';
import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import TabPanel from '../TabPanel/TabPanel';
import { TabButton, tabRule, } from '../TabbedGraph/TabbedGraph';
import HotMoneyGraph from '../HotMoneyGraph/HotMoneyGraph';

type TabType = {
  display: string,
  control: string,
  period: number,
};

type Asset = {
  name: string,
  change?: string,
  id: string,
};

type Assets = Array<Asset>;

type Props = {
  part: number,
  side: number,
  // eslint-disable-next-line react/no-unused-prop-types
  defaultTab: number,
  tabs: Array<TabType>,
  headers: Array<{
    display: string,
    value: string,
    style: Object,
    percentage?: boolean,
  }>,
};

type State = {
  tab: TabType,
  index: number,
  assets?: Assets,
};

class FeedTabbedGraph extends React.Component<Props, State> {
  static defaultProps = {
    defaultTab: 0,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { defaultTab, tabs, } = nextProps;
    return !prevState ? {
      tab: tabs[defaultTab],
      assets: [],
      index: defaultTab,
    } : {};
  }

  componentDidMount() {
    const { period, } = this.props.tabs[0];
    this.fetchData(period)
      .then(assets => this.setState({
        assets,
      })
      )
      .catch(err => console.log(err));
  }

  changeSelectedTab: State => void = ({ index, tab, }) => {
    this.fetchData(tab.period)
      .then(assets => this.setState({
        assets,
        index,
        tab,
      })
      )
      .catch(err => console.log(err));
  };

  fetchData: number => Promise<any> = async period => {
    const { part, side, } = this.props;
    return (
      fetch(`https://apifinance.themarker.com/TheMarkerApi/HotMoney?part=${part}&side=${side}&period=${period}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
        .then(res => res.json())
        .then(json => {
          const data: Assets = json.table.dataSource;
          return data.map((asset: Asset) => ({
            name: asset[0],
            change: asset[1],
            id: asset[2],
          }));
        })
        .catch(err => console.log(err))
    );
  };

  render(): Node {
    const { index, tab: { control, period, }, assets, } = this.state;
    const { tabs, headers, part, } = this.props;
    return (
      <FelaComponent
        style={theme => ({
          color: theme.color('neutral', '-3'),
          display: 'flex',
          marginTop: '2rem',
          ...theme.type(-1),
        })}
        render={({ className, }) => (
          <Tabs
            activeTab={index}
          >
            <TabList className={className}>
              {tabs.map((tab: TabType, i: number) => (
                <Tab
                  key={tab.control}
                  index={i}
                  controls={tab.control}
                  presentation
                  rule={tabRule}
                  onClick={() => this.changeSelectedTab({
                    index: i,
                    tab,
                  })}
                  render={TabButton}
                >
                  <span>{tab.display}</span>
                </Tab>
              ))}
            </TabList>
            <TabPanel id={control}>
              {
                assets
                  ? (
                    <HotMoneyGraph
                      period={period}
                      part={part}
                      assets={assets}
                      headers={headers}
                    />
                  )
                  : null
              }
            </TabPanel>
          </Tabs>
        )}
      />
    );
  }
}

export default FeedTabbedGraph;
