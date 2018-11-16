import express from 'express';

import yieldGraph from '../graphs/yield';
import volumeGraph from '../graphs/volume';
import fetchData from '../utils/fetchData';

const getGraphs = graphType => {
  const graphs = new Map([
    [
      'line',
      {
        graph: () => import('../graphs/line'),
        fragment: () => import('../utils/queryFragments/lineFragment'),
      },
    ],
    [
      'scatter',
      {
        graph: () => import('../graphs/scatter'),
        fragment: () => import('../utils/queryFragments/scatterFragment'),
      },
    ],
  ]);

  const { graph: graphPath, fragment: fragmentPath, } = graphs.get(graphType);

  const promiseGraph = new Promise((resolve, reject) => {
    graphPath()
      .then(Graph => resolve(Graph))
      .catch(err => reject(err));
  });

  const promiseFragment = new Promise((resolve, reject) => {
    fragmentPath()
      .then(Fragment => resolve(Fragment))
      .catch(err => reject(err));
  });

  return Promise.all([ promiseGraph, promiseFragment, ]);
};

const router = express.Router();

router.post([ '/line', '/scatter', ], (req, res) => {
  const { assetId, time = 'daily', options = {}, } = req.body || {};
  const { url, } = req;
  const type = url.substr(1);
  getGraphs(type)
    .then(response =>
      fetchData({ assetId, time, type, fragment: response[1].default, })
        .then(({ data: { financeGraph, }, }) => {
          const graph = response[0].default;
          res.end(graph(financeGraph.dataSource, options).svgString());
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err));
});

router.post([ '/volume', '/yield', ], (req, res) => {
  const { data, options = {}, } = req.body || {};
  const { url, } = req;
  const svg = url === '/yield'
    ? yieldGraph(data, options)
    : volumeGraph(data, options);
  res.end(svg.svgString());
});

router.post([ '/assetGraphs', ], (req, res) => {
  const { assetId, options = {}, } = req.body || {};
  const time = [ 'daily', 'weekly', 'monthly', 'yearly', 'tripleYear', 'max', ];
  getGraphs('line')
    .then(response =>
      fetchData({ time, assetId, fragment: response[1].default, })
        .then(({
          data: {
            daily,
            weekly,
            monthly,
            yearly,
            tripleYear,
            max,
            volume: volumeValues,
            yield: yieldValues,
          },
        }) => {
          const lineGraph = response[0].default;
          const yieldData = [
            {
              name: 'שבוע',
              value: yieldValues.weeklyYield,
            },
            {
              name: 'חודש',
              value: yieldValues.monthlyYield,
            },
            {
              name: 'רבעון',
              value: yieldValues.quarterlyYield,
            },
            {
              name: 'שנה',
              value: yieldValues.yearlyYield,
            },
          ];
          const volumeData = [
            {
              name: 'מחזור (א׳ שח)',
              value: volumeValues.volume,
            },
            {
              name: 'מחזור יומי ממוצע (שנה)',
              value: volumeValues.dailyAvgVolume,
            },
          ];
          const results = {
            line: {
              daily: lineGraph(daily.dataSource, options).svgString(),
              weekly: lineGraph(weekly.dataSource, options).svgString(),
              monthly: lineGraph(monthly.dataSource, options).svgString(),
              yearly: lineGraph(yearly.dataSource, options).svgString(),
              tripleYear: lineGraph(tripleYear.dataSource, options).svgString(),
              max: lineGraph(max.dataSource, options).svgString(),
            },
            yield: yieldGraph(yieldData, options).svgString(),
            volume: volumeGraph(volumeData, options).svgString(),
          };
          res.end(JSON.stringify(results));
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err));
});

export default router;

