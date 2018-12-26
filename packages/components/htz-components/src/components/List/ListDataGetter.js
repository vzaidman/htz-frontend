// @flow
import * as React from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import Query from '../ApolloBoundary/Query';
import EventTracker from '../../utils/EventTracker';
import type { ListBiActionType, } from '../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../flowTypes/ListDataType';

type ListComponentProps = {
  // generalized this to avoid complexity of dfp/teaser/clicktracker
  list: Object,
  listId: string,
  gaAction: () => void,
  biAction: ListBiActionType,
  lazyLoadImages: boolean,
};
export type ListDataGetterProps = {
  children: ListComponentProps => React.Node,
  query: DocumentNode,
  updateListDuplication: Function,
  variables: {},
  view: string,
  viewProps?: Object,
  listData: ListDataType,
};

ListDataGetter.defaultProps = {
  viewProps: {},
};

export default function ListDataGetter({
  children,
  query,
  updateListDuplication,
  variables,
  view,
  viewProps,
  listData,
}: ListDataGetterProps): React.Node {
  const isSsr = listData && listData.loadPriority === 'ssr';
  return (
    <Query query={query} variables={variables} skip={isSsr}>
      {({ data, loading, error, }) => {
        if (loading) return null;
        if (error) return null;
        const { title, items, lazyLoadImages, contentId, ...restList } = isSsr
          ? listData
          : data.list;
        updateListDuplication(items);
        return (
          <EventTracker>
            {({ biAction, gaAction, HtzReactGA, }) => {
              const clickAction = ({ index, articleId, }) => biAction({
                actionCode: 109,
                additionalInfo: {
                  ArticleId: articleId,
                  ListId: contentId,
                  NoInList: index + 1,
                  ViewName: view,
                },
              });
              return children({
                list: { items, title, ...restList, },
                listId: contentId,
                gaAction,
                biAction: clickAction,
                lazyLoadImages,
                ...viewProps,
              });
            }}
          </EventTracker>
        );
      }}
    </Query>
  );
}
