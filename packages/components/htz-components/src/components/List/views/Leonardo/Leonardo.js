// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import LeonardoView from './LeonardoView.js';
import ListDataGetter from '../../ListDataGetter';

import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const LeonardoQuery = gql`
  query LeonardoQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      isLazyloadImages
      lazyloadDistance
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
  lazyloadDistance?: number,
};

export default function Leonardo(props: Props): React.Node {
  return (
    <ListDataGetter query={LeonardoQuery} view="Leonardo" {...props}>
      {dataProps => <LeonardoView {...dataProps} />}
    </ListDataGetter>
  );
}
