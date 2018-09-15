import number from './number';

export default {
  timestamp: ({ start = null, end = null, }) => {
    if (!start && !end) return new Date().getTime();
    const startTime = start.getTime() || new Date(1970, 0, 1).getTime();
    const endTime = end.getTime() || new Date().getTime();
    return number.int({ min: startTime, max: endTime, });
  },
};
