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
  { until: 's', value: 0, },
  { from: 's', until: 'xl', value: 0, },
  { from: 'xl', value: -1, },
];

export default function MainTeaser({
  itemData,
  lazyLoadImages,
  biAction,
}: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          isStacked
          miscStyles={{
            borderBottom: [
              {
                from: 's',
                value: [ '1px', 1, 'solid', theme.color('neutral', '-6'), ],
              },
            ],
          }}
          onClick={
            biAction
              ? () => biAction({ index: 0, articleId: itemData.representedContent, })
              : null
          }
        >
          <TeaserMedia
            data={itemData}
            isStacked
            onClick={
              biAction
                ? () => biAction({
                  index: 0,
                  articleId: itemData.representedContent,
                })
                : null
            }
          >
            <Image
              data={itemData.image}
              lazyLoad={lazyLoadImages}
              imgOptions={getImageAssets({
                bps: theme.bps,
                aspect: 'headline',
                sizes: [
                  { from: 'xl', size: '281px', },
                  { from: 'l', size: '226px', },
                  { from: 'm', size: '423px', },
                  { from: 's', size: '322px', },
                  { size: 'calc(100vw - 4rem)', },
                ],
                widths: [ 226, 281, 322, 390, 423, 600, ],
              })}
            />
          </TeaserMedia>
          <TeaserContent
            isStacked
            data={itemData}
            padding={[
              { until: 's', value: [ 1, 1, 0, ], },
              { from: 's', value: [ 1, 0, 0, ], },
            ]}
            footerPadding={[
              { until: 's', value: 1, },
              { from: 's', value: [ 1, 0, 0, ], },
            ]}
            renderContent={() => (
              <TeaserHeader
                {...itemData}
                typeScale={headerType}
                kickerTypeScale={headerType}
                onClick={
                  biAction
                    ? () => biAction({
                      index: 0,
                      articleId: itemData.representedContent,
                    })
                    : null
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
