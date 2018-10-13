import express from 'express';

import line from '../graphs/line';
import scatter from '../graphs/scatter';
import fetchData from '../utils/fetchData';

const router = express.Router();

router.post([ '/line', '/scatter', ], (req, res) => {
  const { assetId, time, options = {}, } = req.body || {};
  const { url, } = req;
  const type = url.substr(1);
  fetchData({ assetId, time, type, })
    .then(({ data: { financeGraph, }, }) => {
      const svg = url === '/scatter'
        ? scatter(financeGraph.dataSource, options)
        : line(financeGraph.dataSource, options);
      res.end(svg.svgString());
    });
});

export default router;

