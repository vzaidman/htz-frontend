// @flow
const marketMap: Object = new Map([
  [ '1', {
    name: 'תל אביב תעשייה',
    points: '1369.3',
    change: '0.09',
    indexId: '178',
    section: 'stocks',
  }, ],
  [ '2', {
    name: 'מסחר ושרותים',
    points: '1143.66',
    change: '-0.26',
    indexId: '41',
    section: 'stocks',
  }, ],
  [ '3', {
    name: 'חיפושי נפט וגז',
    points: '1285.45',
    change: '-0.65',
    indexId: '127',
    section: 'stocks',
  }, ],
]);

export default (indexId: string) => marketMap.get(indexId);
