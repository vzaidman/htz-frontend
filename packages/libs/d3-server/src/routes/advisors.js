import express from 'express';

import areaGraph from '../graphs/area';
import fetchData from '../utils/fetchData';
import areaFragment from '../utils/queryFragments/areaFragment';

const router = express.Router();

router.post([ '/area', ], (req, res) => {
  const {
    assetId,
    options = {},
    peRatioData = null,
  } = req.body || {};
  fetchData({ assetId, type: 'area', fragment: areaFragment(!peRatioData), })
    .then(({ data, }) => {
      const { financeGraph: { dataSource, }, } = data;
      peRatioData && dataSource.forEach((entry, index) => {
        entry.peRatio = peRatioData[index].peRatio;
      });
      const result = {
        year: {
          display: 'שנה',
          graph: areaGraph(dataSource.slice(0, 12), 'year', options).svgString(),
        },
        fiveYears: {
          display: '5 שנים',
          graph: areaGraph(dataSource.slice(0, 60), 'fiveYears', options).svgString(),
        },
        tenYears: {
          display: '10 שנים',
          graph: areaGraph(dataSource.slice(0, 120), 'tenYears', options).svgString(),
        },
        fifteenYears: {
          display: '15 שנים',
          graph: areaGraph(dataSource.slice(0, 180), 'fifteenYears', options).svgString(),
        },
        twentyYears: {
          display: '20 שנים',
          graph: areaGraph(dataSource.slice(0, 240), 'twentyYears', options).svgString(),
        },
      };
      res.end(JSON.stringify(result));
    })
    .catch(err => console.log(err));
});

export default router;
