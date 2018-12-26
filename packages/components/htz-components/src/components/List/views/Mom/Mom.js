// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, dfpBanner, teaserForMom, } from '@haaretz/app-utils';
import MomView from './MomView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const MomQuery = gql`
  query MomQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
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
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${teaserForMom}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Mom(props: Props): React.Node {
  return (
    <ListDataGetter query={MomQuery} view="Mom" {...props}>
      {dataProps => <MomView {...dataProps} />}
    </ListDataGetter>
  );
}
