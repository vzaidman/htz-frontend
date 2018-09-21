// @flow
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';

import Tabs from '../Tabs/Tabs';
import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import TabPanel from '../TabPanel/TabPanel';
import TableGraphConnector from '../TableGraphConnector/TableGraphConnector';

type State = {
  stocks: string,
  index: number,
};


const tabRule: Object => Object = ({ theme, isActive, }) => ({
  ...(isActive ? {
    ...borderTop(3, 2, 'solid', theme.color('primary')),
    backgroundColor: theme.color('neutral', '-10'),
    color: theme.color('primary'),
    fontWeight: '700',
  } : {}),
  flexGrow: '1',
  flexBasis: '0',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  position: 'relative',
  textAlign: 'center',
  ':not(:last-of-type)': {
    ':after': {
      paddingInlineStart: '2rem',
      content: isActive ? '""' : '"|"',
      position: 'absolute',
      end: '0',
    },
  },
  ':last-of-type': {
    paddingInlineEnd: '2rem',
  },
});

class TabbedGraph extends React.Component<{}, State> {
  state = {
    stocks: 'up',
    index: 0,
  };

  changeSelectedTime: State => void = ({ stocks, index, }) => {
    this.setState({
      stocks,
      index,
    });
  };

  render(): Node {
    const { stocks, index, } = this.state;
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
              <Tab
                index={0}
                controls="graph-up"
                presentation
                rule={tabRule}
                onClick={() => this.changeSelectedTime({ stocks: 'up', index: 0, })}
              >
                <span>
                      עולות
                </span>
              </Tab>
              <Tab
                index={1}
                controls="graph-down"
                presentation
                rule={tabRule}
                onClick={() => this.changeSelectedTime({ stocks: 'down', index: 1, })}
              >
                <span>
                      יורדות
                </span>
              </Tab>
              <Tab
                index={2}
                controls="graph-active"
                presentation
                rule={tabRule}
                onClick={() => this.changeSelectedTime({ stocks: 'active', index: 2, })}
              >
                <span>
                      פעילות
                </span>
              </Tab>
              <Tab
                index={3}
                controls="graph-mostViewed"
                presentation
                rule={tabRule}
                onClick={() => this.changeSelectedTime({ stocks: 'mostViewed', index: 3, })}
              >
                <span>
                      הנצפים באתר
                </span>
              </Tab>
              <Tab
                index={4}
                controls="graph-upYearly"
                presentation
                rule={tabRule}
                onClick={() => this.changeSelectedTime({ stocks: 'upYearly', index: 4, })}
              >
                <span>
                      עולות שנתי
                </span>
              </Tab>
              <Tab
                index={5}
                controls="graph-downYearly"
                presentation
                rule={tabRule}
                onClick={() => this.changeSelectedTime({ stocks: 'downYearly', index: 5, })}
              >
                <span>
                      יורדות שנתי
                </span>
              </Tab>
            </TabList>
            <TabPanel id={`graph-${stocks}`}>
              <TableGraphConnector marketId={index} />
            </TabPanel>
          </Tabs>
        )}
      />
    );
  }
}

export default TabbedGraph;
