// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, embed, imageGallery, } from '@haaretz/app-utils';
import WongView from './WongView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

export const WongQuery = gql`
  query WongQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      isLazyloadImages
      lazyloadDistance
      items {
        ... on TeaserInList {
          inputTemplate
          commentsCounts
          contentId
          representedContent
          representedContentType
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
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  viewProps: Object,
  lazyloadDistance?: number,
};

export default function Wong(props: Props): React.Node {
  return (
    <ListDataGetter query={WongQuery} view="Wong" {...props}>
      {dataProps => <WongView {...dataProps} />}
    </ListDataGetter>
  );
}
