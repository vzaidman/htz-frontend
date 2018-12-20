// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';

import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';

import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import CommentsCount from '../../../CommentsCount/CommentsCount';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';

const headerType = [ { until: 'l', value: -1, }, { from: 'l', value: 0, }, ];

type Props = {
  biAction: ListBiActionType,
  itemData: TeaserDataType,
  index: number,
};

export default function MousepadTeaser({ itemData, index, biAction, }: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <Teaser
          data={itemData}
          miscStyles={{ borderBottom: [ '1px', 1, 'solid', theme.color('neutral', '-5'), ], }}
          onClick={() => biAction({ index, articleId: itemData.representedContent, })}
        >
          <GridItem
            width={6}
            miscStyles={{
              type: 9,
              color: theme.color('primary'),
              textAlign: 'center',
              flexGrow: 0,
              paddingTop: '1rem',
            }}
          >
            {index}
          </GridItem>
          <TeaserContent
            data={itemData}
            renderContent={data => (
              <TeaserHeader {...data} typeScale={headerType} kickerTypeScale={headerType} />
            )}
            renderFooter={data => (data.commentsCounts && data.commentsCounts > 1 ? (
              <CommentsCount
                commentsCount={data.commentsCounts}
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
