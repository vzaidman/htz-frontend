// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForGamal, clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import GamalView from './GamalView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const GamalQuery = gql`
  query GamalQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      urlDescription
      items {
        ...TeaserForGamal
      }
      clickTrackers{
        ...ClickTrackerBannersWrapper
      }
    }
  }
  ${teaserForGamal}
  ${clickTrackerBannersWrapper}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Gamal(props: Props): React.Node {
  return (
    <ListDataGetter query={GamalQuery} view="Gamal" {...props}>
      {dataProps => <GamalView {...dataProps} />}
    </ListDataGetter>
  );
}
