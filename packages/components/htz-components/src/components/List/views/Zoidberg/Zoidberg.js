// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { clickTrackerBannersWrapper, dfpBanner, teaserForLeftElement, } from '@haaretz/app-utils';
import ZoidbergView from './ZoidbergView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const ZoidbergQuery = gql`
  query ZoidbergQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      items {
        ...TeaserForLeftElement
      }
      clickTrackers {
        ...ClickTrackerBannersWrapper
      }
      dfp {
        ...DfpBanner
      }
    }
  }
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
  ${teaserForLeftElement}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Zoidberg(props: Props): React.Node {
  return (
    <ListDataGetter
      query={ZoidbergQuery}
      view="Zoidberg"
      {...props}
    >
      {dataProps => <ZoidbergView {...dataProps} />}
    </ListDataGetter>
  );
}
