/* global document */
/**
 * curruntly jest doesnt support document.execCommand
 * the following function act as a polyfill's for this function, it returns the prev
 * function so we can cancel the polyfill at the end of the test
 */
export default function execCommandPolyfill() {
  const prevExecCommand = document.execCommand;
  document.execCommand = document.execCommand || function noop() {};
  return prevExecCommand;
}
