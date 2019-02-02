// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, borderBottom, } from '@haaretz/htz-css-tools';

import type { ChildrenArray, Node, } from 'react';
import type { Asset, } from '../../types/asset';

import TabList from '../TabList/TabList';
import Tab from '../Tab/Tab';
import Tabs from '../Tabs/Tabs';

type TdComponentProps = {
  children: ChildrenArray<Node> | Node,
  miscStyles: ?Object,
};

const numToString: number => string = num => num.toLocaleString('he', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const TdComponent = ({
  children,
  miscStyles,
}: TdComponentProps): Node => (
  <FelaComponent
    style={theme => ({
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      verticalAlign: 'top',
      extend: [
        ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
      ],
    })}
    render="td"
  >
    {children}
  </FelaComponent>
);

TdComponent.defaultProps = { miscStyles: null, };

type FeedAsset = {
  name: string,
  change?: string,
  id: string,
};

type Header = {
  display: string,
  value: string,
  style: Object,
  percentage?: boolean,
};

type AssetsTableProps = {
  assets: Array<Asset | FeedAsset>,
  miscStyles: ?Object,
  changeAsset: number => void,
  headers: Array<Header>,
  selectedIndex: number,
};

const tabRule = ({ theme, isActive, isPrevious, }) => ({
  cursor: 'pointer',
  ...borderBottom(
    '2px',
    1,
    'solid',
    isActive || isPrevious ? 'transparent' : theme.color('neutral', '-6')
  ),
  ...(isActive
    ? {
      color: theme.color('neutral', '-10'),
      backgroundColor: theme.color('neutral', '-1'),
    }
    : {
      ':hover': {
        backgroundColor: theme.color('neutral', '-6'),
      },
    }),
});

function AssetsTable({
  assets,
  miscStyles,
  headers,
  selectedIndex,
  changeAsset,
}: AssetsTableProps): Node {
  return (
    <FelaComponent
      style={(theme: Object) => ({
        ...theme.type(-2),
        whiteSpace: 'nowrap',
        width: 'calc(100% - 1rem)',
        extend: [
          ...(miscStyles
            ? parseStyleProps(miscStyles, theme.mq, theme.type)
            : []),
        ],
      })}
      render="table"
    >
      <thead>
        <tr>
          {headers.map((header: Header) => (
            <TdComponent
              key={header.value}
              miscStyles={{
                paddingTop: '0',
                paddingBottom: '0',
              }}
            >
              <FelaComponent style={header.style}>
                {header.display}
              </FelaComponent>
            </TdComponent>
          ))}
        </tr>
      </thead>
      <FelaTheme
        render={theme => (
          <Tabs activeTab={selectedIndex}>
            <TabList render="tbody">
              {assets.map((asset: Asset | FeedAsset, index: number) => {
                const isActive: boolean = selectedIndex === index;
                const isPrevious: boolean = assets[index + 1] && selectedIndex === index + 1;
                return (
                  <Tab
                    isPrevious={isPrevious}
                    index={index}
                    key={asset.id}
                    rule={tabRule}
                    onClick={() => changeAsset(index)}
                    controls={`asset-${asset.id}`}
                    render="tr"
                    presentation={false}
                    // eslint-disable-next-line no-return-assign
                  >
                    {headers.map((header: Header, i: number) => {
                      const isLast: boolean = i === headers.length - 1;
                      return (
                        <TdComponent
                          key={`${header.value}-${asset.id}`}
                          isActive={isActive}
                          miscStyles={
                            !i
                              ? {
                                fontWeight: '700',
                                paddingStart: '1rem',
                                paddingEnd: '2rem',
                                maxWidth: '17rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }
                              : isLast
                                ? {
                                  color:
                                      Number(asset[header.value]) < 0
                                        ? isActive
                                          ? theme.color('negative', '-2')
                                          : theme.color('negative')
                                        : isActive
                                          ? theme.color('positive', '-2')
                                          : theme.color('positive'),
                                  direction: 'ltr',
                                  fontWeight: '700',
                                  paddingEnd: '2rem',
                                  position: 'relative',
                                  textAlign: 'start',
                                  ':after': {
                                    ...(isActive
                                      ? {
                                        width: '4rem',
                                        content: '""',
                                        /* selected black arrow svg image */
                                        backgroundImage:
                                              'url("data:image/svg+xml; utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%205%2010%27%3E%3Cpolygon%20fill%3D%27white%27%20points%3D%270%2C0%205%2C0%2C%200%2C5%205%2C10%200%2C10%27%2F%3E%3C%2Fsvg%3E")',
                                        end: '0',
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        // accommodate a `display: table` bug, that caused `height: 100%`
                                        // to leave two narrow lines at the top and bottom
                                        ...theme.mq(
                                          { from: 'xl', },
                                          { height: 'calc(100% + 3px)', }
                                        ),
                                        ...theme.mq(
                                          { until: 'xl', },
                                          { height: 'calc(100% + 2px)', }
                                        ),
                                      }
                                      : {}),
                                  },
                                }
                                : {}
                          }
                        >
                          {isLast ? (
                            <FelaComponent
                              style={{
                                ':before': {
                                  content:
                                    Number(asset[header.value]) > 0
                                      ? '"+"'
                                      : '"-"',
                                },
                                ...(header.percentage
                                  ? {
                                    ':after': {
                                      content: '"%"',
                                    },
                                  }
                                  : {}),
                              }}
                              render="span"
                            >
                              {header.percentage
                                ? numToString(
                                  Math.abs(Number(asset[header.value]))
                                )
                                : Math.abs(Number(asset[header.value]))}
                            </FelaComponent>
                          ) : (
                            asset[header.value]
                          )}
                        </TdComponent>
                      );
                    })}
                  </Tab>
                );
              })}
            </TabList>
          </Tabs>
        )}
      />
    </FelaComponent>
  );
}

export default AssetsTable;
