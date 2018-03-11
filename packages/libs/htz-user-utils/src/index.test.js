/* global window */
import * as Index from './index';
import { UserTypes, } from './user';
import UserFactory from './user-factory-cookie-based';
import UserService from './service/user-services';
import AbuseService from './service/abuse-service';
import { getSubdomain, } from './util/domain-utils';
import {
  setCookie,
  getCookieAsMap,
  getCookie,
  plantCookie,
  deleteAllCookies,
} from './util/cookie-utils';

describe('Index', () => {
  it('should expose a siteConfig function', () => {
    expect(Index.siteConfig).toBeDefined();
    expect(typeof Index.siteConfig).toEqual('function');
  });
  it('should expose a UserFactory', () => {
    expect(Index.UserFactory).toBeDefined();
    expect(new Index.UserFactory()).toBeInstanceOf(UserFactory);
  });

  it('should expose a UserService', () => {
    expect(UserService).toBeDefined();
    expect(Index.UserService).toBeDefined();
    expect(new Index.UserService()).toEqual(
      expect.objectContaining({
        login: expect.any(Function),
        logout: expect.any(Function),
        register: expect.any(Function),
      })
    );
  });

  it('should expose a AbuseService', () => {
    expect(Index.AbuseService).toBeDefined();
    expect(Index.AbuseService).toEqual(AbuseService);
  });

  it('should expose a DomainUtils', () => {
    expect(Index.DomainUtils).toBeDefined();
    expect(Index.DomainUtils.getSubdomain).toBeDefined();
    expect(Index.DomainUtils.getSubdomain).toEqual(getSubdomain);
  });

  it('should expose a CookieUtils', () => {
    expect(Index.CookieUtils).toBeDefined();
    expect(Index.CookieUtils.default).toBeDefined();
    expect(Index.CookieUtils.default).toEqual(getCookieAsMap);

    expect(Index.CookieUtils.getCookieAsMap).toBeDefined();
    expect(Index.CookieUtils.getCookieAsMap).toEqual(getCookieAsMap);

    expect(Index.CookieUtils.setCookie).toBeDefined();
    expect(Index.CookieUtils.setCookie).toEqual(setCookie);

    expect(Index.CookieUtils.getCookie).toBeDefined();
    expect(Index.CookieUtils.getCookie).toEqual(getCookie);

    expect(Index.CookieUtils.plantCookie).toBeDefined();
    expect(Index.CookieUtils.plantCookie).toEqual(plantCookie);

    expect(Index.CookieUtils.deleteAllCookies).toBeDefined();
    expect(Index.CookieUtils.deleteAllCookies).toEqual(deleteAllCookies);
  });

  it('should expose the UserTypes object', () => {
    expect(Index.UserTypes).toBeDefined();
    expect(Index.UserTypes).toEqual(UserTypes);
  });
});
