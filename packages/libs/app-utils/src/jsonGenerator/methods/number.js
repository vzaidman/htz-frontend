// @flow

type IntType = ({
  min?: number,
  max?: number,
}) => number;

type FloatType = ({
  min?: number,
  max?: number,
  fixed?: number,
}) => number;

const int: IntType = ({ min = 0, max = 100, }) => {
  const minCeil: number = Math.ceil(min);
  const maxFloor: number = Math.floor(max);
  return Math.floor(Math.random() * ((maxFloor - minCeil) + 1)) + minCeil;
};

const float: FloatType = ({ min = 0, max = 100, fixed = 2, }) => Number.parseFloat(Number((Math.random() * (max - min)) + min).toFixed(fixed));

export default {
  int,
  float,
};
