/* global window */
import User, { UserTypes, } from './user';
import { generateAnonymousId, } from './user-factory-cookie-based';

describe('User', () => {
  const anonymousId = generateAnonymousId();
  it('should have three basic user types: paying, registered and anonymous', () => {
    expect(UserTypes).toBeDefined();
    expect(UserTypes.anonymous).toEqual('anonymous');
    expect(UserTypes.registered).toEqual('registered');
    expect(UserTypes.paying).toEqual('paying');
  });

  it('should not be able to instantiate a User without a type', () => {
    expect(() => new User()).toThrow();
  });

  it('should not be able to instantiate a User with an invalid type', () => {
    expect(() => new User({ type: 'anything', })).toThrow();
  });

  it('should not be be able to instantiate a User without an anonymousId', () => {
    expect(() => {
      const [ anonUser, regUser, payingUser, ] = [
        new User({ type: UserTypes.anonymous, }),
        new User({ type: UserTypes.registered, }),
        new User({ type: UserTypes.paying, }),
      ];
      expect(anonUser).toBeDefined();
      expect(regUser).toBeDefined();
      expect(payingUser).toBeDefined();
      return null;
    }).toThrow();
  });
  it('should be be able to instantiate a User with a valid type', () => {
    expect(() => {
      const [ anonUser, regUser, payingUser, ] = [
        new User({ type: UserTypes.anonymous, anonymousId, }),
        new User({ type: UserTypes.registered, anonymousId, }),
        new User({ type: UserTypes.paying, anonymousId, }),
      ];
      expect(anonUser).toBeDefined();
      expect(regUser).toBeDefined();
      expect(payingUser).toBeDefined();
      return null;
    }).not.toThrow();
  });
  describe('User Options', () => {
    const userOptionsValidPayingUser = {
      type: UserTypes.paying,
      anonymousId: '999999',
      userId: '1337',
      userName: 'e@ma.il',
      firstName: 'first',
      lastName: 'last',
      emailValidity: 'valid',
      ticketId: 'someToken',
    };
    const userOptionsInvalidPayingUser = {
      type: UserTypes.paying,
      anonymousId: '999999',
      id: '1337',
      username: 'e@ma.il',
      firstname: 'first',
      lastname: 'last',
      emailvalidity: 'valid',
      ticketid: 'someToken',
    };
    it('should have properties for Paying User with valid paying user userOptions', () => {
      const payingUser = new User(userOptionsValidPayingUser);
      expect(payingUser).toBeDefined();
      expect(Object.values(payingUser)).toEqual(
        expect.arrayContaining(Object.values(userOptionsValidPayingUser))
      );
      // Mapping of userObject properties to different properties on the user object:
      expect(Object.keys(payingUser)).not.toEqual(
        expect.arrayContaining(Object.keys(userOptionsValidPayingUser))
      );

      expect(Object.keys(payingUser)).toEqual(
        expect.arrayContaining([
          'type',
          'anonymousId',
          'id',
          'email',
          'firstName',
          'lastName',
          'emailValidity',
          'token',
        ])
      );
    });

    it(
      'should have undefined properties for a Paying User' +
        'when partially invalid paying user userOptions is passed',
      () => {
        const payingUser = new User(userOptionsInvalidPayingUser);
        expect(payingUser).toBeDefined();
        const values = Object.values(userOptionsValidPayingUser).map(
          x => undefined
        );
        values.type = UserTypes.paying;

        expect(Object.values(payingUser)).toEqual(
          expect.arrayContaining(values)
        );
        // Mapping of userObject properties to different properties on the user object:
        expect(Object.keys(payingUser)).not.toEqual(
          expect.arrayContaining(Object.keys(userOptionsValidPayingUser))
        );

        expect(Object.keys(payingUser)).toEqual(
          expect.arrayContaining([
            'type',
            'anonymousId',
            'id',
            'email',
            'firstName',
            'lastName',
            'emailValidity',
            'token',
          ])
        );
      }
    );
  });
});
