// @flow
import React from 'react';
import gql from 'graphql-tag';
import { dfpBanner, } from '@haaretz/app-utils';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

import BeavisView from './BeavisView.js';
import ListDataGetter from '../../ListDataGetter';

const BeavisQuery = gql`
  query BeavisQuery($listId: String!, $history: [ID]) {
    list(listId: $listId, history: $history) {
      title
      dfp {
        ...DfpBanner
      }
    }
  }
  ${dfpBanner}
`;

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
};

export default function Beavis(props: Props): Node {
  return (
    <ListDataGetter query={BeavisQuery} view="Beavis" {...props}>
      {dataProps => <BeavisView {...dataProps} />}
    </ListDataGetter>
  );
}
