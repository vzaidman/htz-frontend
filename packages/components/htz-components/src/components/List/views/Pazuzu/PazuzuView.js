// @flow

import * as React from 'react';
import { FelaTheme, } from 'react-fela';
import type { ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

import CommentsCount from '../../../CommentsCount/CommentsCount';
import Debug from '../../../Debug/Debug';
import GridItem from '../../../Grid/GridItem';
import Image from '../../../Image/Image';
import ListView from '../../../ListView/ListView';
import Picture from '../../../Image/Picture';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserRank from '../../../TeaserRank/TeaserRank';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import getImageAssets from '../../../../utils/getImageAssets';
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
  biAction: ?ListBiActionType,
};

Pazuzu.defaultProps = {
  gutter: null,
  isStackedOnXl: false,
  lazyLoadImages: false,
  width: null,
};

export default function Pazuzu({
  isStackedOnXl,
  gutter,
  width,
  list,
  lazyLoadImages,
  biAction,
}: Props): React.Node {
  const { items = [], } = list || {};
  return (
    <GridItem
      gutter={gutter}
      width={width}
      miscStyles={{
        marginTop: [ { until: 's', value: 2, }, { from: 's', value: 4, }, ],
      }}
    >
      <ListView disableWrapper gutter={0} marginTop={0}>
        {items && items[0] ? (
          <PazuzuTeaser
            lazyLoadImages={lazyLoadImages}
            isStackedOnXl={isStackedOnXl}
            isSecondItem={false}
            item={items[0]}
            biAction={biAction}
          />
        ) : (
          <Debug>There is no data for the first teaser in this list</Debug>
        )}
        {items && items[1] ? (
          <PazuzuTeaser
            lazyLoadImages={lazyLoadImages}
            isStackedOnXl={isStackedOnXl}
            isSecondItem
            item={items[1]}
            biAction={biAction}
          />
        ) : (
          <Debug>There is no data for the second teaser in this list</Debug>
        )}
      </ListView>
    </GridItem>
  );
}

type PazuzuTeaserPropTypes = {
  item: TeaserDataType,
  isStackedOnXl: boolean,
  isSecondItem: boolean,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
};

PazuzuTeaser.defaultProps = { lazyLoadImages: false, };
function PazuzuTeaser({
  item,
  isStackedOnXl,
  isSecondItem,
  lazyLoadImages,
  biAction,
}: PazuzuTeaserPropTypes): React.Node {
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
          <Teaser
            data={item}
            isStacked={stackingSettings}
            gutter={0}
            gridMiscStyles={{ flexWrap: 'nowrap', }}
            onClick={
              biAction
                ? () => biAction({ index: isSecondItem ? 1 : 0, articleId: item.representedContent, })
                : null
            }
          >
            <TeaserMedia
              data={item}
              isStacked={stackingSettings}
              width={isStackedOnXl ? null : [ { from: 'xl', value: 48, }, ]}
              onClick={
                biAction
                  ? () => biAction({ index: isSecondItem ? 1 : 0, articleId: item.representedContent, })
                  : null
              }
            >
              {isStackedOnXl ? (
                <Picture
                  lazyLoad={lazyLoadImages}
                  {...getPictureAssets({
                    bps: theme.bps,
                    imgData: item.image,
                    defaultImgOptions: {
                      sizes: [
                        { from: 'l', size: '314px', },
                        { from: 'm', size: '348px', },
                        { from: 's', size: '264px', },
                        { size: 'calc(50vw - 4.5rem)', },
                      ],
                      aspect: 'headline',
                      widths: [ 265, 315, 350, 600, ],
                    },
                    sources: [
                      {
                        aspect: 'landscape',
                        from: 'xl',
                        sizes: [ { size: '314px', }, ],
                        widths: [ 314, ],
                      },
                    ],
                  })}
                />
              ) : (
                <Image
                  lazyLoad={lazyLoadImages}
                  data={item.image}
                  imgOptions={getImageAssets({
                    bps: theme.bps,
                    aspect: 'headline',
                    sizes: [
                      { from: 'xl', size: '336px', },
                      { from: 'l', size: '314px', },
                      { from: 'm', size: '348px', },
                      { from: 's', size: '264px', },
                      { size: 'calc(50vw - 4.5rem)', },
                    ],
                    widths: [ 265, 315, 350, 600, ],
                  })}
                />
              )}
            </TeaserMedia>
            <TeaserContent
              isStacked={stackingSettings}
              data={item}
              padding={[
                { until: 's', value: [ 1, 1, 0, ], },
                { from: 's', until: 'xl', value: [ 1, 0, 0, ], },
                { from: 'xl', value: isStackedOnXl ? [ 1, 0, 0, ] : [ 0, 2, 0, 0, ], },
              ]}
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
              footerPadding={[
                { until: 'xl', value: 1, },
                { from: 'xl', value: [ 1, 0, ], },
                { from: 'xl', value: isStackedOnXl ? [ 1, 0, ] : [ 1, 2, 1, 0, ], },
              ]}
              renderContent={() => (
                <TeaserHeader
                  {...item}
                  typeScale={[
                    { until: 's', value: 0, },
                    { from: 's', until: 'l', value: 2, },
                    { from: 'l', value: 1, },
                  ]}
                  onClick={
                    biAction
                      ? () => biAction({
                        index: isSecondItem ? 1 : 0,
                        articleId: item.representedContent,
                      })
                      : null
                  }
                />
              )}
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
