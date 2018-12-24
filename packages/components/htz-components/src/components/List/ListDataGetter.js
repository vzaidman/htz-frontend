// @flow
import * as React from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import Query from '../ApolloBoundary/Query';
import EventTracker from '../../utils/EventTracker';
import type { ListBiActionType, } from '../../flowTypes/ListBiActionType';

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
  contentId: string,
  query: DocumentNode,
  updateListDuplication: Function,
  variables: {},
  view: string,
  viewProps?: Object,
  lazyLoadImages: boolean,
};

ListDataGetter.defaultProps = {
  viewProps: {},
};
export default function ListDataGetter({
  children,
  contentId,
  query,
  updateListDuplication,
  variables,
  view,
  viewProps,
  lazyLoadImages,
}: ListDataGetterProps): React.Node {
  return (
    <Query query={query} variables={variables}>
      {({ data, loading, error, }) => {
        if (loading) return null;
        if (error) return null;
        const { title, items, ...restList } = data.list;
        updateListDuplication(items);
        return (
          <EventTracker>
            {({ biAction, gaAction, HtzReactGA, }) => {
              HtzReactGA.ga('ec:addImpression', {
                id: contentId,
                name: title,
                list: 'List impressions',
              });
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
