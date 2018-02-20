/* global window, localStorage, fetch */
/**
 * @author Created by maxim.golman on 01/06/2017.
 * @author Modified by elia.grady on 14/02/2018.
 */
import UserService from './user-services';
import siteConfig from '../site-config';
import { getCookie, } from '../util/cookie-utils';
import UserFactory from '../user-factory-cookie-based';
import { UserTypes, } from '../user';

const SERVICE_URL = '/sso/r/isabuser';
const MOBILE_LOGIN_PAGE = '/mobile/login';
const MOBILE_ABUSE_LOGIN_PAGE = '/mobile/abuse-login';
const SSO_COOKIE_NAME = 'tmsso';
const ANONYMOUS_ID_COOKIE_NAME = 'anonymousId';
const AAT = 'antiAbuseToken';
const USER_IS_ABUSER = '1';
let userService = null;

function getUserServiceInstance({ plantImagesCallback, onLogoutComplete, }) {
  if (userService) {
    return userService;
  }
  const config = { plantImagesCallback, onImageLoadCallback: onLogoutComplete, };
  userService = new UserService(config);
  return userService;
}

export function initiateAbuserLogic({
  plantImagesCallback,
  overrideImageOnload,
}) {
  return new Promise((resolve, reject) => {
    const user = new UserFactory().build();
    const email = user.email;
    const ssoId = user.id;
    const ssoCookie = getCookie(SSO_COOKIE_NAME, true);
    const antiAbuseToken = (ssoCookie || {})[AAT] || '';

    const anonymousId = getCookie(ANONYMOUS_ID_COOKIE_NAME);

    if (user.type === UserTypes.paying) {
      fetch(`${siteConfig.ssoDomain}${SERVICE_URL}`, {
        method: 'POST',
        body: JSON.stringify({
          anonymousId,
          userId: user.id,
          aat: antiAbuseToken,
        }),
      })
        .then(data =>
          data.json().then(json => {
            const signinUrl =
              json.msg === 'null' ? MOBILE_ABUSE_LOGIN_PAGE : MOBILE_LOGIN_PAGE;
            if (json.result === USER_IS_ABUSER) {
              if (signinUrl === MOBILE_ABUSE_LOGIN_PAGE) {
                localStorage.setItem(
                  '__uaem',
                  JSON.stringify({ em: email, id: ssoId, })
                );
              }
              // Default behavior for abuser detection
              const defaultOnLogoutComplete = () => {
                // Navigate to signin URL
                if (window.location !== signinUrl) {
                  window.location = signinUrl;
                }
              };
              const onLogoutComplete =
                typeof overrideImageOnload === 'function'
                  ? () => {
                    overrideImageOnload();
                    resolve('done');
                  }
                  : () => {
                    defaultOnLogoutComplete();
                    resolve('done');
                  };

              getUserServiceInstance({
                plantImagesCallback,
                onLogoutComplete,
              }).logout();
            }
            else {
              resolve('skipped');
            }
          })
        )
        .catch(err => {
          reject();
        }); // error: dont initiate logic
    }
    else {
      resolve();
    }
  });
}

/* Abuse Service class, keeping this for backward-compatibility concerns */
export default class AbuseService {
  constructor(plantImagesCallback, overrideImageOnload) {
    if (plantImagesCallback) {
      this.plantImagesCallback = plantImagesCallback;
    }
    if (overrideImageOnload) {
      this.overrideImageOnload = overrideImageOnload;
    }
  }
  // eslint-disable-next-line class-methods-use-this
  activate() {
    return initiateAbuserLogic({
      plantImagesCallback: this.plantImagesCallback,
      overrideImageOnload: this.overrideImageOnload,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getSsoOnAbusePage() {
    if (
      window.location.href.includes('abuse-login') &&
      localStorage &&
      localStorage.getItem('__uaem')
    ) {
      return JSON.parse(localStorage.getItem('__uaem')).id;
    }
    return null;
  }
}
