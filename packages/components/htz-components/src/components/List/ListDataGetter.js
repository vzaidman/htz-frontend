// @flow
import * as React from 'react';
import type { DocumentNode, } from 'graphql/language/ast';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';
import EventTracker from '../../utils/EventTracker';
import type { ListBiActionType, } from '../../flowTypes/ListBiActionType';
import type { ListDataType, } from '../../flowTypes/ListDataType';

const GET_SECTION: DocumentNode = gql`
  query GetSection {
    articleSection @client {
      url
    }
  }
`;

type ListComponentProps = {
  // generalized this to avoid complexity of dfp/teaser/clicktracker
  list: Object,
  listId: string,
  gaAction: () => void,
  biAction: ?ListBiActionType,
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

  // Because of the problems with mix of Client and Server side render
  // we need a white-list to ensure that the Client-side lists of the
  // article page will not be blocked by the next condition.
  const clientSideLists: Array<string> = [ 'leela', 'farnsworth', 'bender', 'zoidberg', ];

  // TODO: Figure out why mixing client-side rendered lists and
  //       server-side rendered lists breaks the page and remove
  //       this line
  if (!isSsr && !clientSideLists.includes(view.toLowerCase())) return null;

  return (
    <Query
      query={GET_SECTION}
    >
      {({ data, loading, error, }) => {
        if (loading) return null;
        if (error) return null;
        const { url, } = data.articleSection || {};
        return (
          <Query query={query} variables={{ ...variables, section: url || '/', }} skip={isSsr}>
            {({ data, loading, error, }) => {
              if (loading) return null;
              if (error) return null;
              const { title, items, lazyLoadImages, contentId, ...restList } = isSsr
                ? listData
                : data.list;
              items && updateListDuplication(items);
              return (
                <EventTracker>
                  {({ biAction, gaAction, HtzReactGA, }) => {
                    const clickAction = ({ index, articleId, }) => biAction && biAction({
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
      }}
    </Query>
  );
}
