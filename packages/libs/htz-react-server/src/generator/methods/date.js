// @flow
import number from './number';

type TimestampType = ({
  start?: Date,
  end?: Date,
}) => number;

const timestamp: TimestampType = ({ start = null, end = null, }) => {
  if (!start && !end) return new Date().getTime();
  const startTime: number = start ? start.getTime() : new Date(1970, 0, 1).getTime();
  const endTime: number = end ? end.getTime() : new Date().getTime();
  return number.int({ min: startTime, max: endTime, });
};

export default {
  timestamp,
};
