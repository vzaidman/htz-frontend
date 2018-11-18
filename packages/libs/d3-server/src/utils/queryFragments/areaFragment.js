export default peRatio => `
  ... on AreaGraphData {
    time
    value
    ${peRatio ? 'peRatio' : ''}
  }
`;
