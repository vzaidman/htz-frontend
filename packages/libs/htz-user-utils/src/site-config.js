/* global window */
import { getSubdomain, } from './util/domain-utils';

/**
 * Returns a site configuration, which is a plain object with the following keys:
 * ssoDomain, ssoKey, siteId
 *  ssoDomain is the domain of the SSO backend service
 *  ssoKey is the string used to identify the cookie ('tmsso'\'engsso' cookie keys)
 *  siteId is a number (as a string) that is used with the backend service
 * @return {V} site configuration object, as detailed
 */
export default function createSiteConfig() {
  if (!(window && window.location && window.location.hostname)) {
    throw new Error(
      'Tried creating a config with no window.location.hostname context!'
    );
  }
  const hostname = window.location.hostname;
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
  const isProduction = process.env.NODE_ENV === 'production';
  const ssoDomain = isProduction
    ? `https://sso.${domain}`
    : `https://devsso.${domain}`;
  configurations.set('haaretz.co.il', {
    ssoDomain,
    ssoKey: 'tmsso',
    siteId: '80',
  });

  configurations.set('themarker.com', {
    ssoDomain,
    ssoKey: 'tmsso',
    siteId: '10',
  });

  configurations.set('haaretz.com', {
    ssoDomain,
    ssoKey: 'engsso',
    siteId: '85',
  });
  const siteConfig = configurations.get(domain);
  if (!siteConfig) {
    throw new Error('No configuration found for hostname:', domain);
  }
  return siteConfig;
}
