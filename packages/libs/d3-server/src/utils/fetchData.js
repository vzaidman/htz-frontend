import fetch from 'node-fetch';

const prepareBody = (type, time, assetId) => ({
  query: `
    query FinanceGraph($type: String!, $time: String!, $assetId: String!) {
      financeGraph(type: $type, time: $time, assetId: $assetId) {
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
  `,
  variables: { type, time, assetId, },
});

export default ({ type, time = 'daily', assetId, }) =>
  new Promise((resolve, reject) =>
    fetch('https://graphql.haaretz.co.il/', {
      method: 'POST',
      body: JSON.stringify(prepareBody(type, time, assetId)),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
);
