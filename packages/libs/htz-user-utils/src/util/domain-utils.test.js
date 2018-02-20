/* global window */
import { getSubdomain, } from './domain-utils';

describe('Domain Utils', () => {
  describe('getSubdomain function', () => {
    it('should be a function', () => {
      expect(getSubdomain).toBeDefined();
      expect(typeof getSubdomain).toBe('function');
    });

    it('should extract a subdomain correctly', () => {
      expect(getSubdomain('haaretz.co.il')).toEqual('haaretz.co.il');
      expect(getSubdomain('www.haaretz.co.il')).toEqual('haaretz.co.il');
      expect(getSubdomain('devsso.haaretz.co.il')).toEqual('haaretz.co.il');
      expect(getSubdomain('www.haaretz.co.il/.premium-1.341512')).toEqual(
        'haaretz.co.il'
      );
      expect(getSubdomain('www.haaretz.com')).toEqual('haaretz.com');
      expect(getSubdomain('www.themarker.com')).toEqual('themarker.com');
      expect(getSubdomain('google.co.il')).toEqual('google.co.il');
      expect(getSubdomain('www.google.co.il')).toEqual('google.co.il');
      expect(getSubdomain('172.21.1.56')).toEqual(null);
    });

    it('should default to window.location.hostname', () => {
      expect(getSubdomain()).toEqual(getSubdomain(window.location.hostname));
    });
  });
});
