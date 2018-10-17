// @flow
import React from 'react';
import type { ChildrenArray, Node, StatelessFunctionalComponent, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderTop, } from '@haaretz/htz-css-tools';

import Tabs from '../Tabs/Tabs';
import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import TabPanel from '../TabPanel/TabPanel';
import TableGraphConnector from '../TableGraphConnector/TableGraphConnector';

type State = {
  assets: string,
  assetId: string,
  index: number,
};

type TabButtonProps = {
  children: ChildrenArray<Node> | Node,
  isActive: boolean,
}

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

export const TabButton: StatelessFunctionalComponent<TabButtonProps> = ({
  isActive, children, ...props // eslint-disable-line react/prop-types
}) => (
  <FelaComponent
    style={theme => ({
      ...(isActive ? {
        backgroundColor: theme.color('neutral', '-10'),
        color: theme.color('primary'),
        fontWeight: '700',
      } : {}),
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      width: '100%',
      ...borderTop(3, 2, 'solid', isActive ? theme.color('primary') : 'transparent'),
      ':focus': {
        outline: 'none',
        backgroundColor: theme.color('neutral', '-10'),
      },
    })}
    render={({ className, }) => (
      <button
        className={className}
        {...props}
      >
        {children}
      </button>
    )}
  />
);

class TabbedGraph extends React.Component<{}, State> {
  state = {
    assets: 'up',
    assetId: '0',
    index: 0,
  };


  changeSelectedTime: State => void = ({ assets, assetId, index, }) => {
    this.setState({
      assets,
      assetId,
      index,
    });
  };

  render(): Node {
    const { assets, assetId, index, } = this.state;
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
                onClick={() => this.changeSelectedTime({ assets: 'up', assetId: '0', index: 0, })}
                render={TabButton}
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
                onClick={() => this.changeSelectedTime({ assets: 'down', assetId: '1', index: 1, })}
                render={TabButton}
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
                onClick={() => this.changeSelectedTime({ assets: 'active', assetId: '2', index: 2, })}
                render={TabButton}
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
                onClick={() => this.changeSelectedTime({ assets: 'mostViewed', assetId: '3', index: 3, })}
                render={TabButton}
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
                onClick={() => this.changeSelectedTime({ assets: 'upYearly', assetId: '4', index: 4, })}
                render={TabButton}
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
                onClick={() => this.changeSelectedTime({ assets: 'downYearly', assetId: '5', index: 5, })}
                render={TabButton}
              >
                <span>
                      יורדות שנתי
                </span>
              </Tab>
            </TabList>
            <TabPanel id={`graph-${assets}`}>
              <TableGraphConnector assetId={assetId} />
            </TabPanel>
          </Tabs>
        )}
      />
    );
  }
}

export default TabbedGraph;
