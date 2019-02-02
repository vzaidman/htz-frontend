// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Query, } from '@haaretz/htz-components';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

const StaticGraphQuery: DocumentNode = gql`
  query StaticGraph($type: GraphType!, $time: PeriodType!, $assetId: String!) {
    staticGraph(assetId: $assetId, period: $time, type: $type)
  }
`;

type Props = {
  indexId: string,
  time: string,
  type: string,
  miscStyles: ?Object,
};

StaticGraph.defaultProps = {
  miscStyles: null,
};

function StaticGraph({ type, indexId, time, miscStyles, }: Props): Node {
  return (
    <Query
      query={StaticGraphQuery}
      variables={{
        assetId: indexId,
        type,
        time,
      }}
    >
      {({ loading, error, data: { staticGraph, }, }) => {
        if (error) return null;
        if (loading) return null;
        return (
          <FelaComponent
            style={theme => ({
              extend: [
                ...(miscStyles
                  ? parseStyleProps(miscStyles, theme.mq, theme.type)
                  : []),
              ],
            })}
          >
            <div dangerouslySetInnerHTML={{ __html: staticGraph, }} />
          </FelaComponent>
        );
      }}
    </Query>
  );
}

export default StaticGraph;
