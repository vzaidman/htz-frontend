// @flow

export default function isArray(candidate: any): boolean %checks {
  return Array.isArray(candidate);
}
