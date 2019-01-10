// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import { isTeaser, } from '../../../../utils/validateType.js';
import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import Picture from '../../../Image/Picture';
import getPictureAssets from '../../../../utils/getPictureAssets';

import TeaserFooter from './TeaserFooter';

import type { DisplayFlagsType, } from './TeaserFooter';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

type Props = {
  itemData: TeaserDataType,
  lazyLoadImages: boolean,
  displayFlags: DisplayFlagsType,
  biAction: ?ListBiActionType,
  index: 3 | 4,
};

HorizontalTeaser.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

const headerType = [ { until: 's', value: -1, }, { from: 's', value: 0, }, ];

export default function HorizontalTeaser({
  itemData,
  lazyLoadImages,
  displayFlags,
  biAction,
  index,
}: Props): React.Node {
  return isTeaser(itemData) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          onClick={biAction ? () => biAction({ index, articleId: itemData.contentId, }) : null}
          data={itemData}
        >
          <TeaserMedia
            data={itemData}
            width={[
              { until: 's', value: 17, },
              { from: 's', until: 'l', value: 28, },
              { from: 'l', until: 'xl', value: 25, },
              { from: 'xl', value: 30, },
            ]}
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: itemData.image,
                defaultImgOptions: {
                  sizes: '17rem',
                  aspect: 'square',
                  widths: [ 102, 204, ],
                },
                sources: [
                  {
                    from: 's',
                    aspect: 'regular',
                    sizes: [
                      { from: 'xl', size: '30rem', },
                      { from: 'l', size: '25rem', },
                      { from: 's', size: '28rem', },
                    ],
                    widths: [ 336, 210, 150, 168, ],
                  },
                ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={itemData}
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 2, 1, 1, ]}
            footerMiscStyles={{ type: -2, color: theme.color('neutral', '-3'), }}
            renderContent={() => (
              <TeaserHeader {...itemData} typeScale={headerType} kickerTypeScale={headerType} />
            )}
            renderFooter={() => <TeaserFooter data={itemData} displayFlags={displayFlags} />}
          />
        </Teaser>
      )}
    />
  ) : null;
}
