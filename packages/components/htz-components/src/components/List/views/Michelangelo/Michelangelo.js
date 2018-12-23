// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import MichelangeloView from './MichelangeloView.js';
import ListDataGetter from '../../ListDataGetter';

const MichelangeloQuery = gql`
  query MichelangeloQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
    }
  }
  ${clickTrackerBannersWrapper}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Michelangelo({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={MichelangeloQuery}
      view="Michelangelo"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <MichelangeloView {...props} />}
    </ListDataGetter>
  );
}
