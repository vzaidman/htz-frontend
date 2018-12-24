// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, embed, imageGallery, } from '@haaretz/app-utils';
import WongView from './WongView.js';
import ListDataGetter from '../../ListDataGetter';

export const WongQuery = gql`
  query WongQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          inputTemplate
          commentsCounts
          contentId
          title
          titleMobile
          subtitle
          subtitleMobile
          exclusive
          exclusiveMobile
          path
          publishDate
          lastUpdate
          relatedArticles {
            title
            path
            contentId
          }
          authors {
            contentName
          }
          media {
            ... on Image {
              ...Image
            }
            ... on Embed {
              ...Embed
            }
            ... on ImageGallery {
              ...ImageGallery
            }
          }
        }
      }
    }
  }
  ${embed}
  ${image}
  ${imageGallery}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
  viewProps: Object,
};

export default function Wong({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
  viewProps,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={WongQuery}
      view="Wong"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
        viewProps,
      }}
    >
      {props => <WongView {...props} />}
    </ListDataGetter>
  );
}
