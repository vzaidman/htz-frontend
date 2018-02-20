/* global document, Event, fetch */
import getCookieAsMap, {
  plantCookie,
  getCookie,
  setCookie,
  deleteAllCookies,
} from './cookie-utils';
import CookieData from './__mocks__/cookie-utils.mock';
import { imageSuccessResponse, } from '../service/__mocks__/sso.mock';

let map;
let ssoKey = 'tmsso';

describe('cookieUtilModule', () => {
  describe('HTZ & TM tests', () => {
    beforeAll(() => {
      ssoKey = 'tmsso';
    });
    describe('Anonymous user cookie', () => {
      beforeAll(done => {
        deleteAllCookies();
        CookieData.htzAnonCookie.split(';').map(cookie => {
          document.cookie = cookie;
          return document.cookie;
        });
        done();
      });
      test('should not throw an error', () => {
        expect(getCookieAsMap).not.toThrowError();
      });

      test('should be a function', () => {
        expect(typeof getCookieAsMap).toBe('function');
      });

      test('should parse a regular cookie correctly', () => {
        map = getCookieAsMap();
        expect(typeof map).toBe('object');
      });

      test(`should not have an ${ssoKey} key`, () => {
        map = getCookieAsMap();
        expect(map[ssoKey]).toBeUndefined();
      });
    });

    describe('Registered user cookie', () => {
      ssoKey = 'tmsso';
      beforeAll(done => {
        deleteAllCookies();
        CookieData.htzRegisteredCookie.split(';').map(cookie => {
          document.cookie = cookie;
          return document.cookie;
        });
        map = getCookieAsMap(true);
        done();
      });

      it('should not throw an error', () => {
        expect(getCookieAsMap).not.toThrow();
      });

      it('should be a function', () => {
        expect(typeof getCookieAsMap).toBe('function');
      });

      it('should parse a valid cookie correctly', () => {
        expect(typeof map).toBe('object');
      });

      it('parsed map should contain a valid cookie correctly', () => {
        expect(map[ssoKey]).not.toBe('string') &&
          expect(map[ssoKey]).toBe('object');
      });
      describe(`'${ssoKey}' map`, () => {
        let ssoMap;
        beforeAll(done => {
          map = getCookieAsMap(true);
          ssoMap = map[ssoKey];
          done();
        });
        it('should have a userId', () => {
          expect(ssoMap.userId).not.toBe(undefined) &&
            expect(ssoMap.userId).toEqual('8738500615');
        });
        it('should contain the following keys: userId, userName, firstName, lastName', () => {
          expect(Object.keys(ssoMap)).toEqual(
            expect.arrayContaining([
              'userId',
              'userName',
              'firstName',
              'lastName',
            ])
          );
        });
      });
    });

    describe('Paying user cookie', () => {
      let ssoMap;
      ssoKey = 'tmsso';
      beforeAll(done => {
        deleteAllCookies();
        CookieData.htzPayingCookie.split(';').map(cookie => {
          document.cookie = cookie;
          return document.cookie;
        });
        map = getCookieAsMap(true);
        ssoMap = map[ssoKey];
        done();
      });

      it('should not throw an error', () => {
        expect(getCookieAsMap).not.toThrow();
      });

      it('should be a function', () => {
        expect(typeof getCookieAsMap).toBe('function');
      });

      it('should parse a valid cookie correctly', () => {
        expect(typeof map).toBe('object');
      });

      it('parsed map should contain a valid ssoMap', () => {
        expect(typeof map[ssoKey]).toBe('object');
      });

      it('should contain the HtzPusr key', () => {
        expect(Object.keys(map)).toEqual(expect.arrayContaining([ 'HtzPusr', ]));
      });

      describe(`'${ssoKey}' map`, () => {
        it('should have a userId = 3057469657', () => {
          expect(ssoMap.userId).toEqual('3057469657');
        });
        it('should contain the following keys: userId, userName, firstName, lastName', () => {
          expect(Object.keys(ssoMap)).toEqual(
            expect.arrayContaining([
              'userId',
              'userName',
              'firstName',
              'lastName',
            ])
          );
        });
      });
    });
  });

  describe('HDC tests', () => {
    beforeAll(() => {
      ssoKey = 'engsso';
    });
    describe('Anonymous user cookie', () => {
      beforeAll(done => {
        deleteAllCookies();
        CookieData.hdcAnonCookie.split(';').map(cookie => {
          document.cookie = cookie;
          return document.cookie;
        });
        map = getCookieAsMap();
        // ssoMap = map[ssoKey];
        done();
      });
      it('should not throw an error', () => {
        expect(getCookieAsMap).not.toThrow();
      });

      it('should be a function', () => {
        expect(typeof getCookieAsMap).toBe('function');
      });

      it('should parse a regular cookie correctly', () => {
        expect(typeof map).toBe('object');
      });

      it(`should not have an ${ssoKey} key`, () => {
        expect(map[ssoKey]).toBeUndefined();
      });
    });

    describe('Registered user cookie', () => {
      ssoKey = 'engsso';
      beforeAll(done => {
        deleteAllCookies();
        CookieData.hdcRegisteredCookie.split(';').map(cookie => {
          document.cookie = cookie;
          return document.cookie;
        });
        map = getCookieAsMap(true);
        done();
      });

      it('should not throw an error', () => {
        expect(getCookieAsMap).not.toThrow();
      });

      it('should be a function', () => {
        expect(typeof getCookieAsMap).toBe('function');
      });

      it('should parse a valid cookie correctly', () => {
        map = getCookieAsMap();
        expect(typeof map).toBe('object');
      });

      it('parsed map should contain a valid cookie correctly', () => {
        map = getCookieAsMap();
        expect(typeof map[ssoKey]).toBe('object');
      });
      describe(`'${ssoKey}' map`, () => {
        let ssoMap;
        ssoKey = 'engsso';
        beforeAll(done => {
          map = getCookieAsMap(true);
          ssoMap = getCookieAsMap()[ssoKey];
          done();
        });
        it('should have a userId', () => {
          expect(ssoMap.userId).toEqual('8738500615');
        });
        it('should contain the following keys: userId, userName, firstName, lastName', () => {
          expect(Object.keys(ssoMap)).toEqual(
            expect.arrayContaining([
              'userId',
              'userName',
              'firstName',
              'lastName',
            ])
          );
        });
      });
    });

    describe('Paying user cookie', () => {
      let ssoMap;
      ssoKey = 'engsso';
      beforeAll(done => {
        deleteAllCookies();
        CookieData.hdcPayingCookie.split(';').map(cookie => {
          document.cookie = cookie;
          return document.cookie;
        });
        map = getCookieAsMap(true);
        ssoMap = getCookieAsMap()[ssoKey];
        done();
      });

      it('should not throw an error', () => {
        expect(getCookieAsMap).not.toThrow();
      });

      it('should be a function', () => {
        expect(typeof getCookieAsMap).toBe('function');
      });

      it('should parse a valid cookie correctly', () => {
        expect(typeof map).toBe('object');
      });

      it('parsed map should contain a valid ssoMap', () => {
        expect(typeof map[ssoKey]).toBe('object');
      });

      it('should contain the HdcPusr key', () => {
        expect(Object.keys(map)).toEqual(expect.arrayContaining([ 'HdcPusr', ]));
      });

      describe(`'${ssoKey}' map`, () => {
        it('should have a userId = 3057469657', () => {
          expect(ssoMap.userId).toEqual('3057469657');
        });
        it('should contain the following keys: userId, userName, firstName, lastName', () => {
          expect(Object.keys(ssoMap)).toEqual(
            expect.arrayContaining([
              'userId',
              'userName',
              'firstName',
              'lastName',
            ])
          );
        });
      });
    });
  });
  afterAll(done => {
    deleteAllCookies();
    done();
  });

  describe('plantCookie', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it('should return a promise', () => {
      expect(plantCookie(imageSuccessResponse)).toBeInstanceOf(Promise);
    });

    it("should resolve to 'undefined' when the 'load' event occurs", async () => {
      const retVal = plantCookie(imageSuccessResponse);
      const event = new Event('load');
      Array.from(document.getElementsByClassName('login-cookie'))
        .pop()
        .dispatchEvent(event);
      await expect(retVal).resolves.toBe(undefined);
    });

    it("should plant a cookie using an image element's response headers", async () => {
      const retVal = plantCookie(imageSuccessResponse);
      const event = new Event('error');
      expect(retVal).toBeInstanceOf(Promise);
      Array.from(document.getElementsByClassName('login-cookie'))
        .pop()
        .dispatchEvent(event);
      await expect(retVal).rejects.toBe(undefined);
    });
  });

  describe('getCookie \\ setCookie', () => {
    it('should be able to set a cookie properly', () => {
      expect(() => {
        setCookie(
          'test',
          'value',
          '',
          document.location.hostname,
          new Date(Date.now + 3600)
        );
      }).not.toThrow();
    });

    it('should be able to read the previously set cookie properly', () => {
      let val;
      expect(() => {
        val = getCookie('test', true);
      }).not.toThrow();
      expect(val).toEqual('value');
    });

    it('should be able to set an additional cookie properly', () => {
      expect(() => {
        setCookie('test2', 'value2', '', document.location.hostname);
      }).not.toThrow();
    });

    it("should not have to re-parse the cookie when 'forceRefresh' is set to false", () => {
      let val;
      expect(() => {
        val = getCookie('test2', false);
      }).not.toThrow();
      expect(val).toEqual('value2');
    });
  });
});
