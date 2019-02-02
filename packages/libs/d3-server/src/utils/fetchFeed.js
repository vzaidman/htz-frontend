import fetch from 'node-fetch';
import * as async from 'async';

export default ({ assetId, part, }) => {
  const result = {};
  return new Promise((resolve, reject) => {
    async.eachOf(
      { monthly: 2, quarterly: 7, yearly: 3, },
      (period, key, callback) => {
        fetch(
          `https://apifinance.themarker.com/TheMarkerApi/HotMoneyCharts?indexId=${assetId}&part=${part}&period=${period}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
          }
        )
          .then(res => res.json())
          .then(json => {
            result[key] = json.chart.dataSource.map(asset => ({
              time: asset[0],
              value: asset[1],
            }));
            callback();
          })
          .catch(err => reject(err));
      },
      err => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
