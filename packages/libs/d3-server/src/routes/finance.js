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

export default router;

