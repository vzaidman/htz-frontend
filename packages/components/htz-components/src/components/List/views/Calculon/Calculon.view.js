// @flow

import * as React from 'react';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import ListViewHeader from '../../../ListViewHeader/ListViewHeader';
import Section from '../../../AutoLevels/Section';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';

type CalculonPropsType = {
  list: ListDataType,
  lazyloadImages: boolean,
};

Calculon.defaultProps = {
  lazyloadImages: true,
};

export default function Calculon({
  list,
  lazyloadImages,
}: CalculonPropsType): React.Node {
  const [ teaser1Data, teaser2Data, teaser3Data, teaser4Data, teaser5Data, ] = (list && list.items) || [];

  return (
    <ListView gutter={4}>
      {/* Header */}
      <GridItem
        stretchContent
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 2 / 12, }, ]}
      >
        <ListViewHeader {...list} />
      </GridItem>

      {/* Items */}
      <GridItem
        stretchContent
        width={[ { until: 'l', value: 1, }, { from: 'l', value: 10 / 12, }, ]}
      >
        <Section isFragment>
          <Grid gutter={4}>
            {/* Item 1 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 8 / 12, },
                { from: 'l', until: 'xl', value: 1, },
                { from: 'xl', value: 8 / 10, },
              ]}
            >
              <Teaser1 data={teaser1Data} />
            </GridItem>

            {/* Item 2 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 4 / 12, },
                { from: 'l', until: 'xl', value: 5 / 10, },
                { from: 'xl', value: 2 / 10, },
              ]}
            >
              <Teaser2 data={teaser2Data} />
            </GridItem>

            {/* Item 3 */}
            <GridItem
              stretchContent
              width={[
                { until: 'l', value: 1, },
                { from: 'l', until: 'xl', value: 5 / 10, },
                { from: 'xl', value: 4 / 10, },
              ]}
            >
              <Teaser3 data={teaser3Data} />
            </GridItem>

            {/* Item 4 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 6 / 12, },
                { from: 'l', until: 'xl', value: 5 / 10, },
                { from: 'xl', value: 4 / 10, },
              ]}
            >
              <Teaser4 data={teaser4Data} />
            </GridItem>

            {/* Item 5 */}
            <GridItem
              stretchContent
              width={[
                { until: 's', value: 1, },
                { from: 's', until: 'l', value: 6 / 12, },
                { from: 'l', until: 'xl', value: 5 / 10, },
                { from: 'xl', value: 2 / 10, },
              ]}
            >
              <Teaser5 data={teaser5Data} />
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
};

function Teaser1({ data, }: TeaserPropsType): React.Node {
  return (
    <Teaser data={data} gutter={2}>
      <TeaserMedia
        data={data}
        width={[
          { until: 'l', value: 1, },
          { from: 'l', until: 'xl', value: 7 / 10, },
          { from: 'xl', value: 6 / 8, },
        ]}
      >
        {/* image */}
      </TeaserMedia>
      <TeaserContent
        data={data}
        width={[
          { until: 'l', value: 1, },
          { from: 'l', until: 'xl', value: 3 / 10, },
          { from: 'xl', value: 2 / 8, },
        ]}
        padding={[
          { until: 'l', value: [ 1, 2, ], },
          { from: 'l', value: [ 3, 0, 2, 2, ], },
        ]}
        footerPadding={[
          { until: 'l', value: [ 1, 2, ], },
          { from: 'l', value: [ 1, 0, 2, 1, ], },
        ]}
        // TODO: Should author and pubdate be here or in footer?
        renderContent={() => <TeaserHeader {...data} />}
        renderFooter={() => (
          /* TODO: insert rank, commentCount and (author and pubDate), if not rendered in content */
          <div />
        )}
      />
    </Teaser>
  );
}

function Teaser2({ data, }: TeaserPropsType): React.Node {
  return (
    <Teaser data={data} gutter={2}>
      <TeaserMedia
        data={data}
        width={[
          { until: 's', value: 17, },
          { from: 's', until: 'l', value: 1, },
          { from: 'l', until: 'xl', value: 2 / 5, },
          { from: 'xl', value: 1, },
        ]}
      >
        {/* picture */}
      </TeaserMedia>
      <TeaserContent
        data={data}
        width={[
          { from: 's', until: 'l', value: 1, },
          { from: 'l', until: 'xl', value: 3 / 5, },
          { from: 'xl', value: 1, },
        ]}
        padding={[
          { until: 'l', value: [ 1, 2, ], },
          { from: 'l', value: [ 1, 0, 2, 2, ], },
        ]}
        footerPadding={[
          { until: 'l', value: [ 1, 2, ], },
          { from: 'l', value: [ 1, 0, 2, 1, ], },
        ]}
        renderContent={() => <TeaserHeader {...data} />}
        renderFooter={() => (
          /* TODO: insert rank and commentCount */
          <div />
        )}
      />
    </Teaser>
  );
}

function Teaser3({ data, }: TeaserPropsType): React.Node {
  return (
    <Teaser data={data} gutter={2}>
      <TeaserMedia
        data={data}
        width={[
          { until: 's', value: 17, },
          { from: 's', until: 'l', value: 4 / 12, },
          { from: 'l', until: 'xl', value: 2 / 5, },
          { from: 'xl', value: 2 / 4, },
        ]}
      >
        {/* image */}
      </TeaserMedia>
      <TeaserContent
        data={data}
        width={[
          { from: 's', until: 'l', value: 8 / 12, },
          { from: 'l', until: 'xl', value: 3 / 5, },
          { from: 'xl', value: 2 / 4, },
        ]}
        padding={[
          { until: 'l', value: [ 1, 2, ], },
          { from: 'l', value: [ 1, 0, 2, 2, ], },
        ]}
        footerPadding={[
          { until: 'l', value: [ 1, 2, ], },
          { from: 'l', value: [ 1, 0, 2, 1, ], },
        ]}
        renderContent={() => <TeaserHeader {...data} />}
        renderFooter={() => (
          /* TODO: insert rank and commentCount */
          <div />
        )}
      />
    </Teaser>
  );
}

function Teaser4({ data, }: TeaserPropsType): React.Node {
  return (
    <Teaser data={data} gutter={2}>
      <TeaserMedia
        data={data}
        width={2 / 4}
        miscStyles={{ display: [ { until: 'xl', value: 'none', }, ], }}
      >
        {/* image */}
      </TeaserMedia>
      <TeaserContent
        data={data}
        width={[ { from: 'xl', value: 2 / 4, }, ]}
        padding={[
          { until: 'xl', value: [ 1, 2, 2, ], },
          { from: 'xl', value: [ 1, 0, 2, 2, ], },
        ]}
        footerPadding={[
          { until: 'l', value: [ 1, 2, ], },
          { from: 'l', value: [ 1, 0, 2, 1, ], },
        ]}
        renderContent={() => <TeaserHeader {...data} />}
        renderFooter={() => (
          /* TODO: insert rank and commentCount */
          <div />
        )}
      />
    </Teaser>
  );
}

function Teaser5({ data, }: TeaserPropsType): React.Node {
  return (
    <Teaser data={data} gutter={2}>
      <TeaserContent
        data={data}
        width={1}
        padding={[ 1, 2, 2, ]}
        footerPadding={[ 1, 2, ]}
        renderContent={() => <TeaserHeader {...data} />}
        renderFooter={() => (
          /* TODO: insert rank and commentCount */
          <div />
        )}
      />
    </Teaser>
  );
}
