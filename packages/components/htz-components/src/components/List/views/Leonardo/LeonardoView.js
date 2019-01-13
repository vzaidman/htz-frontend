// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderTop, borderBottom, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { ClickTrackerBannerWrapperType, } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { ClickTrackerBannerType, } from '../../../../flowTypes/ClickTrackerBannerType';
import type { ListDataType, } from '../../../..';

import ListView from '../../../ListView/ListView';
import GridItem from '../../../Grid/GridItem';
import Grid from '../../../Grid/Grid';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import Image from '../../../Image/Image';
import Debug from '../../../Debug/Debug';
import BlockLink from '../../../BlockLink/BlockLink';

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
          marginTop={0}
          padding={[
            { from: 's', until: 'l', value: [ 2, 4, 4, ], },
            { from: 'l', until: 'xl', value: [ 4, 12, 8, ], },
            { from: 'xl', value: [ 4, 20, 8, ], },
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
                        <FelaComponent
                          style={{
                            extend: [
                              borderTop(
                                '1px',
                                2,
                                'solid',
                                theme.color('neutral', '-5')
                              ),
                              borderBottom(
                                '1px',
                                2,
                                'solid',
                                theme.color('neutral', '-5')
                              ),
                            ],
                          }}
                        >
                          <BlockLink href={link}>
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
                          </BlockLink>
                        </FelaComponent>
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
