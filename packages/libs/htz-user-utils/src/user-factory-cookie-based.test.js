/* global document */
import UserFactory from './user-factory-cookie-based';
import User, { UserTypes, } from './user';
import { deleteAllCookies, } from './util/cookie-utils';
import CookieData from './util/__mocks__/cookie-utils.mock';

describe('UserFactory CookieBased Module', () => {
  let userFactory;
  beforeEach(() => {
    userFactory = new UserFactory(true);
  });

  it('should initialize a factory correctly', () => {
    expect(userFactory).toBeDefined();
  });

  it('should build an anonymous user by default', () => {
    const user = userFactory.build();
    expect(user.type).toEqual(UserTypes.anonymous);
  });

  describe('a corrupted user cookie', () => {
    beforeAll(done => {
      deleteAllCookies();
      CookieData.corruptedCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      done();
    });

    it("should not throw an error when calling 'build'", () => {
      expect(() => {
        const factory = new UserFactory(true);
        factory.build();
      }).not.toThrow();
    });

    it("should create an object when calling 'build'", () => {
      const factory = new UserFactory(true);
      const user = factory.build();
      expect(user).toBeDefined();
    });

    it("should create and return a User object when calling 'build'", () => {
      const factory = new UserFactory(true);
      const user = factory.build();
      expect(user).toBeInstanceOf(User);
    });

    it("should create and return an anonymous User object when calling 'build'", () => {
      const factory = new UserFactory(true);
      const user = factory.build();
      expect(user.type).toEqual(UserTypes.anonymous);
    });
  });

  describe('an Anonymous user cookie', () => {
    beforeAll(done => {
      deleteAllCookies();
      CookieData.htzAnonCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      done();
    });

    it("should create and return User object when calling 'build'", () => {
      const factory = new UserFactory(true);
      const user = factory.build();
      expect(user).toBeDefined();
      expect(user).toBeInstanceOf(User);
    });

    describe('a User Object', () => {
      const factory = new UserFactory(true);
      const user = factory.build();
      expect(user).toBeDefined();
      expect(user).toBeInstanceOf(User);
      it("should create and return User object when calling 'build'", () => {});
    });
  });

  describe('a Payer user cookie', () => {
    beforeAll(done => {
      deleteAllCookies();
      CookieData.htzPayingCookie.split(';').map(cookie => {
        document.cookie = cookie;
        return document.cookie;
      });
      done();
    });

    it("should create and return User object when calling 'build'", () => {
      const factory = new UserFactory(true);
      const user = factory.build();
      expect(user).toBeDefined();
      expect(user).toBeInstanceOf(User);
    });

    describe('a User Object', () => {
      const factory = new UserFactory(true);
      let user;
      let anotherUser;
      it("should create and return User object when calling 'build'", () => {
        user = factory.build();
        expect(user).toBeDefined();
        expect(user).toBeInstanceOf(User);
      });

      it("should create separate instances of users upon 'build'", () => {
        anotherUser = factory.build();
        expect(anotherUser).toBeDefined();
        expect(anotherUser).toBeInstanceOf(User);
        expect(user).toEqual(anotherUser);
      });
      const payingUserProps = [
        'type',
        'anonymousId',
        'id',
        'email',
        'firstName',
        'lastName',
        'emailValidity',
        'token',
      ];
      it(`should have the following properties: ${payingUserProps}`, () => {
        const factory1 = new UserFactory(true);
        user = factory1.build();
        expect(user).toBeDefined();
        expect(user).toBeInstanceOf(User);
        // console.log(Object.keys(user));
        payingUserProps.forEach(prop =>
          expect(Object.keys(user)).toContain(prop)
        );
      });
    });
  });
});
