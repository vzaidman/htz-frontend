import express from 'express';

import areaGraph from '../graphs/area';
import fetchData from '../utils/fetchData';

const router = express.Router();

router.post([ '/area', ], (req, res) => {
  const { assetId, time = 'year', options = {}, } = req.body || {};
  fetchData({ assetId, time, type: 'area', })
    .then(({ data: { financeGraph, }, }) => {
      const svg = areaGraph(financeGraph.dataSource, options);
      res.end(svg.svgString());
    });
});

export default router;
