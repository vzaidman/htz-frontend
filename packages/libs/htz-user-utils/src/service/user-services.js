/* global fetch Headers */
import UserFactory from '../user-factory-cookie-based';
import { mobileNumberParser, } from '../util/general-user-data-transform';
import { plantCookie, } from '../util/cookie-utils';
import createSiteConfig from '../site-config';

/**
 * A wrapper to a promise that limits it's resolution time
 * @export
 * @param {any} promise the promise to be resolved
 * @param {number} [timeout=5000] an optional timeout, in milliseconds
 * @param {string} [msgOnTimeout='operation timed out!'] an optional on timeout rejection message
 * @returns a promise that either resolves in the timeframe, or rejects on timeout.
 */
function withTimeout(
  promise,
  timeout = 8000,
  msgOnTimeout = 'לא הצלחנו לקבל תשובה מהשרת, אנא נסו שוב'
) {
  const timer = new Promise((resolve, reject) => setTimeout(() => {
    reject(new Error(msgOnTimeout));
  }, timeout)
  );
  return Promise.race([ promise, timer, ]);
}

const defaultTimeout = 8000;

/**
 * User Services are the collective functions that are allowed communication with
 * our SSO backend server.
 * It bundles user services such as login, logout and register.
 * @param config { object } a configuration object to change the behavior of the user services.
 * @return {{login: login, logout: logout, register: register}}
 * @constructor optional: a plain object that is site configuration to override the services logic
 */
