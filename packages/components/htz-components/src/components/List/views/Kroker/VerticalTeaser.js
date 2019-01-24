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

VerticlaTeaser.defautlProps = { biAction: null, isLast: false, };
export default function VerticlaTeaser({
  itemData,
  lazyLoadImages,
  displayFlags,
  biAction,
}: Props): React.Node {
  const headerType = [
    { until: 's', value: -1, },
    { from: 's', until: 'l', value: 0, },
    { from: 'l', value: -1, },
  ];
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          onClick={
            biAction
              ? () => biAction({ index: 2, articleId: itemData.contentId, })
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
          data={itemData}
        >
          <TeaserContent
            data={itemData}
            footerMiscStyles={{ type: -3, color: theme.color('neutral', '-3'), }}
            padding={[
              { until: 's', value: [ 1, 2, 0, ], },
              { from: 's', value: 0, },
            ]}
            footerPadding={[
              { until: 's', value: [ 1, 2, ], },
              { from: 's', value: [ 1, 0, 0, ], },
            ]}
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
