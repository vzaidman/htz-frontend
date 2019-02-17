// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForBender, } from '@haaretz/app-utils';
import BenderView from './BenderView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const BenderQuery = gql`
  query BenderQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      isLazyloadImages
      lazyloadDistance
      title
      items {
        ... on TeaserInList {
          ...TeaserForBender
        }
      }
    }
  }
  ${teaserForBender}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Bender(props: Props): React.Node {
  return (
    <ListDataGetter query={BenderQuery} view="Bender" {...props}>
      {dataProps => <BenderView {...dataProps} />}
    </ListDataGetter>
  );
}
