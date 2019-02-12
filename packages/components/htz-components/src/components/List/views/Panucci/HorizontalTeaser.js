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
  index: 3 | 4,
};

HorizontalTeaser.defaultProps = {
  lazyLoadImages: true,
  biAction: null,
};
export default function HorizontalTeaser({
  itemData,
  lazyLoadImages,
  displayFlags,
  biAction,
  index,
}: Props): React.Node {
  const headerType = [
    { until: 'xl', value: 0, },
    { from: 'xl', value: -1, },
  ];

  return (
    <FelaTheme
      render={theme => (
        <Teaser
          onClick={
            biAction ? () => biAction({ index, articleId: itemData.representedContent, }) : null
          }
          data={itemData}
        >
          <TeaserMedia
            data={itemData}
            width={[
              { until: 's', value: 19, },
              { from: 's', until: 'l', value: 1 / 2, },
              { from: 'l', until: 'xl', value: 2 / 5, },
              { from: 'xl', value: 1 / 2, },
            ]}
            onClick={
              biAction ? () => biAction({ index, articleId: itemData.representedContent, }) : null
            }
            miscStyles={{
              paddingInlineEnd: [ { until: 's', value: '1rem', }, { from: 's', value: '2rem', }, ],
            }}
          >
            <Picture
              lazyLoad={lazyLoadImages}
              {...getPictureAssets({
                bps: theme.bps,
                imgData: itemData.image,
                defaultImgOptions: {
                  sizes: '18rem',
                  aspect: 'square',
                  widths: [ 108, 216, ],
                },
                sources: [
                  {
                    from: 's',
                    aspect: 'regular',
                    sizes: [
                      { from: 'xl', size: '178px', },
                      { from: 'l', size: '146px', },
                      { from: 'm', size: '230px', },
                      { from: 's', size: '174px', },
                    ],
                    widths: [ 350, 230, 178, 146, 174, ],
                  },
                ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            data={itemData}
            padding={[ 1, 0, 0, 1, ]}
            footerPadding={[ 1, 0, 1, 1, ]}
            footerMiscStyles={{ type: -3, color: theme.color('neutral', '-3'), }}
            renderContent={() => (
              <TeaserHeader
                {...itemData}
                typeScale={headerType}
                kickerTypeScale={headerType}
                onClick={
                  biAction
                    ? () => biAction({ index, articleId: itemData.representedContent, })
                    : null
                }
              />
            )}
            renderFooter={() => <TeaserFooter data={itemData} displayFlags={displayFlags} />}
          />
        </Teaser>
      )}
    />
  );
}
