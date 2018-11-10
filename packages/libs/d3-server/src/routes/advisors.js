import express from 'express';

import areaGraph from '../graphs/area';
import fetchData from '../utils/fetchData';
import areaFragment from '../utils/queryFragments/areaFragment';

const router = express.Router();

router.post([ '/area', ], (req, res) => {
  const {
    assetId,
    time = [ 'year', 'fiveYears', 'tenYears', 'fifteenYears', 'twentyYears', ],
    options = {},
  } = req.body || {};
  fetchData({ assetId, time, type: 'area', fragment: areaFragment, })
    .then(({ data, }) => {
      if (Array.isArray(time)) {
        const result = {};
        time.map(timeSpan => {
          result[timeSpan] = areaGraph(data[timeSpan].dataSource, options).svgString();
        });
        res.end(JSON.stringify(result));
      }
      else {
        const { financeGraph: { dataSource, }, } = data;
        const svg = areaGraph(dataSource, options);
        res.end(svg.svgString());
      }
    });
});

export default router;
