// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';

import type { ChildrenArray, Node, StatelessFunctionalComponent, ComponentType, } from 'react';
import type { TabsElementType, TabItemType, } from '../../flowTypes/TabsElementType';

import Tabs from '../Tabs/Tabs';
import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import TabPanel from '../TabPanel/TabPanel';
import CsrList from '../List/List';
import ListViewHeader from '../ListViewHeader/ListViewHeader';
import GridItem from '../Grid/GridItem';
import ListView from '../ListView/ListView';
import { isClickTrackerWrapper, isDfp, isList, } from '../../utils/validateType';
import ClickTracker from '../ClickTracker/ClickTrackerWrapper';
import GeneralAdSlot from '../Ads/GeneralAdSlot';
import Debug from '../Debug/Debug';

type TabsElementProps = TabsElementType & {
  List?: ?ComponentType<any>,
}

type State = {
  controls: string,
  selectedTab: TabItemType,
  index: number,
};

const tabRule: Object => Object = ({ theme, }) => ({
  flexBasis: 'auto',
  position: 'relative',
  textAlign: 'center',
  color: theme.color('primary', '+1'),
});

type TabButtonProps = {
  children: ChildrenArray<Node> | Node,
  isActive: boolean,
};

export const TabButton: StatelessFunctionalComponent<TabButtonProps> = ({
  isActive,
  children,
  ...props // eslint-disable-line react/prop-types
}) => (
  <FelaComponent
    style={theme => ({
      ...(isActive
        ? {
          backgroundColor: theme.color('quaternary'),
          fontWeight: '700',
        }
        : {}),
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      paddingStart: '3rem',
      paddingEnd: '3rem',
      width: '100%',
      ':focus': {
        outline: 'none',
        backgroundColor: theme.color('quaternary'),
      },
    })}
    render={({ className, }) => (
      <button type="button" className={className} {...props}>
        {children}
      </button>
    )}
  />
);

class TabElement extends React.Component<TabsElementProps, State> {
  static defaultProps = {
    List: null,
  };

  static getDerivedStateFromProps(nextProps: TabsElementProps, prevState: State) {
    const { elements, } = nextProps;
    return !prevState
      ? {
        selectedTab: elements[1],
        controls: elements[1].contentId,
        index: 1,
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
    const { elements, List: SsrList, } = this.props;
    const List = SsrList || CsrList;
    return (
      <FelaComponent
        style={theme => ({
          color: theme.color('neutral', '-3'),
          display: 'flex',
          ...theme.type(-1),
          extend: [
            borderBottom('1px', 0, 'solid', theme.color('neutral', '-6')),
          ],
        })}
        render={({ className, theme, }) => (
          <Tabs
            activeTab={index}
            miscStyles={{
              backgroundColor: theme.color('neutral', '-10'),
              paddingStart: '2rem',
              paddingEnd: '2rem',
            }}
          >
            <TabList className={className}>
              {elements.map(
                (element, i: number) => (
                  <Tab
                    key={element.contentId}
                    index={i}
                    controls={`tab-${element.contentId}`}
                    presentation
                    rule={tabRule}
                    onClick={() => this.changeSelectedTab({
                      controls: element.contentId,
                      selectedTab: element,
                      index: i,
                    })}
                    render={TabButton}
                  >
                    {
                      isList(element)
                        ? <span>{element.title}</span>
                        : null
                    }
                  </Tab>
                )
              )}
            </TabList>
            <TabPanel id={`tab-${controls}`}>
              {
                isClickTrackerWrapper(selectedTab)
                  ? (
                    <ClickTracker {...selectedTab} />
                  )
                  : isDfp(selectedTab)
                    ? (
                      <GeneralAdSlot {...selectedTab} />
                    )
                    : isList(selectedTab)
                      ? (
                        <List {...selectedTab} />
                      )
                      : (
                        <Debug>
                          {`Element of type '${selectedTab.inputTemplate}' is not supported in TabElement`}
                        </Debug>
                      )
              }
            </TabPanel>
          </Tabs>
        )}
      />
    );
  }
}

type Props = TabsElementType & {
  withoutWrapper?: boolean,
};

WrappedTabs.defaultProps = {
  withoutWrapper: false,
};

function WrappedTabs({ withoutWrapper, ...props }: Props): Node {
  return (
    <FelaComponent
      style={{ width: '100%', }}
    >
      {
        withoutWrapper
          ? (
            <TabElement {...props} />
          )
          : (
            <ListView>
              <GridItem width={1} stretchContent>
                <ListViewHeader title={props.title} />
              </GridItem>
              <GridItem width={1} stretchContent>
                <TabElement {...props} />
              </GridItem>
            </ListView>
          )
      }
    </FelaComponent>
  );
}

export default WrappedTabs;
