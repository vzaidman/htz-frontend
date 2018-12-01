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

type TabType = {
  display: string,
  control: string,
  sortBy: string,
  sortOrder: "ascend" | "descend",
};

type Props = {
  assetId?: string,
  tabs: Array<TabType>,
};

type State = {
  tab: TabType,
  index: number,
};

type TabButtonProps = {
  children: ChildrenArray<Node> | Node,
  isActive: boolean,
};

export const tabRule: Object => Object = ({ theme, }) => ({
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
  isActive,
  children,
  ...props // eslint-disable-line react/prop-types
}) => (
  <FelaComponent
    style={theme => ({
      ...(isActive
        ? {
          backgroundColor: theme.color('neutral', '-10'),
          color: theme.color('primary'),
          fontWeight: '700',
        }
        : {}),
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      width: '100%',
      ...borderTop(
        3,
        2,
        'solid',
        isActive ? theme.color('primary') : 'transparent'
      ),
      ':focus': {
        outline: 'none',
        backgroundColor: theme.color('neutral', '-10'),
      },
    })}
    render={({ className, }) => (
      <button type="button" className={className} {...props}>
        {children}
      </button>
    )}
  />
);

class TabbedGraph extends React.Component<Props, State> {
  static defaultProps = {
    assetId: null,
  };

  state = {
    index: 0,
    tab: this.props.tabs[0],
  };

  changeSelectedTab: State => void = ({ index, tab, }) => {
    this.setState({
      index,
      tab,
    });
  };

  render(): Node {
    const {
      index,
      tab: { sortBy, sortOrder, control, },
    } = this.state;
    const { assetId, tabs, } = this.props;
    return (
      <FelaComponent
        style={theme => ({
          color: theme.color('neutral', '-3'),
          display: 'flex',
          marginTop: '2rem',
          ...theme.type(-1),
        })}
        render={({ className, }) => (
          <Tabs activeTab={index}>
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
                  })
                  }
                  render={TabButton}
                >
                  <span>{tab.display}</span>
                </Tab>
              ))}
            </TabList>
            <TabPanel id={control}>
              <TableGraphConnector
                assetId={assetId}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
            </TabPanel>
          </Tabs>
        )}
      />
    );
  }
}

export default TabbedGraph;
