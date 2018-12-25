// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { image, link, } from '@haaretz/app-utils';
import CalculonView from './CalculonView.js';
import ListDataGetter from '../../ListDataGetter';

const CalculonQuery = gql`
  query CalculonQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      commercialLinks {
        ...Link
      }
      extraLinks {
        ...Link
      }
      # marketingTeaser
      title
      url
      items {
        ... on TeaserInList {
          commentsCounts
          contentId
          exclusive
          exclusiveMobile
          inputTemplate
          lastUpdate
          path
          publishDate
          title
          titleMobile
          rank
          representedContent
          authors {
            contentName
          }
          image {
            ...Image
          }
        }
      }
    }
  }
  ${image}
  ${link}
`;

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
};

export default function Calculon({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={CalculonQuery}
      view="Calculon"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
      }}
    >
      {props => <CalculonView {...props} />}
    </ListDataGetter>
  );
}
