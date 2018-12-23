// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { imageInTeaser, imageGallery, image, } from '@haaretz/app-utils';
import SlimView from './SlimView.js';
import ListDataGetter from '../../ListDataGetter';

const SlimQuery = gql`
  query SlimQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      items {
        ... on TeaserInList {
          ...ImageInTeaser
          media {
            ... on ImageGallery {
              ...ImageGallery
            }
          }
          contentId
          title
          path
          titleMobile
          inputTemplate
        }
      }
    }
  }
  ${imageInTeaser}
  ${image}
  ${imageGallery}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Slim({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={SlimQuery}
      view="Slim"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <SlimView {...props} />}
    </ListDataGetter>
  );
}
