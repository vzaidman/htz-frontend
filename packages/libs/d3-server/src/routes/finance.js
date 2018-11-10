import express from 'express';

import lineGraph from '../graphs/line';
import yieldGraph from '../graphs/yield';
import volumeGraph from '../graphs/volume';
import scatterGraph from '../graphs/scatter';
import fetchData from '../utils/fetchData';
import lineFragment from '../utils/queryFragments/lineFragment';
import scatterFragment from '../utils/queryFragments/scatterFragment';

// eslint-disable-next-line no-unused-vars
// const getGraphs = graphType => {
//   const graphs = new Map([
//     [
//       'line',
//       {
//         graph: () => import('../graphs/line'),
//         fragment: () => import('../utils/queryFragments/lineFragment'),
//       },
//     ],
//     [
//       'scatter',
//       {
//         graph: () => import('../graphs/scatter'),
//         fragment: () => import('../utils/queryFragments/scatterFragment'),
//       },
//     ],
//   ]);
//
//   const { graph: graphPath, fragment: fragmentPath, } = graphs.get(graphType);
//
//   const promiseGraph = new Promise((resolve, reject) => {
//     graphPath()
//       .then(Graph => resolve(Graph))
//       .catch(err => reject(err));
//   });
//
//   const promiseFragment = new Promise((resolve, reject) => {
//     fragmentPath()
//       .then(Fragment => resolve(Fragment))
//       .catch(err => reject(err));
//   });
//
//   return Promise.all([ promiseGraph, promiseFragment, ]);
// };

const router = express.Router();

router.post([ '/line', '/scatter', ], (req, res) => {
  const { assetId, time = 'daily', options = {}, } = req.body || {};
  const { url, } = req;
  const type = url.substr(1);
  const fragment = type === 'scatter' ? scatterFragment : lineFragment;
  fetchData({ assetId, time, type, fragment, })
    .then(({ data: { financeGraph, }, }) => {
      const svg = url === '/scatter'
        ? scatterGraph(financeGraph.dataSource, options)
        : lineGraph(financeGraph.dataSource, options);
      res.end(svg.svgString());
    });
});

router.post([ '/volume', '/yield', ], (req, res) => {
  const { data, options = {}, } = req.body || {};
  const { url, } = req;
  const svg = url === '/yield'
    ? yieldGraph(data, options)
    : volumeGraph(data, options);
  res.end(svg.svgString());
});

export default router;

