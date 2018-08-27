/* global window */
import { UserFactory, CookieUtils, } from '@haaretz/htz-user-utils';
import ImpressionManager from './impressionsManager';

const userTypes = {
  payer: 'payer',
  registered: 'registered',
  anonymous: 'anonymous',
  trial: 'trial',
};

const productTypes = {
  htz: 243,
  tm: 273,
  hdc: 239,
  htz_tm: 274,
};

function getUserSSO(cookieMap, ssoKey) {
  return cookieMap[ssoKey];
}

function userHasProduct(userProducts, productType, trial) {
  return (
    userProducts.products.filter(
      product => product.prodNum === productType && product.trial === trial
    ).length > 0
  );
}

function getHdcUserType(userProducts) {
  // user has hdc paying product
  if (userHasProduct(userProducts, productTypes.hdc, false)) {
    return userTypes.payer;
  }
  else if (userHasProduct(userProducts, productTypes.hdc, true)) {
    // user has hdc trial product
    return userTypes.trial;
  }
  return userTypes.registered;
}

function getHtzTmUserType(userProducts, productType) {
  // user has htz/tm paying product
  if (
    userHasProduct(userProducts, productType, false) ||
    userHasProduct(userProducts, productTypes.htz_tm, false)
  ) {
    return userTypes.payer;
  }
  else if (
    userHasProduct(userProducts, productType, true) ||
    userHasProduct(userProducts, productTypes.htz_tm, true)
  ) {
    // user has htz/tm trial product
    return userTypes.trial;
  }
  return userTypes.registered;
}

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
    this.htz_type = this.getUserTypeByProduct(cookieMap, productTypes.htz);
    this.tm_type = this.getUserTypeByProduct(cookieMap, productTypes.tm);
    this.hdc_type = this.getUserTypeByProduct(cookieMap, productTypes.hdc);
    this.impressionManager = new ImpressionManager(config);
    this.age = this.getUserAge(cookieMap);
    this.gender = this.getUserGender(cookieMap);
    this.sso = getUserSSO(cookieMap, this.ssoKey);
  }

  getUserTypeByProduct(cookieMap, productType) {
    let userType = userTypes.anonymous;
    if (cookieMap && cookieMap[this.ssoKey]) {
      if (cookieMap.userProducts) {
        let userProducts = decodeURIComponent(cookieMap.userProducts);
        userProducts = JSON.parse(userProducts);
        if (productType === productTypes.hdc) {
          userType = getHdcUserType(userProducts);
        }
        else {
          userType = getHtzTmUserType(userProducts, productType);
        }
      }
    }
    return userType;
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
