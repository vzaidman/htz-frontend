/* global document */

/**
 * curruntly jest doesnt support document.queryCommandState()
 * the following function act as a polyfill's for this function, it returns the prev
 * function so we can cancel the polyfill at the end of the test
 */
export default function queryCommandStatePolyFill() {
  const prevQueryCommandState = document.queryCommandState;
  document.queryCommandState = document.queryCommandState || (() => true);

  return prevQueryCommandState;
}
