/* global window */
import { UserFactory, CookieUtils, } from '@haaretz/htz-user-utils';
import ImpressionManager from './impressionsManager';

let globalConfig;

export default class DfpUser {
  constructor(config) {
    globalConfig = globalConfig || config;
    this.config = Object.assign({}, config.userConfig);
    this.user = new UserFactory(true).build();
    const cookieMap = CookieUtils.getCookieAsMap();
    this.ssoKey = globalConfig.sso;
    if (!cookieMap[this.ssoKey]) {
      // Flips the ssoKey, since cookieMap.ssoKey cannot be used to retrieve data
      this.ssoKey = this.ssoKey === 'tmsso' ? 'engsso' : 'tmsso';
    }
    this.type = this.user.type;
    this.impressionManager = new ImpressionManager(config);
    this.age = this.getUserAge(cookieMap);
    this.gender = this.getUserGender(cookieMap);
  }

  getUserAge(cookieMap) {
    let age;
    const usrae = cookieMap[this.ssoKey] && cookieMap[this.ssoKey].usrae;
    if (usrae) {
      age = parseInt(cookieMap[this.ssoKey].usrae, 10);
      age = age > 0 ? age : undefined;
    }
    return age;
  }

  getUserGender(cookieMap) {
    let gender;
    const urgdr = cookieMap[this.ssoKey] && cookieMap[this.ssoKey].urgdr;
    if (urgdr) {
      gender = parseInt(cookieMap[this.ssoKey].urgdr, 10);
      gender = gender === 2 || gender === 1 ? gender : undefined;
    }
    return gender;
  }
}
