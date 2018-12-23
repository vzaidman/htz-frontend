// @flow
import {
  imageInTeaser,
  clickTrackerBannersWrapper,
  dfpBanner,
} from '@haaretz/app-utils';
import * as React from 'react';
import gql from 'graphql-tag';

import HawkingView from './HawkingView';
import ListDataGetter from '../../ListDataGetter';

const HawkingQuery = gql`
  query HawkingQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      extraLinks {
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
        ... on TeaserInList {
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
      }
      clickTrackers: items {
        ... on ClickTrackerBannersWrapper {
          ...ClickTrackerBannersWrapper
        }
      }
      dfp: items {
        ... on DfpBanner {
          ...DfpBanner
        }
      }
    }
  }
  ${imageInTeaser}
  ${clickTrackerBannersWrapper}
  ${dfpBanner}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Hawking({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={HawkingQuery}
      view="Hawking"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <HawkingView {...props} />}
    </ListDataGetter>
  );
}
