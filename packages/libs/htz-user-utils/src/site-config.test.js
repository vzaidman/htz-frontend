/* global window, jsdom */
import createSiteConfig from './site-config';

let origHostname;

describe('Site Config', () => {
  beforeAll(() => {
    origHostname = window.location.href;
  });
  afterAll(() => {
    jsdom.reconfigure({ url: origHostname, });
    // Object.defineProperty(window.location, 'hostname', {
    //   value: origHostname,
    //   writable: true,
    // });
  });

  it('should be a defined function', () => {
    expect(createSiteConfig).toBeDefined();
    expect(typeof createSiteConfig).toBe('function');
  });

  it('should return a value when run', () => {
    let map;
    expect(() => {
      map = createSiteConfig();
    }).not.toThrow();
    expect(map).toBeDefined();
    expect(map).toBeInstanceOf(Object);
  });

  it('can be run multiple times, yielding the same result', () => {
    const map1 = createSiteConfig();
    const map2 = createSiteConfig();
    const map3 = createSiteConfig();
    expect(map1).toEqual(map2);
    expect(map2).toEqual(map3);
    expect(map1 === map2).toBeFalsy();
    expect(map1 === map3).toBeFalsy();
    expect(map2 === map3).toBeFalsy();
  });

  it('should have the following keys', () => {
    const map = createSiteConfig();
    const keys = Object.keys(map);
    const values = Object.values(map);
    expect(keys).toEqual(
      expect.arrayContaining([ 'ssoDomain', 'ssoKey', 'siteId', ])
    );
    expect(values).toEqual(
      expect.arrayContaining([ 'https://sso.haaretz.co.il', 'tmsso', '80', ])
    );
  });

  it('should have a site configuration for themarker.com', () => {
    jsdom.reconfigure({ url: 'https://www.themarker.com', });
    // Object.defineProperty(window.location, 'hostname', {
    //   value: 'www.themarker.com',
    //   writable: true,
    // });
    const map = createSiteConfig();
    const keys = Object.keys(map);
    const values = Object.values(map);
    expect(keys).toEqual(
      expect.arrayContaining([ 'ssoDomain', 'ssoKey', 'siteId', ])
    );
    expect(values).toEqual(
      expect.arrayContaining([ 'https://sso.themarker.com', 'tmsso', '10', ])
    );
  });

  it('should have a site configuration for themarker.com', () => {
    jsdom.reconfigure({ url: 'http://www.haaretz.com', });
    // Object.defineProperty(window.location, 'hostname', {
    //   value: 'www.haaretz.com',
    //   writable: true,
    // });
    const map = createSiteConfig();
    const keys = Object.keys(map);
    const values = Object.values(map);
    expect(keys).toEqual(
      expect.arrayContaining([ 'ssoDomain', 'ssoKey', 'siteId', ])
    );
    expect(values).toEqual(
      expect.arrayContaining([ 'https://sso.haaretz.com', 'engsso', '85', ])
    );
  });

  it('should have a site configuration for a valid IP address', () => {
    jsdom.reconfigure({ url: 'http://172.21.1.56', });
    // Object.defineProperty(window.location, 'hostname', {
    //   value: '172.21.1.56',
    //   writable: true,
    // });
    const map = createSiteConfig();
    const keys = Object.keys(map);
    const values = Object.values(map);
    expect(keys).toEqual(
      expect.arrayContaining([ 'ssoDomain', 'ssoKey', 'siteId', ])
    );
    expect(values).toEqual(
      expect.arrayContaining([ 'https://devsso.haaretz.co.il', 'tmsso', '80', ])
    );
  });

  it("should throw an error if there isn't a defined site configuration for the current domain", () => {
    jsdom.reconfigure({ url: 'http://example.com', });
    // Object.defineProperty(window.location, 'hostname', {
    //   value: 'example.com',
    //   writable: true,
    // });
    let map;
    expect(() => {
      // console.log(window.location.hostname);
      map = createSiteConfig();
      console.log(map);
    }).toThrow();
    // const map = createSiteConfig();
    // const keys = Object.keys(map);
    // const values = Object.values(map);
    // expect(keys).toEqual(expect.arrayContaining([ 'ssoDomain', 'ssoKey', 'siteId', ]));
    // expect(values).toEqual(expect.arrayContaining([ 'https://sso.haaretz.co.il', 'tmsso', '80', ]));
  });

  it("should throw an error if there isn't a defined site configuration for the current domain", () => {
    const oldHostname = window.location.href;
    // Object.defineProperty(window.location, 'hostname', {
    //   value: undefined,
    //   writable: true,
    // });
    jsdom.reconfigure({ url: 'http://example.com', });
    let map;
    expect(() => {
      // console.log(window.location.hostname);
      map = createSiteConfig();
      console.log(map);
    }).toThrow();
    jsdom.reconfigure({ url: oldHostname, });
    // Object.defineProperty(window.location, 'hostname', {
    //   value: oldHostname,
    //   writable: true,
    // });
    // const map = createSiteConfig();
    // const keys = Object.keys(map);
    // const values = Object.values(map);
    // expect(keys).toEqual(expect.arrayContaining([ 'ssoDomain', 'ssoKey', 'siteId', ]));
    // expect(values).toEqual(expect.arrayContaining([ 'https://sso.haaretz.co.il', 'tmsso', '80', ]));
  });
});
