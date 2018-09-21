// @flow
import React from 'react';
import dynamic from 'next/dynamic';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import gql from 'graphql-tag';
import type { StatelessFunctionalComponent, } from 'react';
import type { DocumentNode, } from 'graphql/language/ast';

import { Query, } from '../ApolloBoundary/ApolloBoundary';

const GraphQuery: DocumentNode = gql`
  query FinanceGraph($type: String!, $time: String!, $assetId: String!){
    financeGraph (type: $type, time: $time, assetId: $assetId){
      xLabel
      yLabel
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
          id
          name
          symbol
        }
      }
    }
  }
`;

type Props = {
  indexId: number | string,
  time: string,
  type: string,
  changeStats: Function,
  miscStyles: ?Object,
}

const Line = dynamic(import('./graphs/Line/Line'), {
  loading: () => null,
  ssr: false,
});

const Scatter = dynamic(import('./graphs/Scatter/Scatter'), {
  loading: () => null,
  ssr: false,
});


const Graph: StatelessFunctionalComponent<Props> =
// eslint-disable-next-line react/prop-types
  ({ indexId, time, type, changeStats, miscStyles, }) => {
    const GraphElement = type === 'line'
      ? Line
      : Scatter;
    // const data = indexId && type && time ? getData.get(`${type}${time}${indexId}`) : {};
    return (
      <Query
        query={GraphQuery}
        variables={{
          assetId: indexId,
          type,
          time,
        }}
      >
        {({ loading, error, data: { financeGraph, }, }) => {
          if (error) return null;
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
                    data={loading ? null : financeGraph.dataSource}
                    changeStats={changeStats}
                  />
                </FelaComponent>
              )}
            />
          );
        }}
      </Query>
    );
  };


export default Graph;