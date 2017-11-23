/** @jest-environment node */
import mediaMatchesQuery from '../mediaMatchesQuery';

describe('mediaMatchesQuery() on server', () => {
  it("return undefined when window doesn't exist", () => {
    const result = mediaMatchesQuery(
      {
        widths: { s: 600, m: 700, },
        misc: { landscape: '(orientation: landscape)', },
      },
      [ { from: 's', until: 'm', value: 'BAM!', }, ]
    );
    expect(result).toBe(undefined);
  });
});
