// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import { isTeaser, } from '../../utils/validateTeaser.js';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';

import TeaserFooter from './TeaserFooter';

import type { DisplayFlagsType, } from './TeaserFooter';
import type { ListItemType, } from '../../../../flowTypes/ListDataType';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

type Props = {
  itemData: ListItemType,
  displayFlags: DisplayFlagsType,
  biAction: ?ListBiActionType,
};

VerticlaTeaser.defautlProps = { biAction: null, };

const headerType = [ { until: 's', value: -1, }, { from: 's', value: 0, }, ];

export default function VerticlaTeaser({
  itemData,
  lazyLoadImages,
  displayFlags,
  biAction,
}: Props): React.Node {
  return isTeaser(itemData) ? (
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
            padding={[ 1, 1, 0, ]}
            footerPadding={[ 2, 1, 1, ]}
            footerMiscStyles={{ type: -2, color: theme.color('neutral', '-3'), }}
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
  ) : null;
}
