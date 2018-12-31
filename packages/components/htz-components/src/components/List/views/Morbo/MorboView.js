// @flow

import { FelaTheme, } from 'react-fela';
import * as React from 'react';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import CommentsCount from '../../../CommentsCount/CommentsCount';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import Picture from '../../../Image/Picture';
import Section from '../../../AutoLevels/Section';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import getPictureAssets from '../../../../utils/getPictureAssets';

type MorboPropsType = {
  list: ListDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
  gaAction: ?() => void,
};

Morbo.defaultProps = {
  biAction: null,
  gaAction: null,
  lazyLoadImages: true,
};

export default function Morbo({
  list,
  lazyLoadImages,
  biAction,
  gaAction,
}: MorboPropsType): React.Node {
  const [ teaser1Data, teaser2Data, teaser3Data, teaser4Data, ] = (list && list.items) || [];

  return (
    <ListView
      padding={[ { until: 's', value: [ 0, 2, ], }, { from: 's', value: [ 0, 4, ], }, ]}
      gutter={4}
      innerBackgroundColor="transparent"
    >
      {/* Header */}
      <GridItem stretchContent width={1}>
        <ListViewHeader {...list} />
      </GridItem>

      {/* Items */}
      <GridItem stretchContent width={1} miscStyles={{ marginTop: '1rem', }}>
        <Section isFragment>
          <Grid
            gutter={4}
            rowSpacing={[
              { until: 's', value: { amount: 1, }, },
              { from: 's', until: 'l', value: { amount: 4, }, },
              { from: 'l', until: 'xl', value: { amount: 4, nUp: 2, }, },
              { from: 'xl', value: { amount: 0, }, },
            ]}
          >
            {/* Item 1 */}
            <GridItem
              stretchContent
              width={[
                { until: 'l', value: 1, },
                { from: 'l', until: 'xl', value: 7 / 12, },
                { from: 'xl', value: 4 / 12, },
              ]}
            >
              <Teaser1 data={teaser1Data} />
            </GridItem>

            {/* Item 2 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 1 / 2, },
                { from: 'l', until: 'xl', value: 5 / 12, },
                { from: 'xl', value: 3 / 12, },
              ]}
            >
              <Teaser234 data={teaser2Data} />
            </GridItem>

            {/* Item 3 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 1 / 2, },
                { from: 'l', until: 'xl', value: 6 / 12, },
                { from: 'xl', value: 2 / 12, },
              ]}
            >
              <Teaser234 data={teaser3Data} />
            </GridItem>

            {/* Item 4 */}
            <GridItem
              stretchContent
              width={[
                { until: 'l', value: 1, },
                { from: 'l', until: 'xl', value: 6 / 12, },
                { from: 'xl', value: 3 / 12, },
              ]}
            >
              <Teaser234 data={teaser4Data} />
            </GridItem>
          </Grid>
        </Section>
      </GridItem>
    </ListView>
  );
}

// /////////////////////////////////////////////////////////////////////
//                         Teaser Components                          //
// /////////////////////////////////////////////////////////////////////

type TeaserPropsType = {
  data: TeaserDataType,
  lazyLoadImages?: boolean,
  biAction: ?ListBiActionType,
};

const teaserDefaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

Teaser1.defaultProps = teaserDefaultProps;

function Teaser1({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={1}
          onClick={
            biAction
              ? () => biAction({ index: 0, articleId: data.contentId, })
              : null
          }
        >
          {data.image ? (
            <TeaserMedia
              data={data}
              width={[
                { until: 's', value: 1 / 3, },
                { from: 's', until: 'l', value: 4 / 12, },
                { from: 'l', until: 'xl', value: 2 / 7, },
                { from: 'xl', value: 1 / 2, },
              ]}
            >
              <Picture
                lazyLoad={lazyLoadImages}
                {...getPictureAssets({
                  bps: theme.bps,
                  imgData: data.image,
                  defaultImgOptions: {
                    sizes: [ { size: '190px', }, ],
                    aspect: 'square',
                    widths: [ 102, 158, 184, 204, 240, 260, 400, 520, 1024, ],
                  },
                  sources: [
                    {
                      aspect: 'square',
                      sizes: '190px',
                      widths: [ 190, 380, ],
                    },
                    {
                      aspect: 'regular',
                      from: 's',
                      sizes: [
                        { from: 'xl', size: '190px', },
                        { from: 'l', size: '160px', },
                        { from: 'm', size: '240px', },
                        { from: 's', size: '180px', },
                      ],
                      widths: [ 160, 200, 240, 320, 480, 1024, ],
                    },
                  ],
                })}
              />
            </TeaserMedia>
          ) : null}
          <TeaserContent
            data={data}
            width={[
              { until: 's', value: 2 / 3, },
              { from: 's', until: 'l', value: 8 / 12, },
              { from: 'l', until: 'xl', value: 5 / 7, },
              { from: 'xl', value: 1 / 2, },
            ]}
            renderContent={() => (
              <TeaserHeader
                typeScale={[
                  { until: 's', value: -1, },
                  { from: 's', until: 'l', value: 0, },
                  { from: 'l', until: 'xl', value: 0, },
                  { from: 'xl', value: -1, },
                ]}
                {...data}
              />
            )}
            renderFooter={() => (
              <CommentsCount
                commentsCount={data.commentsCounts}
                miscStyles={{ type: -3, }}
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}

Teaser234.defaultProps = teaserDefaultProps;
function Teaser234({
  data,
  lazyLoadImages,
  biAction,
}: TeaserPropsType): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          gutter={0}
          onClick={
            biAction
              ? () => biAction({ index: 1, articleId: data.contentId, })
              : null
          }
        >
          <TeaserContent
            data={data}
            width={1}
            renderContent={() => (
              <TeaserHeader
                typeScale={[
                  { until: 's', value: -1, },
                  { from: 's', until: 'l', value: 0, },
                  { from: 'l', until: 'xl', value: 0, },
                  { from: 'xl', value: -1, },
                ]}
                {...data}
              />
            )}
            renderFooter={() => (
              <CommentsCount
                commentsCount={data.commentsCounts}
                miscStyles={{ type: -3, }}
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}
