// @flow

import * as React from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';

import { isClickTrackerWrapper, } from '../../utils/validateTeaser';
import ClickTracker from '../../../ClickTracker/ClickTrackerWrapper';
import GridItem from '../../../Grid/GridItem';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import Image from '../../../Image/Image';
import Card from '../../../Card/Card';
import Grid from '../../../Grid/Grid';
import BlockLink from '../../../BlockLink/BlockLink';
import AboveBlockLink from '../../../BlockLink/AboveBlockLink';
import HtzLink from '../../../HtzLink/HtzLink';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListItemType, } from '../../../../flowTypes/ListDataType';

type ZappPromotedContentProps = {
  data: ListItemType,
  lazyLoadImages: boolean,
  index: number,
  biAction: ListBiActionType,
};

ZappPromotedContent.defaultProps = {
  lazyLoadImages: true,
};

export default function ZappPromotedContent({
  data,
  lazyLoadImages,
  index,
  biAction,
}: ZappPromotedContentProps): React.Node {
  return isClickTrackerWrapper(data) ? (
    <FelaTheme
      render={theme => (
        <ClickTracker
          {...data}
          render={banner => (
            <Card
              backgroundColor={[ 'neutral', '-7', ]}
              miscStyles={{
                border: [ '1px', 0, 'solid', theme.color('neutral', -4), ],
                fontFamily: theme.fontStacks.commercial,
              }}
            >
              <BlockLink
                href={banner.link}
                target={banner.linkTarget}
                onClick={() => biAction({ index, articleId: data.contentId, })}
              >
                <Grid gutter={0}>
                  <GridItem width={4 / 12}>
                    <Image
                      data={banner.clicktrackerimage}
                      lazyLoad={lazyLoadImages}
                      imgOptions={{
                        transforms: {
                          width: '102',
                          aspect: 'square',
                          quality: 'auto',
                        },
                      }}
                    />
                  </GridItem>
                  <GridItem
                    miscStyles={{
                      type: -1,
                      color: theme.color('neutral', -1),
                      padding: '2rem',
                    }}
                  >
                    <FelaComponent
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <Section isFragment>
                        <AboveBlockLink>
                          {({ className, }) => (
                            <HtzLink
                              href={banner.link}
                              target={banner.linkTarget}
                              onClick={() => biAction({ index, articleId: data.contentId, })
                              }
                            >
                              <H className={className}>{banner.text}</H>
                            </HtzLink>
                          )}
                        </AboveBlockLink>
                      </Section>
                      <FelaComponent
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          color: theme.color('commercial'),
                          fontWeight: 'bold',
                          extend: [ theme.type(-2), ],
                        }}
                      >
                        {'תוכן מקודם'}
                      </FelaComponent>
                    </FelaComponent>
                  </GridItem>
                </Grid>
              </BlockLink>
            </Card>
          )}
        />
      )}
    />
  ) : null;
}
