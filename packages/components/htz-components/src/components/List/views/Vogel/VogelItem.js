// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';
import Image from '../../../Image/Image';
import getImageAssets from '../../../../utils/getImageAssets';
import Teaser from '../../../Teaser/Teaser';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import { isTeaser, } from '../../../../utils/validateType';

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
  return isTeaser(data) ? (
    <FelaTheme
      render={theme => (
        <Teaser
          data={data}
          miscStyles={{
            ...(hideOnMobile
              ? { display: [ { until: 's', value: 'none', }, ], }
              : {}),
            flexGrow: '1',
            flexShrink: '0',
          }}
          gridMiscStyles={{ flexDirection: 'column', }}
          onClick={() => biAction({ index, articleId: data.contentId, })}
        >
          {hideImage === false && data.image ? (
            <TeaserMedia
              width={1}
              data={data}
              miscStyles={{
                flexShrink: '0',
                flexGrow: '0',
                width: '100%',
                ...(hideImageOnMobile
                  ? { display: [ { until: 's', value: 'none', }, ], }
                  : {}),
              }}
            >
              {data.image ? (
                <Image
                  data={data.image}
                  imgOptions={getImageAssets({
                    bps: theme.bps,
                    aspect: 'headline',
                    widths: [ 230, 460, 184, 368, 156, 302, ],
                    sizes: [
                      { from: 'xl', size: '218px', },
                      { from: 'l', size: '238px', },
                      { from: 'm', size: '240px', },
                      { from: 's', size: '184px', },
                    ],
                  })}
                  lazyLoad={lazyLoadImages}
                />
              ) : null}
            </TeaserMedia>
          ) : null}
          <TeaserContent
            data={data}
            padding={
              hideSeparator
                ? 1
                : hideSeparatorOnMobile
                  ? [ { until: 's', value: 1, }, { from: 's', value: [ 1, 1, 0, ], }, ]
                  : [ 1, 1, 0, ]
            }
            gridItemMiscStyles={{
              flexBasis: 'auto',
              flexGrow: 1,
            }}
            miscStyles={{
              flexGrow: 1,
              ...(hideSeparator
                ? {}
                : {
                  borderBottom: hideSeparatorOnMobile
                    ? [
                      {
                        from: 's',
                        value: [
                          '1px',
                          1,
                          'solid',
                          theme.color('neutral', '-5'),
                        ],
                      },
                    ]
                    : [ '1px', 1, 'solid', theme.color('neutral', '-5'), ],
                }),
            }}
            renderContent={teaserData => (
              <TeaserHeader
                {...teaserData}
                typeScale={-1}
                kickerTypeScale={-1}
                miscStyles={{ fontWeight: 'normal', }}
                onClick={() => biAction({ index, articleId: data.contentId, })}
              />
            )}
          />
        </Teaser>
      )}
    />
  ) : null;
}

export default VogelItem;
