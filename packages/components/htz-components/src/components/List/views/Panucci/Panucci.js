// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForPanucci, link, } from '@haaretz/app-utils';
import PanucciView from './PanucciView.js';
import ListDataGetter from '../../ListDataGetter';

const PanucciQuery = gql`
  query PanucciQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      extraLinks {
        ...Link
      }
      items {
        ... on TeaserInList {
          ...TeaserForPanucci
        }
      }
    }
  }
  ${teaserForPanucci}
  ${link}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Panucci({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={PanucciQuery}
      view="Panucci"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <PanucciView {...props} />}
    </ListDataGetter>
  );
}
