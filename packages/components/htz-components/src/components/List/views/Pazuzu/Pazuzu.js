// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, } from '@haaretz/app-utils';
import PazuzuView from './PazuzuView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const PazuzuQuery = gql`
  query PazuzuQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          inputTemplate
          rank
          commentsCounts
          contentId
          title
          titleMobile
          path
          publishDate
          lastUpdate
          authors {
            contentName
          }
          image {
            ...Image
          }
        }
      }
    }
  }
  ${image}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Pazuzu(props: Props): React.Node {
  return (
    <ListDataGetter query={PazuzuQuery} view="Pazuzu" {...props}>
      {dataProps => <PazuzuView {...dataProps} />}
    </ListDataGetter>
  );
}
