/* global window */
export function getSubdomain(domain = window.location.hostname) {
  const resultArr = /\w+(\.co\.il|\.com)/g.exec(domain);
  return resultArr != null && resultArr[0] ? resultArr[0] : null;
}

export default {
  getSubdomain,
};
