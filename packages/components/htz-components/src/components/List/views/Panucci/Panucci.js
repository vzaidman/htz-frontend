// @flow
import * as React from 'react';
import gql from 'graphql-tag';
import { teaserForPanucci, link, } from '@haaretz/app-utils';
import PanucciView from './PanucciView.js';
import ListDataGetter from '../../ListDataGetter';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

const PanucciQuery = gql`
  query PanucciQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      url
      extraLinks {
        ...Link
      }
      items {
        ...TeaserForPanucci
      }
    }
  }
  breakingNewsBox(cid: "Haaretz.Element.BreakingNewsBoxElement") {
    contentId
    items {
      title
    }
  }
  ${teaserForPanucci}
  ${link}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Panucci(props: Props): React.Node {
  return (
    <ListDataGetter query={PanucciQuery} view="Panucci" {...props}>
      {dataProps => <PanucciView {...dataProps} />}
    </ListDataGetter>
  );
}
