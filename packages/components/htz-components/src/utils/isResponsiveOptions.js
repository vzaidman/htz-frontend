// @flow
import isArray from './isArray';

function isObject(candidate: any): boolean %checks {
  return candidate != null && typeof candidate === 'object';
}

function hasValue(candidate: any): boolean %checks {
  return candidate.value != null;
}

function hasBpOption(candidate: Object): boolean %checks {
  return (
    typeof candidate.from === 'string'
    || typeof candidate.until === 'string'
    || typeof candidate.misc === 'string'
    || typeof candidate.type === 'string'
  );
}

function isRespObject(candidate: any): boolean %checks {
  return isObject(candidate) && hasValue(candidate) && hasBpOption(candidate);
}

/*
 * Determine if `candidate` is a prop responsive options object.
 *
 * @param {*} candidate - The value to evaluate
 * @return {boolean}
 *
 * @private
 */
export default function isResponsiveOptions(candidate: any): boolean %checks {
  return isArray(candidate) && candidate.every(isRespObject);
}
