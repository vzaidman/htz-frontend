// @flow
import React from 'react';
import dynamic from 'next/dynamic';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';
import { Query, } from '@haaretz/htz-components';

import type { Node, ComponentType, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

const GraphQuery: DocumentNode = gql`
  query FinanceGraph($type: GraphType!, $time: PeriodType!, $assetId: String!) {
    financeGraph(type: $type, time: $time, assetId: $assetId) {
      startTime
      endTime
      dataSource {
        ... on LineGraphData {
          time
          value
          yieldSpread
          change
          volume
          name
          symbol
        }
        ... on ScatterGraphData {
          x
          y
          name
          symbol
        }
      }
    }
  }
`;

type Props = {
  indexId?: ?number | string,
  time?: ?string,
  type: string,
  changeStats: Function,
  miscStyles?: ?Object,
  data: Object,
};

const graphTypes: Object = new Map([
  [
    'line',
    dynamic(import('./graphs/Line/Line'), {
      loading: () => null,
      ssr: false,
    }),
  ],
  [
    'scatter',
    dynamic(import('./graphs/Scatter/Scatter'), {
      loading: () => null,
      ssr: false,
    }),
  ],
]);

const Graph = ({
  indexId,
  time,
  type,
  miscStyles,
  data,
  ...props
}: Props): Node => {
  const GraphElement: ComponentType<any> = graphTypes.get(type);
  return (
    <FelaTheme
      render={theme => (
        <FelaComponent
          style={{
            extend: [
              ...(miscStyles
                ? parseStyleProps(miscStyles, theme.mq, theme.type)
                : []),
            ],
          }}
        >
          <GraphElement
            time={time}
            theme={theme}
            data={data || null}
            {...props}
          />
        </FelaComponent>
      )}
    />
  );
};

Graph.defaultProps = {
  indexId: null,
  time: null,
  miscStyles: null,
};

export default (props: any) => {
  if (!props.data) {
    const { indexId, type, time, } = props;
    return (
      <Query
        query={GraphQuery}
        variables={{
          assetId: indexId,
          type,
          time,
        }}
      >
        {({ loading, error, data, }) => {
          if (error) return null;
          return (
            <Graph
              {...props}
              data={!loading ? data.financeGraph.dataSource : null}
            />
          );
        }}
      </Query>
    );
  }
  return <Graph {...props} data={props.data} />;
};
