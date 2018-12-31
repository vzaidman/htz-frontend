// @flow
import {
  imageInTeaser,
  clickTrackerBannersWrapper,
  dfpBanner,
} from '@haaretz/app-utils';
import * as React from 'react';
import gql from 'graphql-tag';

import DonbotView from './DonbotView';
import ListDataGetter from '../../ListDataGetter';

const DonbotQuery = gql`
  query DonbotQuery($listId: String!, $history: [ID]) {
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
          subtitle
          subtitleMobile
          exclusive
          exclusiveMobile
          path
          rank
          commentsCounts
          publishDate
          inputTemplate
          ...ImageInTeaser
          authors {
            contentName
          }
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

export default function Donbot({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={DonbotQuery}
      view="Donbot"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <DonbotView {...props} />}
    </ListDataGetter>
  );
}
