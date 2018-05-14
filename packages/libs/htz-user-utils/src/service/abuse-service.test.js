/* global window, document, localStorage, fetch, jsdom, Event */
import AbuseService, { initiateAbuserLogic, } from './abuse-service';
import CookieData from '../util/__mocks__/cookie-utils.mock';
import { deleteAllCookies, } from '../util/cookie-utils';
import {
  abuseClearedResponse,
  abuseDetectionResponse,
  logoutSuccessResponse,
} from './__mocks__/sso.mock';

const abuseService = new AbuseService();

describe('AbuseService Module', () => {
  it('should export correctly', () => {
    expect(abuseService).toBeDefined();
    expect(abuseService).toBeInstanceOf(AbuseService);
    expect(initiateAbuserLogic).toBeDefined();
    expect(typeof initiateAbuserLogic).toBe('function');
  });

  it("should have an 'activate' class method", () => {
    expect(typeof abuseService.activate).toBeDefined();
    expect(typeof abuseService.activate).toBe('function');
  });

  it("should have an 'getSsoOnAbusePage' class static method", () => {
    expect(typeof AbuseService.getSsoOnAbusePage).toBeDefined();
    expect(typeof AbuseService.getSsoOnAbusePage).toBe('function');
  });

  it("should not throw on calling 'activate'", () => {
    expect(() => {
      abuseService.activate();
    }).not.toThrow();
  });

  describe('method: getSsoOnAbusePage', () => {
    let origHref;
    beforeAll(() => {
      origHref = window.location.href;
    });
    afterAll(() => {
      jsdom.reconfigure({ url: origHref, });
      // Object.defineProperty(window.location, 'href', {
      //   value: origHref,
      //   writable: true,
      // });
    });

    it("should not throw on calling 'getSsoOnAbusePage'", () => {
      expect(() => {
        AbuseService.getSsoOnAbusePage();
      }).not.toThrow();
    });

    it('should return null if there was no previousely set data at localStorage', () => {
      expect(AbuseService.getSsoOnAbusePage()).toEqual(null);
    });

    it("should return a properly parsed object if there was a previousely set data at localStorage, and the href contains 'abuse-login'", () => {
      const item = { em: 'hello@haaretz.co.il', id: '123', };
      localStorage.setItem('__uaem', JSON.stringify(item));
      jsdom.reconfigure({ url: 'http://www.haaretz.co.il/abuse-login', });
      expect(AbuseService.getSsoOnAbusePage()).toEqual(item.id);
    });
  });

  describe('method: activate', () => {
    let origHref;
    let overrideImageOnLoad;

    beforeAll(() => {
      origHref = window.location.href;
    });
    afterAll(() => {
      Object.defineProperty(window.location, 'href', {
        value: origHref,
        writable: true,
      });
    });

    beforeEach(() => {
      deleteAllCookies();
      fetch.resetMocks();
    });

    it('should not detect abuse for this paying user', () => {
      CookieData.htzPayingCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      fetch.mockResponses([ abuseClearedResponse, ]);
      overrideImageOnLoad = jest.fn();
      const abuseService2 = new AbuseService(overrideImageOnLoad);
      abuseService2.activate();
      expect(overrideImageOnLoad).not.toHaveBeenCalled();
    });

    it('should detect abuse for this paying user', async () => {
      CookieData.htzPayingAbuserCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      fetch.mockResponses([ abuseDetectionResponse, ], [ logoutSuccessResponse, ]);
      overrideImageOnLoad = jest.fn();
      const abuseService2 = new AbuseService(
        imageArr => Promise.resolve(imageArr),
        overrideImageOnLoad
      );
      await abuseService2.activate().then(result => {
        expect(overrideImageOnLoad).toHaveBeenCalled();
      });
      const event = new Event('load');

      Array.from(document.getElementsByClassName('login-cookie')).forEach(e => {
        console.log("calling 'load' on ", e);
        e.dispatchEvent(event);
      });
    });
  });
});
