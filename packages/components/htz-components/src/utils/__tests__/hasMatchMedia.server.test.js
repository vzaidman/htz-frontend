/** @jest-environment node */
import hasMatchMedia from '../hasMatchMedia';

describe('hasMatchMedia() on server', () => {
  it('return "false" when "window" doesn\'t exist', () => {
    expect(hasMatchMedia()).toBe(false);
  });
});
