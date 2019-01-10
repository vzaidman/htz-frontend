// @flow

import * as React from 'react';
import { FelaTheme, } from 'react-fela';
import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserRank from '../../../TeaserRank/TeaserRank';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import CommentsCount from '../../../CommentsCount/CommentsCount';
import Picture from '../../../Image/Picture';
import getPictureAssets from '../../../../utils/getPictureAssets';

type Props = {
  gutter: ?number,
  lazyLoadImages: boolean,
  isStackedOnXl: boolean,
  /**
   * The width of the underlying Component.
   * The number passed should be (`width` / `columns`).
   * When the number passed to `width` is greater than `1`, it will be
   * used as an absolute width in rems.
   *
   * Can be set responsively.
   *
   * @example
   * // <TeaserMedia /> spans 25% (3 of 12 columns)
   * <TeaserMedia width={3 / 12} />
   *
   * // responsive settings:
   * <TeaserMedia
   *   width={[
   *     { from: 's', until: 'm', misc: 'landscape', value: 3 / 12 },
   *     { from: 'xl', value: 6 / 12 },
   *   ]}
   * />
   */
  width: ?(number | ComponentPropResponsiveObject<number>[]),
  list: ListDataType,
};

Pazuzu.defaultProps = {
  gutter: null,
  isStackedOnXl: false,
  lazyLoadImages: true,
  width: null,
};

function PazuzuTeaser({
  item,
  isStackedOnXl,
  isSecondItem,
  lazyLoadImages,
}: {
  item: TeaserDataType,
  isStackedOnXl: boolean,
  isSecondItem: boolean,
  lazyLoadImages: boolean,
}): React.Node {
  const stackingSettings = isStackedOnXl
    ? true
    : [ { until: 'xl', value: true, }, { from: 'xl', value: false, }, ];

  return (
    <FelaTheme
      render={theme => (
        <GridItem
          gutter={0}
          miscStyles={{
            [isSecondItem ? 'paddingInlineStart' : 'paddingInlineEnd']: [
              { until: 's', value: '0.5rem', },
              { from: 's', value: '2rem', },
            ],
          }}
        >
          <Teaser data={item} gutter={1} isStacked={stackingSettings}>
            <TeaserMedia
              data={item}
              isStacked={stackingSettings}
              width={[
                { until: 'xl', value: 1, },
                ...(isStackedOnXl ? [] : [ { from: 'xl', value: 1 / 2, }, ]),
              ]}
            >
              <Picture
                lazyLoad={lazyLoadImages}
                {...getPictureAssets({
                  bps: theme.bps,
                  imgData: item.image,
                  defaultImgOptions: {
                    sizes: '375px',
                    aspect: 'headline',
                    widths: [ 375, 425, 600, 768, 1028, 1280, 1920, ],
                  },
                  sources: [
                    {
                      aspect: isStackedOnXl ? 'landscape' : 'headline',
                      from: 'xl',
                      sizes: [ { from: 'xl', size: '388px', }, ],
                      widths: [ 388, 776, 1024, ],
                    },
                  ],
                })}
              />
            </TeaserMedia>
            <TeaserContent
              isStacked={stackingSettings}
              width={[
                { until: 'xl', value: 1, },
                ...(isStackedOnXl ? [] : [ { from: 'xl', value: 1 / 2, }, ]),
              ]}
              data={item}
              renderContent={() => (
                <TeaserHeader
                  {...item}
                  typeScale={[
                    { until: 's', value: -1, },
                    { from: 's', until: 'xl', value: 2, },
                    { from: 'xl', value: 1, },
                  ]}
                />
              )}
              footerMiscStyles={{
                color: theme.color('neutral', '-3'),
                ...(isStackedOnXl
                  ? {}
                  : {
                    marginTop: [ { until: 'xl', value: 'auto', }, { from: 'xl', value: '0', }, ],
                  }),
                type: [
                  { until: 's', value: -3, },
                  { from: 's', until: 'xl', value: -2, },
                  { from: 'xl', value: -3, },
                ],
              }}
              padding={[
                { until: 's', value: [ 1, 1, 0, ], },
                { from: 's', until: 'xl', value: [ 1, 0, 0, ], },
                { from: 'xl', value: isStackedOnXl ? [ 1, 0, 0, ] : 0, },
              ]}
              footerPadding={[ { until: 'xl', value: 1, }, { from: 'xl', value: [ 1, 0, ], }, ]}
              renderFooter={() => (
                <React.Fragment>
                  <TeaserAuthors authors={item.authors} miscStyles={{ fontWeight: 'bold', }} />
                  {' | '}
                  <TeaserTime {...item} />
                  {' '}
                  <CommentsCount
                    miscStyles={{
                      marginInlineEnd: '1rem',
                      display: [ { until: 's', value: 'none', }, ],
                    }}
                    commentsCount={item.commentsCounts}
                  />
                  {item.rank && (
                    <TeaserRank
                      maxRank={5}
                      rank={item.rank}
                      miscStyles={{
                        order: [ { until: 's', value: -1, }, ],
                        display: [ { until: 's', value: 'none', }, ],
                      }}
                    />
                  )}
                </React.Fragment>
              )}
            />
          </Teaser>
        </GridItem>
      )}
    />
  );
}

function Pazuzu({
  isStackedOnXl,
  gutter,
  width,
  list: { items, },
  lazyLoadImages,
}: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <GridItem
          gutter={gutter}
          width={width}
          miscStyles={{
            paddingInlineStart: [ { until: 's', value: '2rem', }, ],
            paddingInlineEnd: [ { until: 's', value: '2rem', }, ],
            marginTop: [ { until: 's', value: 1, }, { from: 's', value: 4, }, ],
          }}
        >
          <ListView disableWrapper gutter={0} marginTop={0}>
            <PazuzuTeaser
              lazyLoadImages={lazyLoadImages}
              isStackedOnXl={isStackedOnXl}
              isSecondItem={false}
              item={items[0]}
            />
            <PazuzuTeaser
              lazyLoadImages={lazyLoadImages}
              isStackedOnXl={isStackedOnXl}
              isSecondItem
              item={items[1]}
            />
          </ListView>
        </GridItem>
      )}
    />
  );
}

export default Pazuzu;
