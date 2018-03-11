/* global window, document */
// import { getSubdomain, } from './domain-utils';
/**
 * Htz-cookie-util
 * @module htzCookieUtil
 * @author Elia Grady elia.grady@haaretz.co.il
 * @license MIT
 */

/**
 * Translates Key-Value string into a convenient map.
 * @param {String} string String in format of "key<operator>value<separator>....."
 * @param {object} options object for overriding defaults:
 * options.separator is a String or regExp that separates between each key value pairs
 * (default is ';'). options.operator is a String or regExp that separates between each key
 * and value within a pair (default is '=').
 * @returns {object} a map-like object, with key-value mapping according to the passed configuration.
 */
function stringToMap(string, { separator = /;\s*/, operator = '=', } = {}) {
  const map = Object.create(null);
  const itemsArr = string.split(separator);
  itemsArr.forEach(element => {
    if (typeof element === 'string') {
      const keyValue = element.split(operator);
      if (keyValue.length === 2) {
        try {
          map[keyValue[0]] = decodeURIComponent(keyValue[1]);
        }
        catch (e) {
          // Do nothing, malformed URI
        }
      }
    }
  });
  return map;
}

let cookieAsMap; // Memoization of cookie parsing

/**
 * Converts document.cookie string to a Map
 * @param {boolean} forceRefresh - flag to force re-creation of the cookie map.
 * @returns {object} the cookie string represented as a key-value pairs
 */
export function getCookieAsMap(forceRefresh = false) {
  if (!cookieAsMap || forceRefresh) {
    cookieAsMap = stringToMap(document.cookie, { separator: /;\s?/, });
    if (cookieAsMap.tmsso !== undefined) {
      cookieAsMap.tmsso = stringToMap(cookieAsMap.tmsso, { separator: /:\s?/, });
    }
    if (cookieAsMap.engsso !== undefined) {
      cookieAsMap.engsso = stringToMap(cookieAsMap.engsso, {
        separator: /:\s?/,
      });
    }
  }
  return cookieAsMap;
}

/**
 * Sets a client cookie
 * @param {string} key - cookie name
 * @param {string} value - cookie value
 * @param {string} path - path of cookie
 * @param {string} domain - domain of cookie
 * @param {Date} expiration - date of cookie expiration
 */
export function setCookie(
  key,
  value,
  path,
  domain,
  expiration = new Date(Date.now() + 31536000000) /* one year */
) {
  const params = [];
  const expires = expiration;
  params.push(`${key}=${encodeURIComponent(value)}`);

  if (path) {
    params.push(`path=${path}`);
  }
  if (domain) {
    params.push(`domain=${domain}`);
  }
  params.push(`expires=${expires.toUTCString()}`);

  document.cookie = params.join(';');
  // TODO decide if this side effect is required
  getCookieAsMap(true);
}

export function getCookie(key, forceRefresh = false) {
  return getCookieAsMap(forceRefresh)[key];
}

/**
 * This function plants an http-only cookie for SSO.
 * I works by planting an 'img' tag that when it resolves,
 * the response headers contains a 'Set-Cookie' header field with the tmsso cookie to set.
 * @param imageUrl the special endpoint to request an image from.
 * Can be retrived from an SSO server with a successful 'login' response
 * @return {Promise} that resolves if the image was loaded (and therefore cookie was set).
 */
export function plantCookie(imageUrl) {
  const promise = new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.classList.add('login-cookie');
    img.src = `${imageUrl}&_ts=${Date.now()}`;
    img.addEventListener('load', () => {
      // const domain = getSubdomain();
      // console.warn(`onload done! domain is: ${domain}`);
      // console.warn('called from old plantCookie! (if you see this, this is bad)');
      // if (img.src.includes(domain)) {
      //   dispatchEvent(window, 'loginstatechange');
      // }
      resolve();
    });
    img.addEventListener('error', () => {
      reject();
    });

    document.body.appendChild(img);
  });

  return promise;
}

// Delete all cookies (including paths) helper for testing purposes
export function deleteAllCookies() {
  const cookies = document.cookie.split('; ');
  for (let c = 0; c < cookies.length; c += 1) {
    const domain = window.location.hostname.split('.');
    while (domain.length > 0) {
      const cookieBase = `${encodeURIComponent(
        cookies[c].split(';')[0].split('=')[0]
      )}=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=${domain.join(
        '.'
      )} ;path=`;
      const path = window.location.pathname.split('/');
      document.cookie = `${cookieBase}/`;
      while (path.length > 0) {
        document.cookie = cookieBase + path.join('/');
        path.pop();
      }
      domain.shift();
    }
  }
}

export default getCookieAsMap;
