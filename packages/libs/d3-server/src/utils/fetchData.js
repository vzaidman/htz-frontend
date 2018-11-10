import fetch from 'node-fetch';

const prepareBody = (type, time, assetId, fragment) => (Array.isArray(time)
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
      query FinanceGraph($type: String!, $time: String!, $assetId: String!) {
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
  }));

export default ({ type, time, assetId, fragment, }) =>
  new Promise((resolve, reject) =>
    fetch('https://graphql.haaretz.co.il/', {
      method: 'POST',
      body: JSON.stringify(prepareBody(type, time, assetId, fragment)),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(err => reject(err))
  );
