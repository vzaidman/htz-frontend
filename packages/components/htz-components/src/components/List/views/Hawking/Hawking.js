// @flow
import { imageInTeaser, clickTrackerBannersWrapper, dfpBanner, } from '@haaretz/app-utils';
import * as React from 'react';
import gql from 'graphql-tag';

import HawkingView from './HawkingView';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const HawkingQuery = gql`
  query HawkingQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      isLazyloadImages
      lazyloadDistance
      extraLinks {
        href
        contentName
        contentId
      }
      commercialLinks {
        href
        contentName
        contentId
      }
      marketingTeaser {
        title
        subtitle
        href
        cta
      }
      items {
        contentId
        title
        titleMobile
        exclusive
        exclusiveMobile
        path
        commentsCounts
        publishDate
        inputTemplate
        ...ImageInTeaser
        authors {
          contentName
        }
      }
      clickTrackers {
        ...ClickTrackerBannersWrapper
      }
      dfp {
        ...DfpBanner
      }
    }
  }
  ${imageInTeaser}
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Hawking(props: Props): React.Node {
  return (
    <ListDataGetter query={HawkingQuery} view="Hawking" {...props}>
      {dataProps => <HawkingView {...dataProps} />}
    </ListDataGetter>
  );
}
