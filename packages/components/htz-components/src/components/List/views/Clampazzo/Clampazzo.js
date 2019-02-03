// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForClampazzo, } from '@haaretz/app-utils';
import ClampazzoView from './ClampazzoView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const ClampazzoQuery = gql`
  query BenderQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForClampazzo
        }
      }
    }
  }
  ${teaserForClampazzo}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Clampazzo(props: Props): React.Node {
  return (
    <ListDataGetter query={ClampazzoQuery} view="Clampazzo" {...props}>
      {dataProps => <ClampazzoView {...dataProps} />}
    </ListDataGetter>
  );
}
