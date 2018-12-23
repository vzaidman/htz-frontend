// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, dfpBanner, teaserForLeftElement, } from '@haaretz/app-utils';
import ZoidbergView from './ZoidbergView.js';
import ListDataGetter from '../../ListDataGetter';

const ZoidbergQuery = gql`
  query ZoidbergQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ... on TeaserInList {
          ...TeaserForLeftElement
        }
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
        ... on DfpBanner {
          ...DfpBanner
        }
      }
    }
  }
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${teaserForLeftElement}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Zoidberg({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={ZoidbergQuery}
      view="Zoidberg"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <ZoidbergView {...props} />}
    </ListDataGetter>
  );
}
