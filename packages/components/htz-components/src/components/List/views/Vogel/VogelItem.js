// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';
import Image from '../../../Image/Image';
import getImageAssets from '../../../../utils/getImageAssets';
import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

type VogelItemPropTypes = {
  data: TeaserDataType,
  lazyLoadImages: boolean,
  hideImage: boolean,
  hideImageOnMobile: boolean,
  hideSeparator: boolean,
  hideSeparatorOnMobile: boolean,
  hideOnMobile: boolean,
  index: number,
  biAction: ListBiActionType,
};

VogelItem.defaultProps = {
  hideImage: false,
  hideImageOnMobile: false,
  hideSeparator: false,
  hideSeparatorOnMobile: false,
  hideOnMobile: false,
  lazyLoadImages: false,
  biAction: null,
};

function VogelItem({
  data,
  lazyLoadImages,
  hideImage,
  hideImageOnMobile,
  hideSeparator,
  hideSeparatorOnMobile,
  hideOnMobile,
  index,
  biAction,
}: VogelItemPropTypes): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          fillHeight={false}
          data={data}
          onClick={
            biAction
              ? () => biAction({ index, articleId: data.representedContent || data.contentId, })
              : null
          }
          miscStyles={{
            ...(hideOnMobile ? { display: [ { until: 's', value: 'none', }, ], } : {}),
            flexGrow: '1',
            flexShrink: '0',
          }}
          gridMiscStyles={hideImage ? { alignContent: 'stretch', flexDirection: 'column', } : null}
          isStacked={!hideImage}
        >
          {hideImage === false ? (
            <TeaserMedia
              data={data}
              width={1}
              miscStyles={{
                ...(hideImageOnMobile ? { display: [ { until: 's', value: 'none', }, ], } : {}),
              }}
              onClick={
                biAction
                  ? () => biAction({ index, articleId: data.representedContent || data.contentId, })
                  : null
              }
              isStacked
            >
              <Image
                lazyLoad={lazyLoadImages}
                data={data.image}
                imgOptions={getImageAssets({
                  aspect: 'headline',
                  bps: theme.bps,
                  sizes: [
                    { from: 'xl', size: '218px', },
                    { from: 'l', size: '238px', },
                    { from: 'm', size: '240px', },
                    { from: 's', size: '184px', },
                  ],
                  widths: [ 230, 460, 184, 368, 156, 302, ],
                })}
              />
            </TeaserMedia>
          ) : null}
          <TeaserContent
            data={data}
            padding={[ { until: 's', value: [ 2, 0, ], }, { from: 's', value: [ 1, 0, ], }, ]}
            isStacked={!hideImage}
            gridItemMiscStyles={{
              ...(hideImage ? { flexBasis: 'auto', flexGrow: '1', } : null),
              paddingInlineEnd: '1rem',
              paddingInlineStart: '1rem',
            }}
            miscStyles={{
              flexGrow: 1,
              ...(hideSeparator
                ? {}
                : {
                  borderBottom: hideSeparatorOnMobile
                    ? [ { from: 's', value: [ '1px', 1, 'solid', theme.color('neutral', '-5'), ], }, ]
                    : [ '1px', 1, 'solid', theme.color('neutral', '-5'), ],
                }),
            }}
            renderContent={teaserData => (
              <TeaserHeader
                {...teaserData}
                typeScale={[
                  { until: 's', value: 0, },
                  { from: 's', until: 'xl', value: -1, },
                  { from: 'xl', value: -2, },
                ]}
                kickerTypeScale={[
                  { until: 's', value: 0, },
                  { from: 's', until: 'xl', value: -1, },
                  { from: 'xl', value: -2, },
                ]}
                miscStyles={{ fontWeight: 'normal', }}
                onClick={
                  biAction
                    ? () => biAction({ index, articleId: data.representedContent || data.contentId, })
                    : null
                }
              />
            )}
          />
        </Teaser>
      )}
    />
  );
}

export default VogelItem;
