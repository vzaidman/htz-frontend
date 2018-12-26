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

import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

type Props = {
  itemData: TeaserDataType,
  lazyLoadImages: boolean,
  biAction: ?ListBiActionType,
};

MainTeaser.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
};

const headerType = [
  { until: 's', value: -1, },
  { from: 's', until: 'xl', value: 0, },
  { from: 'xl', value: -1, },
];

export default function MainTeaser({ itemData, lazyLoadImages, biAction, }: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          gridMiscStyles={{ flexDirection: 'column', }}
          miscStyles={{
            borderBottom: [ { from: 's', value: [ '1px', 1, 'solid', theme.color('neutral', '-6'), ], }, ],
          }}
          onClick={biAction ? () => biAction({ index: 0, articleId: itemData.contentId, }) : null}
        >
          <TeaserMedia data={itemData}>
            <Image
              data={itemData.image}
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                sizes: [
                  { from: 'xl', size: '295px', },
                  { from: 'l', size: '238px', },
                  { from: 'm', size: '372px', },
                  { from: 's', size: '288px', },
                  { size: 'calc(100vw - 4rem)', },
                ],
                widths: [ 238, 288, 295, 372, 744, ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={itemData}
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 2, 1, 1, ]}
            gridItemMiscStyles={{ flexBasis: 'auto', }}
            renderContent={() => (
              <TeaserHeader {...itemData} typeScale={headerType} kickerTypeScale={headerType} />
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
