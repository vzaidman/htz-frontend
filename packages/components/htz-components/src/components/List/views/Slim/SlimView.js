// @flow
import React, { Fragment, type StatelessFunctionalComponent, } from 'react';
import { FelaTheme, } from 'react-fela';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import ListView from '../../../ListView/ListView';
import GridItem from '../../../Grid/GridItem';
import Grid from '../../../Grid/Grid';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import Media from '../../../Media/Media';
import { MainGallery, MobileGalleryTeaser, RelatedGallery, } from './GalleriesComponents';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: () => void,
  biAction: ListBiActionType,
};
const Slim: StatelessFunctionalComponent<Props> = ({
  list,
  listId,
  gaAction,
  biAction,
}) => {
  const { items, } = list;
  return (
    <FelaTheme
      render={theme => (
        <Media
          matchOnServer
          query={{ until: 's', }}
        >
          {matches => (!matches
            ? (
              <ListView
                innerBackgroundColor={[ 'neutral', ]}
                outerBackgroundColor={[ 'neutral', '-1', ]}
                miscStyles={{
                  paddingStart: [ { from: 'xl', value: '4rem', }, ],
                  paddingEnd: [ { from: 'xl', value: '4rem', }, ],
                }}
              >
                {
                  items && items[0]
                    ? (
                      <Fragment>
                        {/* Gallery Title */}
                        <GridItem
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
                    gutter={2}
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
            )
            : (
              <MobileGalleryTeaser item={items[0]} biAction={biAction} />
            ))
          }
        </Media>
      )}
    />
  );
};
export default Slim;
