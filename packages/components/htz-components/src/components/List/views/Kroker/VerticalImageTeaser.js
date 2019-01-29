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
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

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
  { until: 's', value: 0, },
  { from: 's', until: 'xl', value: 0, },
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
          gutter={1}
          data={itemData}
          isStacked={[ { from: 's', value: true, }, ]}
          onClick={
            biAction
              ? () => biAction({ index: 1, articleId: itemData.representedContent, })
              : null
          }
          miscStyles={{
            borderBottom: [
              {
                from: 's',
                value: [ '1px', 1, 'solid', theme.color('neutral', '-6'), ],
              },
            ],
          }}
        >
          <TeaserMedia
            isStacked={[ { from: 's', value: true, }, ]}
            data={itemData}
            width={[ { until: 's', value: 19, }, ]}
            onClick={
              biAction
                ? () => biAction({
                  index: 1,
                  articleId: itemData.representedContent,
                })
                : null
            }
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...(itemData.image
                ? getPictureAssets({
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
                      aspect: 'headline',
                      sizes: [
                        { from: 'xl', size: '178px', },
                        { from: 'l', size: '143px', },
                        { from: 'm', size: '274px', },
                        { from: 's', size: '207px', },
                      ],
                      widths: [ 143, 178, 207, 274, 414, 548, ],
                    },
                  ],
                })
                : {})}
            />
          </TeaserMedia>
          <TeaserContent
            isStacked={[ { from: 's', value: true, }, ]}
            data={itemData}
            padding={[ 1, 0, 0, 1, ]}
            footerPadding={[ 1, 0, 0, 1, ]}
            renderContent={() => (
              <TeaserHeader
                {...itemData}
                typeScale={headerType}
                kickerTypeScale={headerType}
                onClick={
                  biAction
                    ? () => biAction({
                      index: 1,
                      articleId: itemData.representedContent,
                    })
                    : null
                }
              />
            )}
            footerMiscStyles={{ type: -3, color: theme.color('neutral', '-3'), }}
            renderFooter={() => (
              <TeaserFooter data={itemData} displayFlags={displayFlags} />
            )}
          />
        </Teaser>
      )}
    />
  );
}
