// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import { isTeaser, } from '../../utils/validateTeaser';
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
import type { ListItemType, } from '../../../../flowTypes/ListDataType';

type ZappItemProps = {
  data: ListItemType,
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
  return isTeaser(data) ? (
    <Teaser
      data={data}
      onClick={() => biAction({ index, articleId: data.contentId, })}
    >
      {data.image ? (
        <TeaserMedia
          width={[
            { until: 's', value: 4 / 12, },
            { from: 's', until: 'l', value: 5 / 12, },
            { from: 'l', value: 1, },
          ]}
          data={data}
          {...(hideImageOnMobile
            ? {
              miscStyles: {
                display: [ { until: 's', value: 'none', }, ],
              },
            }
            : {})}
        >
          <FelaTheme
            render={theme => (data.image ? (
            // checking data.image again so flow would not cry out
              <Picture
                lazyLoad={lazyLoadImages}
                {...getPictureAssets({
                  bps: theme.bps,
                  imgData: data.image,
                  defaultImgOptions: {
                    sizes: '122',
                    aspect: 'square',
                    widths: [ 122, 244, ],
                  },
                  sources: [
                    {
                      from: 's',
                      aspect: 'headline',
                      sizes: [
                        { from: 'xl', size: '295px', },
                        { from: 'l', size: '238px', },
                        { from: 'm', size: '320px', },
                        { from: 's', size: '250px', },
                      ],
                      widths: [ 500, 320, 295, 250, 238, ],
                    },
                  ],
                })}
              />
            ) : null)
            }
          />
        </TeaserMedia>
      ) : null}
      <TeaserContent
        data={data}
        padding={[ 1, 1, 1, ]}
        footerPadding={[ 1, 1, 1, ]}
        gridItemMiscStyles={{
          display: [ { from: 's', until: 'l', value: 'block', }, ],
          flexBasis: [ { from: 'l', value: 'auto', }, ],
        }}
        renderContent={() => (
          <TeaserHeader
            {...data}
            typeScale={[
              { until: 's', value: -1, },
              { from: 's', until: 'xl', value: 1, },
              { from: 'xl', value: 0, },
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
            {data.rank != null ? (
              <React.Fragment>
                {' '}
                <TeaserRank rank={data.rank} />
              </React.Fragment>
            ) : null}
            {data.commentsCounts ? ' ' : null}
            <CommentsCount commentsCount={data.commentsCounts} />
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
  ) : null;
}
