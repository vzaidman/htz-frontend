/* global fetch */
// @flow
// eslint-disable-next-line no-return-await
const fetchEast: () => Object = async () => await (await fetch('http://docker.themarker.com:8140/nba/east')).json();
// eslint-disable-next-line no-return-await
const fetchWest: () => Object = async () => await (await fetch('http://docker.themarker.com:8140/nba/west')).json();

export { fetchEast, fetchWest, };
