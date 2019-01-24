// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';

import TeaserFooter from './TeaserFooter';

import type { DisplayFlagsType, } from './TeaserFooter';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

type Props = {
  itemData: TeaserDataType,
  displayFlags: DisplayFlagsType,
  biAction: ?ListBiActionType,
};

VerticlaTeaser.defautlProps = { biAction: null, };

const headerType = [
  { until: 's', value: -1, },
  { from: 's', until: 'l', value: 1, },
  { from: 'l', value: 0, },
];

export default function VerticlaTeaser({
  itemData,
  lazyLoadImages,
  displayFlags,
  biAction,
}: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          onClick={
            biAction
              ? () => biAction({ index: 2, articleId: itemData.contentId, })
              : null
          }
          data={itemData}
        >
          <TeaserContent
            data={itemData}
            padding={[
              { until: 'l', value: [ 1, 2, 0, ], },
              { from: 'l', value: [ 1, 1, 0, ], },
            ]}
            footerPadding={[
              { until: 'l', value: [ 1, 2, ], },
              { from: 'l', value: [ 1, 1, ], },
            ]}
            footerMiscStyles={{ type: -3, color: theme.color('neutral', '-3'), }}
            renderContent={() => (
              <TeaserHeader
                {...itemData}
                typeScale={headerType}
                kickerTypeScale={headerType}
              />
            )}
            renderFooter={() => (
              <TeaserFooter data={itemData} displayFlags={displayFlags} />
            )}
          />
        </Teaser>
      )}
    />
  );
}
