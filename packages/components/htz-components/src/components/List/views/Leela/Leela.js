// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import LeelaView from './LeelaView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const LeelaQuery = gql`
  query LeelaQuery($listId: String!, $history: [ID], $section: String) {
    list(listId: $listId, history: $history, section: $section) {
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

export default function Leela(props: Props): React.Node {
  return (
    <ListDataGetter query={LeelaQuery} view="Leela" {...props}>
      {dataProps => <LeelaView {...dataProps} />}
    </ListDataGetter>
  );
}
