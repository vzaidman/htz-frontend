// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, } from '@haaretz/app-utils';
import ListDataGetter from '../../ListDataGetter';
import VogelView from './VogelView';

const VogelQuery = gql`
  query VogelQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title

      items {
        ... on TeaserInList {
          inputTemplate
          contentId
          title
          titleMobile
          exclusive
          exclusiveMobile
          path
          image {
            ...Image
          }
        }
      }
    }
  }
  ${image}
`;


type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};


export default function Vogel({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={VogelQuery}
      view="Vogel"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => (<VogelView {...props} />)}
    </ListDataGetter>
  );
}
