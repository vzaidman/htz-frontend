// @flow
import number from './number';

type TimestampType = ({
  start?: Date,
  end?: Date,
}) => number;

type SteppingTimestampType = ({
  initialTime: Date | number,
  step: number,
  index: number,
}) => number;

const timestamp: TimestampType = ({ start = null, end = null, }) => {
  if (!start && !end) return new Date().getTime();
  const startTime: number = start ? start.getTime() : new Date(1970, 0, 1).getTime();
  const endTime: number = end ? end.getTime() : new Date().getTime();
  return number.int({ min: startTime, max: endTime, });
};

const steppingTimestamp: SteppingTimestampType = ({ initialTime, step, index, }) =>
  new Date(initialTime).getTime() + (step * index);

export default {
  steppingTimestamp,
  timestamp,
};
