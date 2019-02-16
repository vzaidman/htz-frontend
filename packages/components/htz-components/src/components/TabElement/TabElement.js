// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';

import type { ChildrenArray, Node, ComponentType, } from 'react';
import type {
  TabsElementType,
  TabItemType,
} from '../../flowTypes/TabsElementType';

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

export function TabButton({ isActive, children, ...props }: TabButtonProps) {
  return (
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
        extend: [ theme.type(0, { until: 'l', }), ],
      })}
      render={({ className, }) => (
        <button type="button" className={className} {...props}>
          {children}
        </button>
      )}
    />
  );
}

type TabsElementProps = TabsElementType & {
  List?: ?ComponentType<any>,
  startAt: number,
};

TabElement.defaultProps = {
  startAt: 1,
  List: null,
};

function TabElement({
  elements,
  List: SsrList,
  startAt,
}: TabsElementProps): Node {
  const List = SsrList || CsrList;
  return (
    <FelaTheme
      render={theme => (
        <Tabs
          activeTab={startAt}
          miscStyles={{
            ...theme.mq(
              { from: 's', },
              {
                backgroundColor: theme.color('neutral', '-10'),
                paddingInlineStart: '2rem',
                paddingInlineEnd: '2rem',
              }
            ),
          }}
        >
          {({ setActiveTab, activeTab, }) => {
            const activeElement: TabItemType = elements[activeTab];
            if (!activeElement) {
              return null;
            }
            return (
              <Fragment>
                <TabList
                  activeTab={activeTab}
                  miscStyles={{
                    color: theme.color('neutral', '-3'),
                    display: 'flex',
                    backgroundColor: theme.color('neutral', '-10'),
                    marginBottom: [ { until: 'l', value: '2px', }, ],
                    ...theme.type(-1),
                    ...theme.mq(
                      { from: 'l', },
                      {
                        ...borderBottom(
                          '1px',
                          0,
                          'solid',
                          theme.color('neutral', '-6')
                        ),
                      }
                    ),
                  }}
                >
                  {elements.filter(element => element).map((element, i: number) => (
                    <Tab
                      key={element.contentId}
                      index={i}
                      isActive={i === activeTab}
                      controls={`tab-${element.contentId}`}
                      presentation
                      rule={tabRule}
                      setActiveTab={index => setActiveTab(index)}
                      render={TabButton}
                    >
                      {isList(element) ? <span>{element.title}</span> : null}
                    </Tab>
                  ))}
                </TabList>
                <TabPanel id={`tab-${activeElement.contentId}`}>
                  {isClickTrackerWrapper(activeElement) ? (
                    <ClickTracker {...activeElement} />
                  ) : isDfp(activeElement) ? (
                    <GeneralAdSlot {...activeElement} />
                  ) : isList(activeElement) ? (
                    <List {...activeElement} />
                  ) : (
                    <Debug>
                      {`Element of type '${
                        activeElement.inputTemplate
                      }' is not supported in TabElement`}
                    </Debug>
                  )}
                </TabPanel>
              </Fragment>
            );
          }}
        </Tabs>
      )}
    />
  );
}

type Props = TabsElementType & {
  withoutWrapper?: boolean,
};

WrappedTabs.defaultProps = {
  withoutWrapper: false,
};

function WrappedTabs({ withoutWrapper, ...props }: Props): Node {
  return (
    <FelaComponent style={{ width: '100%', }}>
      {withoutWrapper ? (
        <TabElement {...props} />
      ) : (
        <ListView>
          <GridItem
            width={1}
            stretchContent
            miscStyles={{
              marginBottom: [ { until: 'l', value: '1rem', }, ],
            }}
          >
            <ListViewHeader title={props.title} />
          </GridItem>
          <GridItem width={1} stretchContent>
            <TabElement {...props} />
          </GridItem>
        </ListView>
      )}
    </FelaComponent>
  );
}

export default WrappedTabs;
