/* global window, document */
/* eslint-disable no-return-assign */
import 'jest-matcher-one-of';
import { CookieUtils, } from '@haaretz/htz-user-utils';
import User from './user';
import globalConfig from '../__mocks__/globalConfig.mock';
import CookieData from '../__mocks__/cookie-utils.mock';

const deleteAllCookies = CookieUtils.deleteAllCookies;

describe(' DfpUser module', () => {
  let user;
  beforeAll(done => {
    deleteAllCookies();
    done();
  });
  describe(' HTZ & TM', () => {
    describe(' An anonymous user', () => {
      beforeAll(done => {
        deleteAllCookies();
        // CookieData.htzAnonCookie.split(';').map(cookie => document.cookie = cookie);
        user = new User(globalConfig);
        done();
      });
      it('should not be undefined', () => {
        expect(user).toBeDefined();
      });

      it('should be a object', () => {
        expect(user).toEqual(expect.any(Object));
      });

      it('should have a user type string property ', () => {
        expect(user.type).toEqual(expect.any(String))
          && expect(user.type).toBeDefined();
      });

      it('should have an impression manager initialized ', () => {
        expect(user.impressionManager).toEqual(expect.any(Object));
      });

      it('can never have an age property', () => {
        expect(user.age).toBeUndefined();
      });

      it('can never have a gender property', () => {
        expect(user.gender).toBeUndefined();
      });
    });

    describe(' Registered user', () => {
      beforeAll(done => {
        deleteAllCookies();
        CookieData.htzRegisteredCookie
          .split(';')
          .map(cookie => (document.cookie = cookie));
        user = new User(globalConfig);
        done();
      });

      it('should not be undefined', () => {
        expect(user).toBeDefined();
      });

      it('should be a object', () => {
        expect(user).toEqual(expect.any(Object));
      });

      it('should have a user type string property ', () => {
        expect(user.type).toEqual(expect.any(String))
          && expect(user.type).toBeDefined();
      });

      it('should have an impression manager initialized ', () => {
        expect(user.impressionManager).toEqual(expect.any(Object));
      });

      it('should have an age property within 1-120', () => {
        expect(user.age).toEqual(expect.any(Number))
          && expect(user.age > 1).toEqual(true)
          && expect(user.age < 120).toEqual(true);
      });

      it('should have an gender property that is either 1 or 2', () => {
        expect(user.gender).toBeOneOf([ 1, 2, ]);
      });
    });

    describe(' Paying user', () => {
      beforeAll(done => {
        deleteAllCookies();
        CookieData.htzPayingCookie
          .split(';')
          .map(cookie => (document.cookie = cookie));
        user = new User(globalConfig);
        done();
      });

      it('should not be undefined', () => {
        expect(user).toBeDefined();
      });

      it('should be a object', () => {
        expect(user).toEqual(expect.any(Object));
      });

      it('should have a user type string property ', () => {
        expect(user.type).toEqual(expect.any(String))
          && expect(user.type).toBeDefined();
      });

      it('should have an impression manager initialized ', () => {
        expect(user.impressionManager).toEqual(expect.any(Object));
      });

      it('should have an age property within 1-120', () => {
        expect(user.age).toEqual(expect.any(Number))
          && expect(user.age > 1).toEqual(true)
          && expect(user.age < 120).toEqual(true);
      });

      it('should have an gender property that is either 1 or 2', () => {
        expect(user.gender).toBeOneOf([ 1, 2, ]);
      });
    });
  });

  describe(' HDC', () => {
    describe(' Anonymous user', () => {
      beforeAll(done => {
        deleteAllCookies();
        CookieData.hdcAnonCookie
          .split(';')
          .map(cookie => (document.cookie = cookie));
        user = new User(globalConfig);
        done();
      });
      it('should not be undefined', () => {
        expect(user).toBeDefined();
      });

      it('should be a object', () => {
        expect(user).toEqual(expect.any(Object));
      });

      it('should have a user type string property ', () => {
        expect(user.type).toEqual(expect.any(String))
          && expect(user.type).toBeDefined();
      });

      it('should have an impression manager initialized ', () => {
        expect(user.impressionManager).toEqual(expect.any(Object));
      });

      it('can never have an age property', () => {
        expect(user.age).toBeUndefined();
      });

      it('can never have a gender property', () => {
        expect(user.gender).toBeUndefined();
      });
    });

    describe('Registered user', () => {
      beforeAll(done => {
        deleteAllCookies();
        CookieData.hdcRegisteredCookie
          .split(';')
          .map(cookie => (document.cookie = cookie));
        user = new User(globalConfig);
        done();
      });
      it('should not be undefined', () => {
        expect(user).toBeDefined();
      });

      it('should be a object', () => {
        expect(user).toEqual(expect.any(Object));
      });

      it('should have a user type string property ', () => {
        expect(user.type).toEqual(expect.any(String))
          && expect(user.type).toBeDefined();
      });

      it('should have an impression manager initialized ', () => {
        expect(user.impressionManager).toEqual(expect.any(Object));
      });

      it('should have an age property within 1-120', () => {
        expect(user.age).toEqual(expect.any(Number))
          && expect(user.age > 1).toEqual(true)
          && expect(user.age < 120).toEqual(true);
      });

      it('should have an gender property that is either 1 or 2', () => {
        expect(user.gender).toBeOneOf([ 1, 2, ]);
      });
    });

    describe('Paying user', () => {
      beforeAll(done => {
        deleteAllCookies();
        CookieData.hdcPayingCookie
          .split(';')
          .map(cookie => (document.cookie = cookie));
        user = new User(globalConfig);
        done();
      });
      it('should not be undefined', done => {
        expect(user).toBeDefined();
        done();
      });

      it('should be a object', done => {
        expect(user).toEqual(expect.any(Object));
        done();
      });

      it('should have a user type string property ', () => {
        expect(user.type).toEqual(expect.any(String));
      });

      it('should have an impression manager initialized ', () => {
        expect(user.impressionManager).toEqual(expect.any(Object));
      });

      it('should have an age property within 1-120', () => {
        expect(user.age).toEqual(expect.any(Number))
          && expect(user.age > 1).toEqual(true)
          && expect(user.age < 120).toEqual(true);
      });

      it('should have an gender property that is either 1 or 2', () => {
        expect(user.gender).toBeOneOf([ 1, 2, ]);
      });
    });
  });
});
