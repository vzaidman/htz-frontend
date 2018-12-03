import fetch from 'node-fetch';

const prepareBody = (type, time, assetId, fragment) => (type
  ? (Array.isArray(time)
    ? ({
      query: `query FinanceGraph($type: String!, $assetId: String!) {
        ${time.map(timeSpan => (`
          ${timeSpan}: financeGraph(type: $type, time: "${timeSpan}", assetId: $assetId) {
            startTime
            endTime
            dataSource {
              ${fragment}
            }
          }`
      ))}
      }`,
      variables: { type, assetId, },
    })
    : ({
      query: `
        query FinanceGraph($type: String!, $time: String, $assetId: String!) {
          financeGraph(type: $type, time: $time, assetId: $assetId) {
            startTime
            endTime
            dataSource {
              ${fragment}
            }
          }
        }
      `,
      variables: { type, time, assetId, },
    }))
  : ({
    query: `query AssetGraphs($assetId: String!) {
        ${time.map(timeSpan => (`
          ${timeSpan}: financeGraph(type: "line", time: "${timeSpan}", assetId: $assetId) {
            startTime
            endTime
            dataSource {
              ${fragment}
            }
          }`
    ))}
        volume: asset(assetId: $assetId){
          volume
          dailyAvgVolume
        }
        yield: asset(assetId: $assetId){
          weeklyYield
          monthlyYield
          quarterlyYield
          yearlyYield
        }
      }`,
    variables: { assetId, },
  }));

export default ({ type = null, time = null, assetId, fragment, }) => (type
  ? new Promise((resolve, reject) =>
    fetch('https://graphql.haaretz.co.il/', {
      method: 'POST',
      body: JSON.stringify(prepareBody(type, time, assetId, fragment)),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
  )
  : new Promise((resolve, reject) =>
    fetch('https://graphql.haaretz.co.il/', {
      method: 'POST',
      body: JSON.stringify(prepareBody(null, time, assetId, fragment)),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err)),
  )
);

