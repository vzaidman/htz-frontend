// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import GridItem from '../../../Grid/GridItem';

import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import CommentsCount from '../../../CommentsCount/CommentsCount';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

const headerType = [ { until: 'xl', value: 0, }, { from: 'xl', value: -1, }, ];

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
            borderBottom: [
              {
                until: 's',
                value: isLast ? null : [ '1px', 1, 'solid', theme.color('neutral', '-6'), ],
              },
              {
                from: 's',
                value: hasBottomBorder ? [ '1px', 1, 'solid', theme.color('neutral', '-6'), ] : null,
              },
            ],
          }}
          onClick={() => biAction({ index, articleId: itemData.representedContent, })}
          gridMiscStyles={{ alignContent: 'stretch', }}
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
            padding={[ 1, 2, 0, ]}
            footerPadding={[ 0, 2, 0, ]}
            data={itemData}
            renderContent={() => (
              <TeaserHeader {...itemData} typeScale={headerType} kickerTypeScale={headerType} />
            )}
            renderFooter={() => (itemData.commentsCounts && itemData.commentsCounts > 1 ? (
              <CommentsCount
                commentsCount={itemData.commentsCounts}
                miscStyles={{
                  type: -2,
                }}
              />
            ) : null)
            }
          />
        </Teaser>
      )}
    />
  );
}
