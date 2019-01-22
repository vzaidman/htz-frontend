// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, FelaTheme, } from 'react-fela';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import ListView from '../../../ListView/ListView';
import GridItem from '../../../Grid/GridItem';
import Grid from '../../../Grid/Grid';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import { MainGallery, MobileGalleryTeaser, RelatedGallery, } from './GalleriesComponents';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: () => void,
  biAction: ListBiActionType,
};

function Slim({ list, listId, gaAction, biAction, }: Props) {
  const { items, } = list;
  return (
    <FelaTheme
      render={theme => (
        <Fragment>
          <ListView
            gutter={4}
            innerBackgroundColor={[ 'neutral', ]}
            outerBackgroundColor={[ 'neutral', '-1', ]}
            padding={[
              { until: 'xl', value: 0, },
              { from: 'xl', value: [ 0, 4, ], },
            ]}
            miscStyles={{
              display: [ { until: 's', value: 'none', }, ],
            }}
          >
            {
              items && items[0]
                ? (
                  <Fragment>
                    {/* Gallery Title */}
                    <GridItem
                      gutter={4}
                      width={1}
                      miscStyles={{
                        paddingBottom: '1rem',
                        paddingTop: '1rem',
                      }}
                    >
                      <TeaserHeader
                        {...items[0]}
                        typeScale={0}
                        color={[ 'neutral', '-10', ]}
                        miscStyles={{
                          paddingStart: [ { until: 'xl', value: '4rem', }, ],
                        }}
                      />
                    </GridItem>
                    {/* Main Gallery */}
                    <GridItem
                      gutter={4}
                      width={[
                        { until: 'xl', value: 1, },
                        { from: 'xl', value: 9 / 12, },
                      ]}
                      miscStyles={{
                        paddingBottom: [
                          { until: 'xl', value: '2rem', },
                        ],
                      }}
                    >
                      <MainGallery item={items[0]} />
                    </GridItem>
                  </Fragment>
                )
                : null
            }
            {/* Related Galleries */}
            <GridItem
              gutter={4}
              width={[
                { until: 'xl', value: 1, },
                { from: 'xl', value: 3 / 12, },
              ]}
              stretchContent
              miscStyles={{
                borderTop: [
                  { until: 'xl', value: [ '1px', 0, 'solid', theme.color('neutral', '-5'), ], },
                ],
              }}
            >
              <Grid
                gutter={4}
                miscStyles={{
                  padding: [ { until: 'xl', value: '4rem', }, ],
                }}
              >
                <RelatedGallery item={items[1]} biAction={biAction} />
                <RelatedGallery item={items[2]} biAction={biAction} />
                <RelatedGallery
                  item={items[3]}
                  biAction={biAction}
                  miscStyles={{
                    display: [
                      { until: 'l', value: 'none', },
                      { from: 'xl', value: 'none', },
                    ],
                  }}
                />
              </Grid>
            </GridItem>
          </ListView>
          <FelaComponent
            style={{
              extend: [
                theme.mq(
                  { from: 's', },
                  { display: 'none', },
                ),
              ],
            }}
          >
            <MobileGalleryTeaser item={items[0]} biAction={biAction} />
          </FelaComponent>
        </Fragment>
      )}
    />
  );
}

export default Slim;
