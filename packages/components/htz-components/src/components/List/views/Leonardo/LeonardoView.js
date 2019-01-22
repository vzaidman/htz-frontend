// @flow
import React from 'react';
import { FelaTheme, } from 'react-fela';

import type { Node, } from 'react';
import type { ClickTrackerBannerType, } from '../../../../flowTypes/ClickTrackerBannerType';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import Debug from '../../../Debug/Debug';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import HtzLink from '../../../HtzLink/HtzLink';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView';

type Props = {
  list: ListDataType,
};

function Leonardo({ list, }: Props): Node {
  const items: ?Array<ClickTrackerBannerWrapperType> = list.clickTrackers && list.clickTrackers.length > 3
    ? list.clickTrackers.slice(0, 4)
    : null;

  return items ? (
    <FelaTheme
      render={theme => (
        <ListView
          innerBackgroundColor="white"
          gutter={0}
          marginTop={0}
          padding={[
            { from: 's', until: 'l', value: [ 2, 0, 4, ], },
            { from: 'l', value: [ 4, 0, 6, ], },
          ]}
          miscStyles={{
            display: [ { until: 's', value: 'none', }, ],
            borderTop: [
              {
                from: 's',
                until: 'l',
                value: [ '2px', 2, 'solid', theme.color('bg'), ],
              },
              { from: 'l', value: [ '2px', 4, 'solid', theme.color('bg'), ], },
            ],
          }}
          gridMiscStyles={{
            paddingInlineEnd: [
              { from: 's', until: 'l', value: 4, },
              { from: 'l', until: 'xl', value: 12, },
              { from: 'xl', value: 20, },
            ],
            paddingInlineStart: [
              { from: 's', until: 'l', value: 4, },
              { from: 'l', until: 'xl', value: 12, },
              { from: 'xl', value: 20, },
            ],
            borderBottom: [
              { from: 'l', value: [ '2px', 4, 'solid', theme.color('bg'), ], },
            ],
          }}
        >
          <GridItem width={1}>
            <Grid gutter={4}>
              {items.map(item => (
                <GridItem key={item.contentId} width={1 / items.length}>
                  <ClickTracker
                    {...item}
                    render={(banner: ClickTrackerBannerType) => {
                      const { clicktrackerimage, link, } = banner;
                      return (
                        <HtzLink href={link}>
                          <Image
                            data={clicktrackerimage}
                            imgOptions={{
                              transforms: {
                                width: '227',
                                aspect: 'landscape',
                                quality: 'auto',
                              },
                            }}
                          />
                        </HtzLink>
                      );
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </ListView>
      )}
    />
  ) : (
    <Debug>There is not enough items to render this list view</Debug>
  );
}

export default Leonardo;
