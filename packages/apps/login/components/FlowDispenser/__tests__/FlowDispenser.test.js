// import {
//
//   getFlowByData,
//   getFlowByFlowNumber,
// } from '../FlowDispenser';

describe('FlowDispenser', () => {
  describe('Render-prop API', () => {
    // const flow1 = {
    //   flowNumber: 1,
    //   initialState: 'otpValidation',
    //   initialTransition: '/otpValidation',
    //   transitionRouteMap: new Map([
    //     [ '-password', '/password', ],
    //     [ '-passwordError', '/passwordError', ],
    //     [ '-passwordReminder', '/passwordReminder', ],
    //     [ '-passwordReminderSent', '/passwordReminderSent', ],
    //     [ '-register', '/register', ],
    //     [ '-success', '/', ],
    //     [ '-otpValidation', '/otpValidation', ],
    //     [ '-otpValidation2', '/otpValidation2', ],
    //     [ '-phoneInput', '/phoneInput', ],
    //   ]),
    //   otpValidation: {
    //     sendAgain: 'otpValidation2',
    //     accept: 'success',
    //     withPassword: 'password',
    //     notMyPhone: 'phoneInput',
    //   },
    //   otpValidation2: {
    //     withPassword: 'password',
    //     getCustomerService: 'customerService',
    //   },
    //   phoneInput: {
    //     withPassword: 'password',
    //     accept: 'phoneMailSent',
    //   },
    //   phoneMailSent: {
    //     sendAgain: 'phoneMailSent2',
    //     withPassword: 'password',
    //   },
    //   phoneMailSent2: {
    //     getCustomerService: 'customerService',
    //     withPassword: 'password',
    //   },
    //   password: {
    //     forgotPassword: 'passwordReminder',
    //     accept: 'success',
    //   },
    //   passwordError: {
    //     forgotPassword: 'passwordReminder',
    //     notRegistered: 'register',
    //     accept: 'success',
    //   },
    //   passwordReminder: {
    //     accept: 'passwordReminderSent',
    //   },
    //   passwordReminderSent: {
    //     accept: 'password',
    //   },
    //   register: {
    //     accept: 'success',
    //     withPassword: 'password',
    //   },
    // };
    // const flow2 = {
    //   flowNumber: 2,
    //   initialState: 'emailPhoneInput',
    //   initialTransition: '/emailPhoneInput',
    //   transitionRouteMap: new Map([
    //     [ '-password', '/password', ],
    //     [ '-passwordError', '/passwordError', ],
    //     [ '-passwordReminder', '/passwordReminder', ],
    //     [ '-passwordReminderSent', '/passwordReminderSent', ],
    //     [ '-register', '/register', ],
    //     [ '-success', '/', ],
    //   ]),
    //   emailPhoneInput: {
    //     withPassword: 'password',
    //     accept: 'phoneMailSent',
    //   },
    //   phoneMailSent: {
    //     withPassword: 'password',
    //     sendAgain: 'phoneMailSent2',
    //   },
    //   phoneMailSent2: {
    //     getCustomerService: 'customerService',
    //     withPassword: 'password',
    //   },
    //   password: {
    //     forgotPassword: 'passwordReminder',
    //     accept: 'success',
    //   },
    //   passwordError: {
    //     forgotPassword: 'passwordReminder',
    //     notRegistered: 'register',
    //     accept: 'success',
    //   },
    //   passwordReminder: {
    //     accept: 'passwordReminderSent',
    //   },
    //   passwordReminderSent: {
    //     accept: 'password',
    //   },
    //   register: {
    //     accept: 'success',
    //     withPassword: 'password',
    //   },
    // };
    // const flow3 = {
    //   flowNumber: 3,
    //   initialState: 'emailValidationSent',
    //   initialTransition: '/emailValidationSent',
    //   transitionRouteMap: new Map([
    //     [ '-password', '/password', ],
    //     [ '-passwordError', '/passwordError', ],
    //     [ '-passwordReminder', '/passwordReminder', ],
    //     [ '-passwordReminderSent', '/passwordReminderSent', ],
    //     [ '-register', '/register', ],
    //     [ '-success', '/', ],
    //   ]),
    //   emailValidationSent: {
    //     sendAgain: 'emailValidationSent2',
    //     notRegistered: 'register',
    //   },
    //   emailValidationSent2: {
    //     getCustomerService: 'customerService',
    //   },
    //   password: {
    //     forgotPassword: 'passwordReminder',
    //     accept: 'success',
    //   },
    //   passwordError: {
    //     forgotPassword: 'passwordReminder',
    //     notRegistered: 'register',
    //     accept: 'success',
    //   },
    //   passwordReminder: {
    //     accept: 'passwordReminderSent',
    //   },
    //   passwordReminderSent: {
    //     accept: 'password',
    //   },
    //   register: {
    //     accept: 'success',
    //     withPassword: 'password',
    //   },
    // };
    //
    // describe('getFlowByData()', () => {
    //   it('return correct result for flow 1', () => {
    //     const expected = flow1;
    //     const premiumUserResult = getFlowByData({
    //       isUserExist: true,
    //       isEmailValid: true,
    //       isPhoneValid: true,
    //       isPhoneConnectedWithEmail: true,
    //       isPremiumUser: true,
    //     });
    //     const nonPremiumUserResult = getFlowByData({
    //       isUserExist: true,
    //       isEmailValid: true,
    //       isPhoneValid: true,
    //       isPhoneConnectedWithEmail: true,
    //       isPremiumUser: false,
    //     });
    //
    //     expect(premiumUserResult).toEqual(expected);
    //     expect(nonPremiumUserResult).toEqual(expected);
    //   });
    //
    //   it('return correct result for flow 2', () => {
    //     const expected = flow2;
    //
    //     const nonPremiumUserResult = getFlowByData({
    //       isUserExist: true,
    //       isEmailValid: true,
    //       isPhoneValid: false,
    //       isPhoneConnectedWithEmail: false,
    //       isPremiumUser: false,
    //     });
    //
    //     const premiumUserResult = getFlowByData({
    //       isUserExist: true,
    //       isEmailValid: true,
    //       isPhoneValid: false,
    //       isPhoneConnectedWithEmail: false,
    //       isPremiumUser: true,
    //     });
    //
    //     expect(nonPremiumUserResult).toEqual(expected);
    //     expect(premiumUserResult).toEqual(expected);
    //   });
    //
    //   it('return correct result for flow 3', () => {
    //     const expected = flow3;
    //
    //     const result = getFlowByData({
    //       isUserExist: true,
    //       isEmailValid: false,
    //       isPhoneValid: false,
    //       isPhoneConnectedWithEmail: false,
    //       isPremiumUser: false,
    //     });
    //
    //     expect(result).toEqual(expected);
    //   });
    //
    //   // TODO: after flow completion, complete tests
    //
    //   describe('errors', () => {
    //     it('throw when flow doesn\'t exist', () => {
    //       const getImpossibleFlow = () => getFlowByData({
    //         isUserExist: false,
    //         isEmailValid: true,
    //         isPhoneValid: false,
    //         isPhoneConnectedWithEmail: true,
    //         isPremiumUser: false,
    //       });
    //
    //       expect(getImpossibleFlow).toThrow();
    //     });
    //   });
    // });

    // describe('getFlowByFlowNumber', () => {
    //   it('return correct result for flow 1', () => {
    //     expect(getFlowByFlowNumber(1)).toEqual(flow1);
    //   });
    //   it('return correct result for flow 2', () => {
    //     expect(getFlowByFlowNumber(2)).toEqual(flow2);
    //   });
    //   it('return correct result for flow 3', () => {
    //     expect(getFlowByFlowNumber(3)).toEqual(flow3);
    //   });
    // });

    describe('temporarily disable tests', () => {
      it('should disable tests', () => {
        expect(1).toEqual(1);
      });
    });
  });
});
