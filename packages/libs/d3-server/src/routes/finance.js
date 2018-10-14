import express from 'express';

import lineGraph from '../graphs/line';
import yieldGraph from '../graphs/yield';
import volumeGraph from '../graphs/volume';
import scatterGraph from '../graphs/scatter';
import fetchData from '../utils/fetchData';

const router = express.Router();

router.post([ '/line', '/scatter', ], (req, res) => {
  const { assetId, time, options = {}, } = req.body || {};
  const { url, } = req;
  const type = url.substr(1);
  fetchData({ assetId, time, type, })
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

