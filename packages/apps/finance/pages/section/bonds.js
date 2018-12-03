// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';

import MainLayout from '../../layouts/MainLayout';
import PageRow from '../../components/PageRow/PageRow';
import MarketSummary from '../../components/MarketSummary/MarketSummary';
import RowItem from '../../components/RowItem/RowItem';
import TableGraphConnector from '../../components/TableGraphConnector/TableGraphConnector';
import SortableTable from '../../components/SortableTable/SortableTable';
import Tabs from '../../components/Tabs/Tabs';
import TabList from '../../components/TabList/TabList';
import TabPanel from '../../components/TabPanel/TabPanel';
import Tab from '../../components/Tab/Tab';
import { TabButton, } from '../../components/TabbedGraph/TabbedGraph';
import gql from 'graphql-tag';

type Props = {
  url: {
    pathname: string,
    query: {
      section: string,
    },
  },
};

type State = {
  bonds: string,
  assetSubSection: string,
  index: number,
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

const numToString: number => string = num => (
  num.toLocaleString('he', { minimumFractionDigits: 2, maximumFractionDigits: 2, })
);

class Bonds extends React.Component<Props, State> {
  state = {
    bonds: 'up',
    assetSubSection: '0',
    index: 0,
  };

  changeSelectedTime: State => void = ({ bonds, assetSubSection, index, }) => {
    this.setState({
      bonds,
      assetSubSection,
      index,
    });
  };

  render(): Node {
    const { bonds, assetSubSection, index, } = this.state;
    const { url: { query: { section, }, }, } = this.props;
    return (
      <MainLayout section={section}>
        <FelaTheme
          render={theme => (
            <Fragment>
              <PageRow>
                <MarketSummary marketId="3" miscStyles={{ flexGrow: '1', }} />
              </PageRow>
              <PageRow>
                <RowItem
                  title="מדדי אג״ח"
                >
                  <TableGraphConnector
                    assetsId={[ '2', '142', '137', '-2000', '164', '143', '167', '145', '149', ]}
                  />
                </RowItem>
              </PageRow>
              <PageRow>
                <RowItem
                  title="נתוני אג״ח"
                >
                  <FelaComponent
                    style={{
                      color: theme.color('neutral', '-3'),
                      display: 'flex',
                      marginTop: '2rem',
                      ...theme.type(-1),
                    }}
                    render={({ className, }) => (
                      <Tabs
                        activeTab={index}
                      >
                        <TabList className={className}>
                          <Tab
                            index={0}
                            controls="bonds-up"
                            presentation
                            rule={tabRule}
                            onClick={() => this.changeSelectedTime({ bonds: 'up', assetSubSection: '0', index: 0, })}
                            render={TabButton}
                          >
                            <span>
                                  ממשלתי
                            </span>
                          </Tab>
                          <Tab
                            index={1}
                            controls="bonds-up"
                            presentation
                            rule={tabRule}
                            onClick={() => this.changeSelectedTime({ bonds: 'up', assetSubSection: '1', index: 1, })}
                            render={TabButton}
                          >
                            <span>
                                  קונצרני
                            </span>
                          </Tab>
                          <Tab
                            index={2}
                            controls="bonds-up"
                            presentation
                            rule={tabRule}
                            onClick={() => this.changeSelectedTime({ bonds: 'up', assetSubSection: '2', index: 2, })}
                            render={TabButton}
                          >
                            <span>
                                  ענפים
                            </span>
                          </Tab>
                          <Tab
                            index={3}
                            controls="bonds-up"
                            presentation
                            rule={tabRule}
                            onClick={() => this.changeSelectedTime({ bonds: 'up', assetSubSection: '3', index: 3, })}
                            render={TabButton}
                          >
                            <span>
                                  דירוגים
                            </span>
                          </Tab>
                          <Tab
                            index={4}
                            controls="bonds-up"
                            presentation
                            rule={tabRule}
                            onClick={() => this.changeSelectedTime({ bonds: 'up', assetSubSection: '4', index: 4, })}
                            render={TabButton}
                          >
                            <span>
                                  כללי
                            </span>
                          </Tab>
                        </TabList>
                        <TabPanel id={`bonds-${bonds}`}>
                          <SortableTable
                            headerMiscStyles={{
                              backgroundColor: theme.color('neutral', '-10'),
                              paddingTop: '1rem',
                              paddingBottom: '1rem',
                              ...borderBottom('2px', 1, 'solid', theme.color('neutral', '-6')),
                            }}
                            assetSubSection={assetSubSection}
                            loadMore
                            type="bonds"
                            fragment="
                              name
                              value
                              changePercentage
                              volume
                              redemptionYield
                              avgDuration
                             "
                            fields={[
                              {
                                name: 'name',
                                display: 'שם',
                                sortingOrder: 'ascend',
                                style: () => ({
                                  fontWeight: '700',
                                  maxWidth: '17rem',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }),
                                value: ({ name, }) => name,
                              },
                              {
                                name: 'value',
                                display: 'שער',
                                sortingOrder: 'descend',
                                value: ({ value, }) => numToString(value),
                              },
                              {
                                name: 'changePercentage',
                                display: '% שינוי',
                                sortingOrder: 'descend',
                                style: ({ changePercentage, }) => ({
                                  color: changePercentage < 0
                                    ? theme.color('negative')
                                    : theme.color('positive'),
                                  direction: 'ltr',
                                  fontWeight: '700',
                                  paddingEnd: '2rem',
                                  position: 'relative',
                                  textAlign: 'start',
                                }),
                                value: ({ changePercentage, }) => `
                                        ${changePercentage > 0 ? '+' : '-'}
                                        ${numToString(Math.abs(changePercentage))}%
                                      `,
                              },
                              {
                                name: 'volume',
                                display: 'מחזור',
                                sortingOrder: 'descend',
                                value: ({ volume, }) => numToString(volume),
                              },
                              {
                                name: 'redemptionYield',
                                display: '% תשואה לפדיון',
                                sortingOrder: 'descend',
                                style: ({ redemptionYield, }) => ({
                                  color: redemptionYield < 0
                                    ? theme.color('negative')
                                    : theme.color('positive'),
                                  direction: 'ltr',
                                  fontWeight: '700',
                                  paddingEnd: '2rem',
                                  position: 'relative',
                                  textAlign: 'start',
                                }),
                                value: ({ redemptionYield, }) => `
                                        ${redemptionYield > 0 ? '+' : '-'}
                                        ${numToString(Math.abs(redemptionYield))}%
                                      `,
                              },
                              {
                                name: 'avgDuration',
                                display: 'מח״מ',
                                sortingOrder: 'descend',
                                value: ({ avgDuration, }) => numToString(avgDuration),
                              },
                            ]}
                            initialSort="name"
                            count={11}
                          />
                        </TabPanel>
                      </Tabs>
                    )}
                  />
                </RowItem>
              </PageRow>
            </Fragment>
          )}
        />
      </MainLayout>
    );
  }
}

export default Bonds;
