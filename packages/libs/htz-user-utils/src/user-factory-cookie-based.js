/* global window */
import getCookieAsMap, { setCookie, } from './util/cookie-utils';
import User, { UserTypes, } from './user';
import createSiteConfig from './site-config';
import { getSubdomain, } from './util/domain-utils';

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * @param {*} min the minimum number in the range to generate from
 * @param {*} max the maximum number in the range to generate from
 */
function getRandomInt(min, max) {
  // prettier-ignore
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

/**
 * Creates a new anonymousId for new user instances.
 * @see getCookieAsMap side effect: plants a client-only cookie with that ID.
 * @param {string} [hostname=window.location.hostname]
 *   An optional hostname override of the anonymousId cookie
 * @returns {string} ID for any user.
 */
export function generateAnonymousId(hostname = window.location.hostname) {
  // console.log(`getCookie - 'anonymousId' : ${getCookie('anonymousId')}`);
  const salt = getRandomInt(1000, 9999); // random between 1000 - 9999
  const now = Date.now();
  const expire = new Date(now + 7776000000); // 90 * 24 * 3600 * 1000 = 7776000000 = 90 days
  const anonymousId = `${now}${salt}`;
  const domain = getSubdomain(hostname);
  // Side effect: triggers a cookie reparsing
  setCookie('anonymousId', anonymousId, '/', domain, expire);

  return anonymousId;
}

export default class UserFactory {
  constructor(forceRefresh) {
    // Step 1: searching for side effect to determine login state
    this.cookieMap = getCookieAsMap(forceRefresh);
  }

  /**
   * Allows reusing an instance of a factory that was already created by updating
   * it's internal data, according to the up-to-date side effect
   */
  refreshFactoryInstance() {
    this.cookieMap = getCookieAsMap(true);
  }

  /**
   * Build and return a new user instance, based on the current cookie state
   * Note: this method should have no side effects, and can be run as many times as you need it to:
   * each call to buildUser will
   * @return {User}
   */
  build() {
    this.config = this.config || createSiteConfig();
    const ssoMap =
      this.cookieMap !== undefined
        ? this.cookieMap[this.config.ssoKey]
        : undefined;
    // const premiumArticlesCount = this.cookieMap.HtzRusr
    //   ? parseInt(this.cookieMap.HtzRusr, 10)
    //   : -1;
    const anonymousId = this.cookieMap.anonymousId || generateAnonymousId();
    if (ssoMap !== undefined) {
      // User side effect not found - build a new user
      // console.warn('ssoMap:', ssoMap);
      // User side effect found - recover it
      return new User(
        Object.assign({}, ssoMap, { type: UserTypes.paying, }, { anonymousId, })
      );
    }
    return new User({
      type: UserTypes.anonymous,
      anonymousId,
    });
  }
}
