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
            padding={[ 1, 2, 0, ]}
            footerPadding={[ 0, 2, 0, ]}
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
            renderFooter={() => (
              <React.Fragment>
                {itemData.publishDate || itemData.lastUpdate ? (
                  <TeaserTime {...itemData} />
                ) : null}
                {' '}
                <CommentsCount commentsCount={itemData.commentsCounts} />
              </React.Fragment>
            )}
          />
        </Teaser>
      )}
    />
  );
}
