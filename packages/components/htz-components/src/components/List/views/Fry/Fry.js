// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForLeftElement, } from '@haaretz/app-utils';
import FryView from './FryView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const FryQuery = gql`
  query FryQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForLeftElement
        }
      }
    }
  }
  ${teaserForLeftElement}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Fry(props: Props): React.Node {
  return (
    <ListDataGetter query={FryQuery} view="Fry" {...props}>
      {dataProps => <FryView {...dataProps} />}
    </ListDataGetter>
  );
}
