// @flow

import type { ListItemType, } from '../../../flowTypes/ListDataType';

export default function (
  items: Array<ListItemType>,
  fieldName: string,
  fieldValue: string
): Array<ListItemType> {
  return items.filter(item => (item[fieldName] === fieldValue));
}
