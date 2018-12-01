// @flow
import React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';

import type { Node, } from 'react';

import Tabs from '../Tabs/Tabs';
import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import { TabButton, } from '../TabbedGraph/TabbedGraph';
import TabPanel from '../TabPanel/TabPanel';

type State = {
  controls: string,
  selectedTab: string,
  index: number,
};

type TabType = {
  control: string, // eslint-disable-line react/no-unused-prop-types
  tabData: any, // eslint-disable-line react/no-unused-prop-types
  display: string, // eslint-disable-line react/no-unused-prop-types
};

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  defaultTab: number,
  panel: ({ selectedTab: string, }) => Node,
  tabs: Array<TabType>,
  presentation: boolean,
};

const tabRule: Object => Object = ({ theme, }) => ({
  flexGrow: '1',
  flexBasis: '0',
  position: 'relative',
  textAlign: 'center',
  ':not(:last-of-type)': {
    ':after': {
      content: '""',
      position: 'absolute',
      end: '0',
      bottom: 'calc(50% - 3px)',
      transform: 'translateY(50%)',
      width: '1px',
      height: '3rem',
      backgroundColor: theme.color('neutral', '-3'),
    },
  },
});

class TabbedTable extends React.Component<Props, State> {
  static defaultProps = {
    defaultTab: 0,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { defaultTab, tabs, } = nextProps;
    return !prevState
      ? {
        selectedTab: tabs[defaultTab].tabData,
        controls: tabs[defaultTab].control,
        index: defaultTab,
      }
      : {};
  }

  changeSelectedTab: State => void = ({ controls, selectedTab, index, }) => {
    this.setState({
      controls,
      selectedTab,
      index,
    });
  };

  render(): Node {
    const { controls, selectedTab, index, } = this.state;
    const { panel, tabs, presentation, } = this.props;
    return (
      <FelaTheme
        render={theme => (
          <FelaComponent
            style={{
              color: theme.color('neutral', '-3'),
              display: 'flex',
              marginTop: '2rem',
              ...theme.type(-1),
            }}
            render={({ className, }) => (
              <Tabs activeTab={index}>
                <TabList className={className}>
                  {tabs.map(
                    ({ control, tabData, display, }: TabType, i: number) => (
                      <Tab
                        index={i}
                        controls={`tab-${control}`}
                        presentation={presentation}
                        rule={tabRule}
                        onClick={() => this.changeSelectedTab({
                          controls: control,
                          selectedTab: tabData,
                          index: i,
                        })
                        }
                        render={TabButton}
                      >
                        <span>{display}</span>
                      </Tab>
                    )
                  )}
                </TabList>
                <TabPanel id={`tab-${controls}`}>
                  {panel({ selectedTab, })}
                </TabPanel>
              </Tabs>
            )}
          />
        )}
      />
    );
  }
}

export default TabbedTable;
