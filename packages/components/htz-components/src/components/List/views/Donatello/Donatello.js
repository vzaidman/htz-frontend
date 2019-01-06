// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import DonatelloView from './DonatelloView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const DonatelloQuery = gql`
  query DonatelloQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      clickTrackers {
        ...ClickTrackerBannersWrapper
      }
    }
  }
  ${clickTrackerBannersWrapper}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Donatello(props: Props): React.Node {
  return (
    <ListDataGetter query={DonatelloQuery} view="Donatello" {...props}>
      {dataProps => <DonatelloView {...dataProps} />}
    </ListDataGetter>
  );
}
