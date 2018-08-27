/* global localStorage */

/**
 * Provide local-storage caching to an async getter function
 * @param {async (args) => *} asycnFunc - async function you would like to cache
 * @param {(args) => string} keyGenerator - function that generates a localStorage key based on
 * asycnFunc input
 * @return {async (args) => *} - new function that provides a caching layer around asycnFunc
 */
export const usingCache = (asycnFunc, keyGenerator) => async (...args) => {
  const localStorageKey = keyGenerator(...args);
  let value = localStorage.getItem(localStorageKey);
  if (value === null) {
    value = await asycnFunc(...args);
    localStorage.setItem(localStorageKey, value);
  }
  return value;
};
