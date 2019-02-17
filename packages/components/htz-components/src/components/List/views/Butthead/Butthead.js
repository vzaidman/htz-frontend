// @flow
import React from 'react';
import gql from 'graphql-tag';
import { dfpBanner, } from '@haaretz/app-utils';

import type { Node, } from 'react';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

import ButtheadView from './ButtheadView.js';
import ListDataGetter from '../../ListDataGetter';

const ButtheadQuery = gql`
  query ButtheadQuery($listId: String!, $history: [ID]) {
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
  lazyloadDistance?: number,
};

export default function Butthead(props: Props): Node {
  return (
    <ListDataGetter query={ButtheadQuery} view="Butthead" {...props}>
      {dataProps => <ButtheadView {...dataProps} />}
    </ListDataGetter>
  );
}
