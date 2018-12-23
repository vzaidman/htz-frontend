// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForGamal, clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import GamalView from './GamalView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';

const GamalQuery = gql`
  query GamalQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      urlDescription
      items {
        ... on TeaserInList {
          ...TeaserForGamal
        }
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
    }
  }
  ${teaserForGamal}
  ${clickTrackerBannersWrapper}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Gamal({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={GamalQuery}
      view="Gamal"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <GamalView {...props} />}
    </ListDataGetter>
  );
}
