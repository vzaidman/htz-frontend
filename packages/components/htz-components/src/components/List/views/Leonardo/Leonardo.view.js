// @flow
import React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderTop, borderBottom, } from '@haaretz/htz-css-tools';

import type { StatelessFunctionalComponent } from 'react';
import type { ClickTrackerBannerWrapperType } from '../../../../flowTypes/ClickTrackerBannerWrapperType';
import type { ClickTrackerBannerType } from '../../../../flowTypes/ClickTrackerBannerType';

import ListView from '../../../ListView/ListView';
import GridItem from '../../../Grid/GridItem';
import Grid from '../../../Grid/Grid';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import Image from '../../../Image/Image';
import Debug from '../../../Debug/Debug';
import BlockLink from '../../../BlockLink/BlockLink';

type Props = {
  list: {
    items: Array<ClickTrackerBannerWrapperType>,
  },
  listId: string,
};

const Leonardo: StatelessFunctionalComponent<Props> = ({ list, }) => {
  const items: ?Array<ClickTrackerBannerWrapperType> = list.items.length > 3
    ? list.items.slice(0,4)
    : null;
  return items
    ? (
      <FelaTheme
        render={theme => (
          <ListView
            innerBackgroundColor={[ 'neutral', '-10', ]}
            outerBackgroundColor={[ 'neutral', '-10', ]}
            miscStyles={{
              display: [ { until: 's', value: 'none', }, ],
            }}
          >
            <GridItem
              width={1}
            >
              <Grid
                gutter={4}
                miscStyles={{
                  paddingInlineStart: [
                    { until: 'l', value: '12rem', },
                    { from: 'l', until: 'xl', value: '12rem', },
                    { from: 'xl', value: '20rem', },
                  ],
                  paddingInlineEnd: [
                    { until: 'l', value: '12rem', },
                    { from: 'l', until: 'xl', value: '12rem', },
                    { from: 'xl', value: '20rem', },
                  ],
                }}
              >
                {
                  items.map(item => (
                    <GridItem
                      key={item.contentId} width={1 / items.length}
                    >
                      <ClickTracker
                        {...item}
                        render={(banner: ClickTrackerBannerType) => {
                          const { clicktrackerimage, link, } = banner;
                          return (
                            <FelaComponent
                              style={{
                                extend: [
                                  borderTop('1px', 2, 'solid', theme.color('neutral', '-5')),
                                  borderBottom('1px', 2, 'solid', theme.color('neutral', '-5')),
                                ]
                              }}
                            >
                              <BlockLink
                                href={link}
                              >
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
                          )
                        }}
                      />
                    </GridItem>
                  ))
                }
              </Grid>
            </GridItem>
          </ListView>
        )}
      />
    )
    : (
      <Debug>{`There is not enough items to render this list view`}</Debug>
  )
};

export default Leonardo;