export default function UserService(config = {}) {
  let plantImagesCallback;
  let onImageLoadCallback;
  if (config && config.plantImagesCallback) {
    plantImagesCallback = config.plantImagesCallback;
  }
  if (config && config.onImageLoadCallback) {
    onImageLoadCallback = config.onImageLoadCallback;
  }

  /**
   * Check if a specific email is already registered.
   * @param {string} email the email of the user
   * @return {*} a promise that resolves to true iff the user exists
   */
  function checkEmailExists(email) {
    const siteConfig = createSiteConfig();
    const serviceUrl = `${siteConfig.newSsoDomain}/isuser?email=${email}`;

    const checkEmailPromise = new Promise((resolve, reject) => fetch(serviceUrl).then(data => data
      .json()
      .then(json => resolve(json.success)
        // return reject(new Error('בדיקת דוא"ל נכשלה, נא לנסות שנית'));
      )
      .catch(err => {
        console.log('error from check email', err);
        return reject(new Error('בדיקת דוא"ל נכשלה, נא לנסות שנית'));
      })
    )
    );

    return withTimeout(checkEmailPromise, defaultTimeout);
  }

  /**
   * Sign in a user, using it's credentials. Will activate side effects
   * (in this case: planting cookies)
   * @param {object} { username, password, user, }
   * username: the username of the user (user email address)
   * password: the password of the user
   * user: the current user object (prior to login)
   * @return {*}
   */
  function login({ username, password, user, }) {
    let anonymousId;
    if (!user) {
      const factory = new UserFactory();
      anonymousId = factory.build().anonymousId;
    }
    else {
      anonymousId = user.anonymousId;
    }
    const siteConfig = createSiteConfig();
    const serviceUrl = `${siteConfig.newSsoDomain}/loginUrlEncoded`;
    const params = 'newsso=true'
      + '&fromlogin=true'
      + '&layer=login'
      + `&site=${siteConfig.siteId}`
      + `&userName=${username}`
      + `&anonymousId=${anonymousId}`
      + `&password=${password}`
      + '&termsChk=on';

    const loginPromise = new Promise((resolve, reject) => fetch(serviceUrl, {
      method: 'POST',
      body: params,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
      .then(parseResponse)
      .then(loginData => handleSsoResponse(loginData).then(
        () => {
          if (onImageLoadCallback) {
            onImageLoadCallback();
          }
          resolve();
        },
        reason => reject(reason)
      )
      )
    );
    return withTimeout(loginPromise, defaultTimeout);
  }

  /**
   * Sign in a user, using mobile number and OTP. Will activate side effects
   * (in this case: planting cookies)
   * @param {object} { mobile, otp, user, trmsChk, hash, }
   * mobile: mobile number
   * otp: one time password that was issued to the user
   * trmsChk: the value of the checkbox that verifies the users agreement to
   * promotional mail sending
   * hash: the hash that was issued after the generation of the OTP
   * user: the current user object (prior to login)
   * @return {*}
   */
  function loginWithMobile({ mobile, otp, trmsChk, hash, user, }) {
    let anonymousId;
    const { prefix, suffix, } = mobileNumberParser(mobile);
    if (!user) {
      const factory = new UserFactory();
      anonymousId = factory.build().anonymousId;
    }
    else {
      anonymousId = user.anonymousId;
    }
    const siteConfig = createSiteConfig();
    const serviceUrl = `${siteConfig.newSsoDomain}/loginWMobile`;
    const params = {
      anonymousId,
      otp,
      site: siteConfig.siteId,
      mobilePrefix: prefix,
      mobileNumber: suffix,
      id: hash,
      // termsChk: trmsChk ? 'on' : 'off',
      termsChk: trmsChk ? 'on' : 'on',
    };

    const loginPromise = new Promise((resolve, reject) =>
      fetch(serviceUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then(parseResponse)
        .then(loginData =>
          handleSsoResponse(loginData).then(
            () => {
              if (onImageLoadCallback) {
                onImageLoadCallback(); // TODO: add correct callback
              }
              resolve();
            },
            reason => reject(reason)
          )
        )
    );
    return withTimeout(loginPromise, defaultTimeout);
  }

  /**
   * Logout a user from it's current session
   * @param {any} user the currently logged in user
   */
  function logout(user) {
    const factory = new UserFactory();
    const siteConfig = createSiteConfig();
    const serviceUrl = `${siteConfig.ssoDomain}/sso/logout`;
    const builtUser = user || factory.build();
    const params = `mobile=true&userId=${builtUser.id}&anonymousId=${
      builtUser.anonymousId
    }`;
    const logoutPromise = new Promise((resolve, reject) => fetch(serviceUrl, {
      method: 'POST',
      body: params,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
      .then(parseResponse)
      .then(logoutData => handleSsoResponse(logoutData).then(
        () => {
          if (onImageLoadCallback) {
            onImageLoadCallback();
            resolve();
          }
        },
        reason => reject(reason)
      )
      )
    );
    return withTimeout(logoutPromise, defaultTimeout);
  }

  /**
   * Register a new user
   * This method works with raw data passed as arguments, and not FormData
   * @param {Object} formData
   * @param {string} formData.userName the email of the new user
   * @param {string} formData.password the password of the new user
   * @param {string} formData.confirmPassword the password of the new user, again, for validation
   * @param {string} formData.firstName the user first name
   * @param {string} formData.lastName the user last name
   * @param {string} formData.mobilePrefix the first part of the user mobile number
   * @param {string} formData.mobileNumber the second part of the user mobile number
   * @param {boolean} formData.termsChk whether or not the user has checked the terms of service agreement
   * @param {string} formData.gRecaptchaResponse google's captcha response to bot detection
   *
   * @return {Promise} A promise that resolves when the operation is complete
   */
  function register({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    mobilePrefix,
    mobileNumber,
    termsChk,
    gRecaptchaResponse,
    user,
  }) {
    let anonymousId;
    if (!user) {
      const factory = new UserFactory();
      anonymousId = factory.build().anonymousId;
    }
    else {
      anonymousId = user.anonymousId;
    }
    const siteConfig = createSiteConfig();
    const serviceUrl = `${siteConfig.newSsoDomain}/registerUrlEncoded`;
    const params =
      'newsso=true' +
      '&layer=createuser' +
      `&site=${siteConfig.siteId}` +
      `&userName=${email}` +
      `&password=${password}` +
      `&confirmPassword=${confirmPassword}` +
      `&firstName=${firstName}` +
      `&lastName=${lastName}` +
      `&mobilePrefix=${mobilePrefix}` +
      `&mobileNumber=${mobileNumber}` +
      `&termsChk=${termsChk ? 'on' : 'off'}` +
      `&anonymousId=${anonymousId}` +
      `&g-recaptcha-response=${gRecaptchaResponse}`;

    const registerPromise = new Promise((resolve, reject) => fetch(serviceUrl, {
      method: 'POST',
      body: params,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
      .then(parseResponse)
      .then(registerData => handleSsoResponse(registerData).then(
        () => {
          if (onImageLoadCallback) {
            onImageLoadCallback();
            resolve();
          }
        },
        reason => reject(reason)
      )
      )
    );
    return withTimeout(registerPromise, defaultTimeout);
  }

  /**
   * Parses an SSO response to a login request and converts it to an actionable object
   * @param response the response received from an SSO login request
   * @return {*} a promise that resolves a parsed object element of the following form:
   * {status: 'success'|'failure' , data: {i:*,}, message}
   */
  function parseResponse(response) {
    return response.text().then(
      responseText => new Promise(resolve => {
        let tokens = responseText.substring(
          responseText.indexOf('(') + 2,
          responseText.length - 2
        ); // remove (' and ')
        tokens = tokens.split("','");

        const status = tokens[0];
        let data = null;
        if (status === 'success') {
          data = JSON.parse(tokens[1]);
        }
        const message = tokens[2];
        resolve({
          status,
          data,
          message,
        });
      })
    );
  }

  /**
   * Handle a parsed SSO response payload
   * @param serviceData an object element of the following form:
   * {status: 'success'|'failure'|'error' , data: {i:*,} | 'nothing', message}
   * @return {*} a promise that resolves iff:
   * 1) The first param is a successfully parsed success response from an SSO login endpoint
   * 2) All of the side effect operations that happen as a result of the response,
   * have completed successfully.
   * if the promise rejects, it rejects with an error object that have the sso error message
   */
  function handleSsoResponse(serviceData) {
    let promise = null;
    if (serviceData && serviceData.status === 'success') {
      const keys = Object.keys(serviceData.data);
      const cookiesPromises = [];
      if (plantImagesCallback) {
        const imagesArray = Object.entries(serviceData.data).map(k => k[1]);
        const promiseFromCallback = plantImagesCallback(imagesArray);
        cookiesPromises.push(promiseFromCallback);
      }
      else {
        for (const k of keys) {
          cookiesPromises.push(plantCookie(serviceData.data[k]));
        }
      }
      promise = Promise.race(cookiesPromises);
    }
    else {
      promise = Promise.reject(
        new Error(serviceData.message || 'שגיאה במערכת המנויים')
      );
    }

    return promise;
  }

  /**
   * Public API for the UserServices
   */
  return {
    checkEmailExists,
    login,
    loginWithMobile,
    logout,
    register,
  };
}
