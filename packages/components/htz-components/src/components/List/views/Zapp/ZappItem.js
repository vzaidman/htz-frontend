// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import CommentsCount from '../../../CommentsCount/CommentsCount';
import GridItem from '../../../Grid/GridItem';
import Picture from '../../../Image/Picture';
import Teaser from '../../../Teaser/Teaser';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserRank from '../../../TeaserRank/TeaserRank';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import getPictureAssets from '../../../../utils/getPictureAssets';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

type ZappItemProps = {
  data: TeaserDataType,
  lazyLoadImages: boolean,
  hideImageOnMobile: boolean,
  index: number,
  biAction: ListBiActionType,
};

ZappItem.defaultProps = {
  lazyLoadImages: true,
  hideImageOnMobile: false,
};

export default function ZappItem({
  data,
  lazyLoadImages,
  hideImageOnMobile,
  index,
  biAction,
}: ZappItemProps): React.Node {
  return (
    <Teaser
      data={data}
      onClick={() => biAction({ index, articleId: data.contentId, })}
      isStacked={[ { from: 'l', value: true, }, ]}
    >
      <TeaserMedia
        width={[
          { until: 's', value: 17, },
          { from: 's', until: 'l', value: 6 / 12, },
        ]}
        data={data}
        isStacked={[ { from: 'l', value: true, }, ]}
        miscStyles={{
          ...(hideImageOnMobile
            ? { display: [ { until: 's', value: 'none', }, ], }
            : {}),
        }}
      >
        <FelaTheme
          render={theme => (
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: data.image,
                defaultImgOptions: {
                  sizes: '102',
                  aspect: 'square',
                  widths: [ 102, 244, ],
                },
                sources: [
                  {
                    from: 's',
                    aspect: 'headline',
                    sizes: [
                      { from: 'xl', size: '295px', },
                      { from: 'l', size: '238px', },
                      { from: 'm', size: '348px', },
                      { from: 's', size: '264px', },
                    ],
                    widths: [ 500, 320, 295, 250, 238, ],
                  },
                ],
              })}
            />
          )}
        />
      </TeaserMedia>
      <TeaserContent
        data={data}
        padding={[
          { until: 's', value: hideImageOnMobile ? [ 2, 2, 0, 2, ] : [ 2, 1, 0, ], },
          { from: 's', until: 'l', value: [ 1, 2, 0, ], },
          { from: 'l', value: [ 1, 0, 0, ], },
        ]}
        footerPadding={[
          { until: 's', value: [ 1, hideImageOnMobile ? 2 : 1, 1, ], },
          { from: 's', value: [ 1, 1, 1, ], },
        ]}
        isStacked={[ { from: 'l', value: true, }, ]}
        gridItemMiscStyles={{
          display: [ { from: 's', until: 'l', value: 'block', }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            {...data}
            typeScale={[
              { until: 's', value: -1, },
              { from: 's', until: 'l', value: 1, },
              { from: 'l', value: 0, },
            ]}
            onClick={() => biAction({ index, articleId: data.contentId, })}
          />
        )}
        renderFooter={() => (
          <GridItem>
            <TeaserAuthors
              authors={data.authors}
              miscStyles={{
                fontWeight: 'bold',
              }}
            />
            {data.authors ? ' | ' : null}
            <TeaserTime {...data} />
            {data.commentsCounts ? ' ' : null}
            <CommentsCount commentsCount={data.commentsCounts} />
            {data.rank != null ? (
              <React.Fragment>
                {' '}
                <TeaserRank rank={data.rank} />
              </React.Fragment>
            ) : null}
          </GridItem>
        )}
        footerColor={[ 'neutral', '-3', ]}
        footerMiscStyles={{
          type: [
            { until: 's', value: -2, },
            { from: 's', until: 'xl', value: -2, },
            { from: 'xl', value: -3, },
          ],
        }}
      />
    </Teaser>
  );
}
