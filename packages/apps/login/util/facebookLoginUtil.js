/* ----------------------------------- */
/* LOGIN WITH FACEBOOK INSTANT ARTICLE */
/* ----------------------------------- */

/** Config --------------------------------------------- */

const FACEBOOK_LOGIN_PATH =
  'https://ms-apps.haaretz.co.il/ms-fb-instant/subscribe/facebook-redirect';

/** Misc ----------------------------------------------- */

const getUserType = userCrmStatus => {
  if (userCrmStatus != null) {
    return userCrmStatus.isActiveTm || userCrmStatus.isActiveHeb ? 'paying' : 'registered';
  }
  return 'anonymous';
};

/**
 * builds and returns the full url for facebook login
 */
const buildRedirectUrl = ({ token, subscription, userid, redirect, }) =>
  `${FACEBOOK_LOGIN_PATH}?account_linking_token=${token}&subscription_status=${subscription}&publisher_user_id=${userid}&redirect_uri=${redirect}`;

/** Exported ------------------------------------------- */

/**
 * returns the facebook's login url for redirection (when reaching login via instant article)
 */
const getFacebookLoginUrl = params => {
  if (params && (params.token && params.subscription && params.userid && params.redirect)) {
    return buildRedirectUrl(params);
  }
  console.warn('could not redirect to facebook login - missing params');
  return false;
};

/**
 * returns the required params for getFacebookLoginUrl
 */
const getFacebookParams = user => {
  if (user && user.facebook) {
    return {
      token: user.facebook.token,
      redirect: user.facebook.redirect,
      subscription: getUserType(user.userCrmStatus),
      userid: user.ssoId,
    };
  }
  console.warn('could not login with facebook - missing user');
  return false;
};

export { getFacebookLoginUrl, getFacebookParams, };
