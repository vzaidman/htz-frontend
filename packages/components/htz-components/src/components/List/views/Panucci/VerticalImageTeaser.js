// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import Picture from '../../../Image/Picture';
import getPictureAssets from '../../../../utils/getPictureAssets';

import TeaserFooter from './TeaserFooter';

import type { DisplayFlagsType, } from './TeaserFooter';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

type Props = {
  itemData: TeaserDataType,
  lazyLoadImages: boolean,
  displayFlags: DisplayFlagsType,
  biAction: ?ListBiActionType,
};

VerticalImageTeaser.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
};
const headerType = [
  { until: 'xl', value: 0, },
  { from: 'xl', value: -1, },
];

export default function VerticalImageTeaser({
  itemData,
  lazyLoadImages,
  biAction,
  displayFlags,
}: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          onClick={biAction ? () => biAction({ index: 1, articleId: itemData.representedContent, }) : null}
          isStacked={[ { from: 's', value: true, }, ]}
        >
          <TeaserMedia
            data={itemData}
            width={[ { until: 's', value: 18, }, ]}
            isStacked={[ { from: 's', value: true, }, ]}
            onClick={biAction ? () => biAction({ index: 1, articleId: itemData.representedContent, }) : null}
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: itemData.image,
                defaultImgOptions: {
                  sizes: '108px',
                  aspect: 'square',
                  widths: [ 108, 216, ],
                },
                sources: [
                  {
                    from: 's',
                    aspect: 'regular',
                    sizes: [
                      { from: 'xl', size: '178px', },
                      { from: 'l', size: '226px', },
                      { from: 'm', size: '224px', },
                      { from: 's', size: '168px', },
                    ],
                    widths: [ 168, 180, 226, 336, 448, ],
                  },
                ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={itemData}
            padding={[ 1, 1, 0, ]}
            footerPadding={1}
            isStacked={[ { from: 's', value: true, }, ]}
            renderContent={() => (
              <TeaserHeader
                {...itemData}
                typeScale={headerType}
                kickerTypeScale={headerType}
                onClick={
                  biAction ? () => biAction({ index: 1, articleId: itemData.representedContent, }) : null
                }
              />
            )}
            footerMiscStyles={{ type: -3, color: theme.color('neutral', '-3'), }}
            renderFooter={() => <TeaserFooter data={itemData} displayFlags={displayFlags} />}
          />
        </Teaser>
      )}
    />
  );
}
