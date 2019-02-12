// @flow
import { FelaTheme, } from 'react-fela';
import * as React from 'react';

import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import Image from '../../../Image/Image';

import getImageAssets from '../../../../utils/getImageAssets';

import TeaserFooter from './TeaserFooter';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

type Props = {
  itemData: TeaserDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
};

MainTeaser.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

const headerType = [ { until: 'xl', value: 1, }, { from: 'xl', value: 0, }, ];

export default function MainTeaser({ itemData, lazyLoadImages, biAction, }: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          onClick={biAction ? () => biAction({ index: 0, articleId: itemData.representedContent, }) : null}
          isStacked
        >
          <TeaserMedia
            data={itemData}
            onClick={biAction ? () => biAction({ index: 0, articleId: itemData.representedContent, }) : null}
            isStacked
          >
            <Image
              data={itemData.image}
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                sizes: [
                  { from: 'xl', size: '384px', },
                  { from: 'l', size: '393px', },
                  { from: 'm', size: '472px', },
                  { from: 's', size: '360px', },
                  { size: 'calc(100vw - 4rem)', },
                ],
                widths: [ 360, 384, 393, 472, 575, 720, ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={itemData}
            padding={[
              { until: 's', value: [ 1, 1, 0, ], },
              { from: 's', value: [ 1, 2, 0, ], },
            ]}
            footerPadding={[
              { until: 's', value: 1, },
              { from: 's', value: [ 1, 2, ], },
            ]}
            isStacked
            renderContent={() => (
              <TeaserHeader
                {...itemData}
                typeScale={headerType}
                kickerTypeScale={headerType}
                onClick={
                  biAction ? () => biAction({ index: 0, articleId: itemData.representedContent, }) : null
                }
              />
            )}
            footerMiscStyles={{ type: -3, color: theme.color('neutral', '-3'), }}
            renderFooter={() => (
              <TeaserFooter
                data={itemData}
                displayFlags={{
                  authors: true,
                  publishDate: true,
                  commentsCount: true,
                }}
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}
