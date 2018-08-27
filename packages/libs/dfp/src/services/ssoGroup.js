/* global fetch */

import { usingCache, } from '../utils/localStorageCache';

const isUserLoggedIn = ssoUserId => !!ssoUserId;

const ITEM_NOT_FOUND = { reason: 'item not found', };

/**
 * async functions that fetchs the matching SSO-group-key for a logged-in user
 * @param {string} ssoUserId - the sso id of the logged-in user
 * @return {string} - SSOGroupKey of the given user
 * or null if unable to retrieve
 * @throws {object} ITEM_NOT_FOUND - check aginst this value to distinguish
 * between general error and 'item not found' case.
 */
const fetchSsoGroupKey = async ssoUserId => {
  // wait for header to fetch with body stream
  const res = await fetch(`/ssoGroupKey?value=${ssoUserId}`, {
    cache: 'no-cache',
  });
  // wait for body to fetch (and convert to json)
  const fullRes = await res.json();
  const result = fullRes.result;
  if (result === 'item not found') {
    // throw ITEM_NOT_FOUND to avoid caching this result (any exeption would do)
    throw ITEM_NOT_FOUND;
  }
  return result;
};

/**
 * same as fetchSsoGroupKey, only with a transperant caching layer on top of it
 */
const fetchSsoGroupKeyCached = usingCache(
  fetchSsoGroupKey,
  ssoUserId => `_ssoUser[${ssoUserId}]_`
);

/**
 * async function that fetches ssoGroupKey for logged-in user using localStorage as caching layer
 * @param {string} ssoUserId - the sso id of the logged-in user
 * @return {string} - SSOGroupKey of the given user
 * or null if unable to retrieve
 */
export const getSsoGroupKey = async ssoUserId => {
  let ssoGroupKey = null;
  if (isUserLoggedIn(ssoUserId)) {
    try {
      ssoGroupKey = await fetchSsoGroupKeyCached(ssoUserId);
    }
    catch (err) {
      // ITEM_NOT_FOUND is not an error, it is thrown so it won't be cached
      if (err !== ITEM_NOT_FOUND) {
        console.error('Error fetching SSOGroupKey.\n', err);
      }
    }
  }
  return ssoGroupKey;
};
