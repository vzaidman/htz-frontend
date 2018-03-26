/* global document Event */
import UserService from './user-services';
import UserFactory from '../user-factory-cookie-based';
import {
  loginSuccessResponse,
  logoutSuccessResponse,
  loginFailureResponse,
  loginFailureServiceData,
} from './__mocks__/sso.mock';
import CookieData from '../util/__mocks__/cookie-utils.mock';
import {
  setCookie,
  plantCookie,
  deleteAllCookies,
  getCookie,
} from '../util/cookie-utils';
import { UserTypes, } from '../user';
import { getSubdomain, } from '../util/domain-utils';

const fetch = global.fetch;

function handleImgOnload(params) {
  console.log('handleImageOnLoadCalled!');
}
function createUserService(
  { plantImagesCallback, onImageLoadCallback, } = {
    plantCookie,
    handleImgOnload,
  }
) {
  return new UserService({
    plantImagesCallback,
    onImageLoadCallback,
  });
}

describe('UserFactory CookieBased Module', () => {
  it('should have a login, logout and register functions', () => {
    const userService = createUserService();
    expect(typeof userService.logout).toBe('function');
    expect(typeof userService.login).toBe('function');
    expect(typeof userService.register).toBe('function');
    expect(userService).toEqual(
      expect.objectContaining({
        login: expect.any(Function),
        logout: expect.any(Function),
        register: expect.any(Function),
      })
    );
  });

  describe('sso data failures', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });
    it('should reject on login if the response data is corrupt', async () => {
      const userService = createUserService();
      fetch.resetMocks();
      fetch.mockResponses([ loginFailureResponse, ]);
      const credentials = {
        username: 'test@haaretz.com',
        password: '1231234',
      };
      await expect(userService.login(credentials)).rejects.toThrow(
        new Error(loginFailureServiceData)
      );
    });

    it('should reject on logout method if the response data is corrupt', async () => {
      const userService = createUserService();
      fetch.resetMocks();
      fetch.mockResponses([ loginFailureResponse, ]);
      await expect(userService.logout()).rejects.toThrow(
        new Error(loginFailureServiceData)
      );
    });

    it('should reject on register method if the response data is corrupt', async () => {
      const userService = createUserService();
      fetch.resetMocks();
      fetch.mockResponses([ loginFailureResponse, ]);
      // user
      const formData = {
        email: 'test@haaretz.com',
        password: '21212121',
        confirmPassword: '21212121',
        firstName: 'oren',
        lastName: 'sadi',
        mobilePrefix: '055',
        mobileNumber: '55555555',
        termsChk: true,
        gRecaptchaResponse: 'something',
        user: undefined,
      };
      await expect(userService.register(formData)).rejects.toThrow(
        new Error(loginFailureServiceData)
      );
    });
  });

  describe('login service', () => {
    const credentials = {
      username: 'test@haaretz.com',
      password: '1231234',
    };
    let anonymousId;

    beforeEach(() => {
      fetch.resetMocks();
    });

    it('should be able to login with a valid username and password', async () => {
      fetch.mockResponses([ loginSuccessResponse, ]);
      // expect(document.cookie).toEqual('');
      const spy = jest.fn();
      const userService = createUserService({
        plantImagesCallback: () => {
          expect(spy).not.toHaveBeenCalled();
          return Promise.resolve();
        },
        onImageLoadCallback: () => {
          spy();
          expect(document.cookie).toEqual(CookieData.htzPayingCookie);
        },
      });
      deleteAllCookies();
      CookieData.htzPayingCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      await userService.login(credentials).catch(error => {
        expect(error).toBeInstanceOf(TypeError);
      });
      expect(spy).toHaveBeenCalled();
      expect(document.cookie).not.toEqual('');
      const newUser = new UserFactory(true).build();
      expect(newUser.type).toEqual(UserTypes.paying);
    });

    it('should fill in an anonymousId', () => {
      expect(anonymousId).toBeUndefined();
      const newUser = new UserFactory(true).build();
      anonymousId = newUser.anonymousId;
      expect(anonymousId).toBeDefined();
    });

    it("should accept a current user's anonymousId", () => {
      // Set up old anonymousId
      expect(anonymousId).toBeDefined();
      const oldAnonymousId = anonymousId;
      const factory = new UserFactory(true);
      const aUser = factory.build();
      const newAnonymousId = '01189998819991197253';
      aUser.anonymousId = newAnonymousId;
      // Mock responses
      fetch.mockResponses([ loginSuccessResponse, ]);
      deleteAllCookies();
      document.cookie = '';
      // expect(document.cookie).toEqual('');
      const userService = createUserService();
      CookieData.htzPayingCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      const now = Date.now();
      const expire = new Date(now + 7776000000); // 90 * 24 * 3600 * 1000 = 7776000000 = 90 days
      const domain = getSubdomain();
      setCookie('anonymousId', newAnonymousId, '/', domain, expire);
      credentials.user = aUser;
      const newCredentials = { ...credentials, user: aUser, };

      userService
        .login(newCredentials)
        .then(() => {
          expect(document.cookie).toEqual('');
        })
        .catch(error => {
          expect(error).toBeDefined();
        });
      expect(document.cookie).not.toEqual('');
      factory.refreshFactoryInstance();
      const newUser = factory.build();
      expect(newUser.anonymousId).toEqual(newAnonymousId);
      expect(newUser.anonymousId).not.toEqual(oldAnonymousId);
      setCookie('anonymousId', '', '/', domain, new Date(Date.now - 1000));
    });
  });

  describe('logout service', async () => {
    it('should be able to logout', () => {
      fetch.mockResponses([ logoutSuccessResponse, ]);
      deleteAllCookies();
      const userService = createUserService({
        plantImagesCallback: () => {
          deleteAllCookies();
          return Promise.resolve();
        },
        onImageLoadCallback: () => {
          expect(document.cookie).toEqual('');
        },
      });

      CookieData.htzPayingCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      expect(() => {
        userService.logout();
      }).not.toThrow();
      const newUser = new UserFactory(true).build();
      expect(newUser.type).toEqual(UserTypes.paying);
    });
  });

  describe('register service', async () => {
    it('should be able to register a new user', () => {
      fetch.mockResponses([ loginSuccessResponse, ]);
      deleteAllCookies();
      const spy = jest.fn();
      const userService = createUserService({
        plantImagesCallback: () => {
          expect(spy).not.toHaveBeenCalled();
          return Promise.resolve();
        },
        onImageLoadCallback: () => {
          spy();
          expect(document.cookie).toEqual(
            `${CookieData.htzPayingCookie}; anonymousId=${getCookie(
              'anonymousId'
            )}`
          );
        },
      });

      CookieData.htzPayingCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      // user
      const formData = {
        email: 'test@haaretz.com',
        password: '21212121',
        confirmPassword: '21212121',
        firstName: 'oren',
        lastName: 'sadi',
        mobilePrefix: '055',
        mobileNumber: '55555555',
        termsChk: true,
        gRecaptchaResponse: 'something',
        user: undefined,
      };
      userService.register(formData).then(result => {
        expect(spy).toHaveBeenCalled();
      });

      const event = new Event('load');

      Array.from(document.getElementsByClassName('login-cookie')).forEach(e => {
        e.dispatchEvent(event);
      });
      const newUser = new UserFactory(true).build();
      expect(newUser.type).toEqual(UserTypes.paying);
    });
  });
});
