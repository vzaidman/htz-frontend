// @flow
import React from 'react';
import gql from 'graphql-tag';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

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
  children: ListComponentProps => Node,
  updateListDuplication: Function,
  view: string,
  viewProps?: Object,
  listData: ListDataType,
};

ListDataGetter.defaultProps = {
  viewProps: {},
};

function ListDataGetter({
  children,
  updateListDuplication,
  view,
  viewProps,
  listData,
}: ListDataGetterProps): Node {
  const { title, items, lazyLoadImages, contentId, ...restList } = listData;
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
}

type Props = ListDataGetterProps & {
  query: DocumentNode,
  variables: Object,
}

export default function ({ listData, variables, query, children, ...restOfProps }: Props): Node {
  const isSsr = listData && listData.loadPriority === 'ssr';
  return (
    <Query
      query={GET_SECTION}
    >
      {({ data: sectionData, loading, error, }) => {
        if (loading) return null;
        if (error) return null;
        const { url, } = sectionData.articleSection || {};
        return (
          isSsr
            ? (
              <ListDataGetter listData={listData} section={url || '/'} {...restOfProps}>
                {children}
              </ListDataGetter>
            )
            : (
              <div>
                <Query query={query} variables={{ ...variables, section: url || '/', }} fetchPolicy="network-only">
                  {({ data, loading: listLoading, error: listError, }) => {
                    if (listLoading) return null;
                    if (listError) return null;
                    return (
                      <ListDataGetter listData={data.list} section={url || '/'} {...restOfProps}>
                        {children}
                      </ListDataGetter>
                    );
                  }}
                </Query>
              </div>
            )
        );
      }}
    </Query>
  );
}
