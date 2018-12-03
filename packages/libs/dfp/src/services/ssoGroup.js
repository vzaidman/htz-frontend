/* global fetch localStorage */

// TODO: receive baseUrl from config
const baseUrl = 'https://ms-apps.themarker.com/haaretz-dfp/api';

/**
 * async functions that fetchs the matching SSO-group-key for a logged-in user
 * @param {string} ssoUserId - the sso id of the logged-in user
 * @return {string} - SSOGroupKey of the given user
 * or null if unable to retrieve
 */
const fetchSsoGroupKey = async ssoUserId => {
  // wait for header to fetch with body stream
  const res = await fetch(`${baseUrl}/getKeyByValue?value=${ssoUserId}`, {
    cache: 'no-cache',
  });
  // wait for body to fetch (and convert to json)
  const data = await res.json();
  const result = data.result;
  if (result === 'item not found') {
    return null;
  }
  return result;
};

/**
 * Generates localStorage key from user-id
 * @param {string} ssoUserId - the sso id of the logged-in user
 * @return {string} - generated key
 */
const generateStorageKey = ssoUserId => `_ssoUser[${ssoUserId}]_`;

/**
 * retrieves ssoGroupKey from localStorage for a given user
 * @param {string} ssoUserId - the sso id of the logged-in user
 * @return {string} - ssoGroupKey of the user
 * or null if none exists
 */
export const retrieveSsoGroupKey = ssoUserId =>
  localStorage.getItem(generateStorageKey(ssoUserId));

/**
 * fetchs ssoGroupKey from the server and stores it in localStorage
 * @param {string} ssoUserId - the sso id of the logged-in user
 */
export const storeSsoGroupKey = async ssoUserId => {
  try {
    const ssoGroupKey = await fetchSsoGroupKey(ssoUserId);
    if (ssoGroupKey) {
      localStorage.setItem(generateStorageKey(ssoUserId), ssoGroupKey);
    }
  }
  catch (err) {
    console.error('Error fetching SSOGroupKey.\n', err);
  }
};
