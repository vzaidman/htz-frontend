// @flow
import React from 'react';

import type { ListBiActionType, } from '../../../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

import VerticalList from '../commonViews/VerticalList';

type Props = {
  list: ListDataType,
  listId: string,
  gaAction: () => void,
  biAction: ?ListBiActionType,
};

export default function Gamal(props: Props) {
  return (
    <VerticalList {...props} />
  );
}
