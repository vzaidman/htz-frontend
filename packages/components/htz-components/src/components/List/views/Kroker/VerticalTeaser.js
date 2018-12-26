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

const headerType = [
  { until: 's', value: -1, },
  { from: 's', until: 'xl', value: 0, },
  { from: 'xl', value: -1, },
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
          onClick={biAction ? () => biAction({ index: 2, articleId: itemData.contentId, }) : null}
          miscStyles={{
            borderBottom: [ { from: 's', value: [ '1px', 1, 'solid', theme.color('neutral', '-6'), ], }, ],
          }}
          data={itemData}
        >
          <TeaserContent
            data={itemData}
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 2, 1, 1, ]}
            footerMiscStyles={{ type: -3, color: theme.color('neutral', '-3'), }}
            renderContent={() => (
              <TeaserHeader {...itemData} typeScale={headerType} kickerTypeScale={headerType} />
            )}
            renderFooter={() => <TeaserFooter data={itemData} displayFlags={displayFlags} />}
          />
        </Teaser>
      )}
    />
  );
}
