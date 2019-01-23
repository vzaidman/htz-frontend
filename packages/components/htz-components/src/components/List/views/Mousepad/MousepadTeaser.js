// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

import CommentsCount from '../../../CommentsCount/CommentsCount';
import GridItem from '../../../Grid/GridItem';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserTime from '../../../TeaserTime/TeaserTime';

const headerType = [
  { until: 's', value: -1, },
  { from: 's', until: 'xl', value: 0, },
  { from: 'xl', value: -1, },
];

type Props = {
  biAction: ListBiActionType,
  itemData: TeaserDataType,
  index: number,
  hasBottomBorder: boolean,
  isLast: boolean,
};

export default function MousepadTeaser({
  itemData,
  index,
  biAction,
  hasBottomBorder,
  isLast,
}: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          miscStyles={{
            padding: [
              { until: 's', value: [ 0, 1, ], },
            ],
            borderBottom: [
              {
                until: 's',
                value: isLast
                  ? null
                  : [ '1px', 1, 'solid', theme.color('neutral', '-6'), ],
              },
              {
                from: 's',
                value: hasBottomBorder
                  ? [ '1px', 1, 'solid', theme.color('neutral', '-6'), ]
                  : null,
              },
            ],
            paddingTop: '1rem',
          }}
          onClick={() => biAction({ index, articleId: itemData.representedContent, })
          }
          gridMiscStyles={{ alignItems: 'center', }}
        >
          <GridItem
            width={6}
            miscStyles={{
              type: 9,
              color: theme.color('primary'),
              flexGrow: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 300,
            }}
          >
            {index}
          </GridItem>
          <TeaserContent
            padding={[
              { until: 's', value: [ 1, 3, 1, 2, ], },
              { from: 's', value: [ 1, 2, 0, ], },
            ]}
            footerPadding={[
              { until: 's', value: [ 0, 3, 0, 2, ], },
              { from: 's', value: [ 0, 2, ], },
            ]}
            footerMiscStyles={{
              marginTop: '0',
              type: [ { until: 'xl', value: -2, }, { from: 'xl', value: -3, }, ],
            }}
            data={itemData}
            renderContent={() => (
              <TeaserHeader
                {...itemData}
                typeScale={headerType}
                kickerTypeScale={headerType}
              />
            )}
            renderFooter={() => <CommentsCount commentsCount={itemData.commentsCounts} />}
          />
        </Teaser>
      )}
    />
  );
}
