// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, dfpBanner, teaserForMom, } from '@haaretz/app-utils';
import MomView from './MomView.js';
import ListDataGetter from '../../ListDataGetter';

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
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Mom({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={MomQuery}
      view="Mom"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <MomView {...props} />}
    </ListDataGetter>
  );
}
