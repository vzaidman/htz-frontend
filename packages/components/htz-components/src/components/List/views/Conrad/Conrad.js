// @flow
import * as React from 'react';
import ConradView from './ConradView.js';
import ListDataGetter from '../../ListDataGetter';
// Conrad and Wong use the exact same query
import { WongQuery as ConradQuery, } from '../Wong/Wong';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';

type Props = {
  updateListDuplication: Function,
  variables: {},
  listData: ListDataType,
  lazyloadDistance?: number,
};

export default function Conrad(props: Props): React.Node {
  return (
    <ListDataGetter query={ConradQuery} view="Conrad" {...props}>
      {dataProps => <ConradView {...dataProps} />}
    </ListDataGetter>
  );
}
