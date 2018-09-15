export default {
  int: ({ min = 0, max = 100, }) => {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * ((maxFloor - minCeil) + 1)) + minCeil;
  },
  float: ({ min = 0, max = 100, fixed = 2, }) =>
    Number.parseFloat((Math.random() * (max - min)) + min).toFixed(fixed),
};
