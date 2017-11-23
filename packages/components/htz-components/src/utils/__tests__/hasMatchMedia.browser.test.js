/* globals window */
import matchMediaPolyfill from 'mq-polyfill';
import hasMatchMedia from '../hasMatchMedia';

describe('hasMatchMedia() in browser', () => {
  it('return "false" when "matchMedia" doesn\'t exist', () => {
    expect(hasMatchMedia()).toBe(false);
  });
  it('return "true" when "matchMedia" exists', () => {
    matchMediaPolyfill(window);
    expect(hasMatchMedia()).toBe(true);
  });
});
