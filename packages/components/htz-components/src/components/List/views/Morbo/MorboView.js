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
        <ListViewHeader isHorizontal {...list} />
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
          gutter={0}
          onClick={
            biAction
              ? () => biAction({ index: 0, articleId: data.contentId, })
              : null
          }
          gridMiscStyles={{ flexWrap: 'nowrap', }}
        >
          <TeaserMedia
            data={data}
            width={[
              { until: 's', value: 17, },
              { from: 's', until: 'l', value: 28, },
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
                  sizes: [ { size: '102px', }, ],
                  aspect: 'square',
                  widths: [ 102, 204, ],
                },
                sources: [
                  {
                    aspect: 'regular',
                    from: 's',
                    sizes: [
                      { from: 'xl', size: '192px', },
                      { from: 's', size: '168px', },
                    ],
                    widths: [ 320, 192, 168, ],
                  },
                ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={data}
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 1, 1, ]}
            width={[
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
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 1, 1, ]}
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
