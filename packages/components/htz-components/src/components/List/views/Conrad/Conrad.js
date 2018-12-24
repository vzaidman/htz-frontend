// @flow
import * as React from 'react';
import ConradView from './ConradView.js';
import ListDataGetter from '../../ListDataGetter';
// Conrad and Wong use the exact same query
import { WongQuery as ConradQuery, } from '../Wong/Wong';

type Props = {
  contentId: string,
  updateListDuplication: Function,
  variables: {},
  lazyLoadImages: boolean,
  viewProps: Object,
};

export default function Conrad({
  contentId,
  updateListDuplication,
  variables,
  lazyLoadImages,
  viewProps,
}: Props): React.Node {
  return (
    <ListDataGetter
      query={ConradQuery}
      view="Conrad"
      {...{
        contentId,
        updateListDuplication,
        variables,
        lazyLoadImages,
        viewProps,
      }}
    >
      {props => <ConradView {...props} />}
    </ListDataGetter>
  );
}
