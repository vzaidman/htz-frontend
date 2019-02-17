// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForMom, } from '@haaretz/app-utils';
import MomView from './MomView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const MomQuery = gql`
  query MomQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      isLazyloadImages
      lazyloadDistance
      description
      url
      urlDescription
      items {
        ... on TeaserInList {
          ...TeaserForMom
        }
      }
    }
  }
  ${teaserForMom}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Mom(props: Props): React.Node {
  return (
    <ListDataGetter query={MomQuery} view="Mom" {...props}>
      {dataProps => <MomView {...dataProps} />}
    </ListDataGetter>
  );
}
