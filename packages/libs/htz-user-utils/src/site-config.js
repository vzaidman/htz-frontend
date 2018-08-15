/* global window */
import config from 'config';
import { getSubdomain } from './util/domain-utils';

/**
 * Returns a site configuration, which is a plain object with the following keys:
 * ssoDomain, ssoKey, siteId
 *  ssoDomain is the domain of the SSO backend service
 *  ssoKey is the string used to identify the cookie ('tmsso'\'engsso' cookie keys)
 *  siteId is a number (as a string) that is used with the backend service
 * @param {string} hostname the hostname for which to create a configuration for
 * @return {V} site configuration object, as detailed
 */
export default function createSiteConfig(hostname = window.location.hostname) {
  if (!hostname && !(window && window.location && window.location.hostname)) {
    throw new Error(
      'Tried creating a config with no window.location.hostname context!'
    );
  }
  const defaultHostname = 'haaretz.co.il';
  const configurations = new Map();
  // https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp
  const isIpAddress = suspectedIp =>
    /(?!(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.).*)(?!255\.255\.255\.255)(25[0-5]|2[0-4]\d|[1]\d\d|[1-9]\d|[1-9])(\.(25[0-5]|2[0-4]\d|[1]\d\d|[1-9]\d|\d)){3}/.test(
      suspectedIp
    );
  const domain = isIpAddress(hostname)
    ? defaultHostname
    : getSubdomain(hostname);
  const ssoDomain = config.get('service.sso');
  const newSso = config.get('service.newSso');
  configurations.set('haaretz.co.il', {
    ssoDomain,
    newSsoDomain: newSso.HTZ_HEB,
    ssoKey: 'tmsso',
    siteId: '80',
  });

  configurations.set('themarker.com', {
    ssoDomain,
    newSsoDomain: newSso.TM,
    ssoKey: 'tmsso',
    siteId: '10',
  });

  configurations.set('haaretz.com', {
    ssoDomain,
    newSsoDomain: newSso.HTZ_COM,
    ssoKey: 'engsso',
    siteId: '85',
  });
  const siteConfig = configurations.get(domain);
  if (!siteConfig) {
    throw new Error('No configuration found for hostname:', domain);
  }
  return siteConfig;
}
