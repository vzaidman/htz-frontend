// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, } from '@haaretz/app-utils';
import LeelaView from './LeelaView.js';
import ListDataGetter from '../../ListDataGetter';

const LeelaQuery = gql`
  query LeelaQuery($listId: String!, $history: [ID]) {
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

export default function Leela({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={LeelaQuery}
      view="Leela"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <LeelaView {...props} />}
    </ListDataGetter>
  );
}
