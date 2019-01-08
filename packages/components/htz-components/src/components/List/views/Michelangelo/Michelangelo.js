// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import MichelangeloView from './MichelangeloView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const MichelangeloQuery = gql`
  query MichelangeloQuery($listId: String!, $history: [ID]) {
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

export default function Michelangelo(props: Props): React.Node {
  return (
    <ListDataGetter query={MichelangeloQuery} view="Michelangelo" {...props}>
      {dataProps => <MichelangeloView {...dataProps} />}
    </ListDataGetter>
  );
}
