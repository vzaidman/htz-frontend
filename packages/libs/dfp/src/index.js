/* globals window */
import DFP from './dfp';

let dfpInstance = null;

export const getDfpSingleton = config => {
  if (dfpInstance === null) {
    dfpInstance = new DFP(config);
  }
  return dfpInstance;
};
