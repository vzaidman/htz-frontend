/* globals window */
import matchMediaPolyfill from 'mq-polyfill';
import mediaMatchesQuery from '../mediaMatchesQuery';

matchMediaPolyfill(window);
window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    ...(width ? { innerWidth: width, outerWidth: width, } : {}),
    ...(height ? { innerHeight: height, outerHeight: height, } : {}),
  }).dispatchEvent(new this.Event('resize'));
};

describe('mediaMatchesQuery() in browser', () => {
  it('return "value" when one query matches, single query', () => {
    const bps = {
      widths: { s: 641, m: 801, l: 961, },
      misc: { landscape: '(orientation: landscape)', },
    };

    window.resizeTo(700);

    const result = mediaMatchesQuery(bps, {
      queries: [ { from: 's', until: 'm', value: 'BAM!', }, ],
    });
    expect(result).toBe('BAM!');
  });

  it('return "value" of the first query that matches, min-width', () => {
    const bps = {
      widths: { s: 640, m: 800, l: 960, },
      misc: { landscape: '(orientation: landscape)', },
    };
    window.resizeTo(850);

    const result = mediaMatchesQuery(bps, {
      queries: [
        { from: 'l', value: 'BIM!', },
        { from: 'm', value: 'BAM!', },
        { from: 's', value: 'BOM!', },
      ],
    });
    expect(result).toBe('BAM!');
  });

  it('return "value" of the first query that matches, max-width', () => {
    const bps = {
      widths: { s: 641, m: 801, l: 961, },
      misc: { landscape: '(orientation: landscape)', },
    };
    window.resizeTo(850);

    const result = mediaMatchesQuery(bps, {
      queries: [
        { until: 's', value: 'BOM!', },
        { until: 'm', value: 'BAM!', },
        { until: 'l', value: 'BIM!', },
      ],
    });
    expect(result).toBe('BIM!');
  });
  it('return "value" of the first query that matches, misc', () => {
    const bps = {
      widths: { s: 641, m: 801, l: 961, },
      misc: {
        // The matchMedia polyfill only supports width mqs, so we're faking misc queries
        landscape: '(min-width: 500)',
        portrait: '(min-width: 900)',
      },
    };
    window.resizeTo(850, 600);

    const result = mediaMatchesQuery(bps, {
      queries: [
        { misc: 'portrait', value: 'BOM!', },
        { misc: 'landscape', value: 'BAM!', },
      ],
    });
    expect(result).toBe('BAM!');
  });
  it('return "undefined" when no query matches', () => {
    const bps = {
      widths: { s: 641, m: 801, l: 961, },
      misc: { landscape: '(orientation: landscape)', },
    };
    window.resizeTo(1200);

    const result = mediaMatchesQuery(bps, {
      queries: [
        { until: 's', value: 'BOM!', },
        { until: 'm', value: 'BAM!', },
        { until: 'l', value: 'BIM!', },
      ],
    });
    expect(result).toBe(undefined);
  });
});
