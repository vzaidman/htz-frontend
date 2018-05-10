/* global window, document */
import { CookieUtils, AbuseService, } from '@haaretz/htz-user-utils';
import querystring from 'querystring';
import withTimeout from './withTimeout';
import extractParameter from './extractParamFromUrl';

let dsUrl;

/**
 * This function is responsible for sending an action code with data
 * to the DS server
 * @export
 * @param {object} action an object containing the action data
 * @param {number} action.actionCode the coded number of the action
 * @param {object?} action.additionalInfo an optional, serializable object containing
 * additional information to be passed and inserted to the DS server
 * @param {object} user a plain user object, as defined in @htz-user-utils
 * @returns a promise for the request made to the DS server, which resolves to a Response,
 * or rejected if a timeout (default: 5000ms) has been reached
 */
export function doStatAction(action, user) {
  dsUrl =
    dsUrl ||
    `${window.location.protocol}//ds.haaretz.co.il/${
      window.location.hostname === 'www.haaretz.co.il' ? 'ds.php' : 'dstest.php'
    }`;

  const { additionalInfo, } = action;
  const serializedAdditionalInfo =
    typeof additionalInfo === 'object' ? JSON.stringify(additionalInfo) : '';

  const statData = {
    url: document.URL || '',
    domain: window.location.hostname || '',
    Rusr: CookieUtils.getCookie('HtzRusr') || '',
    Pusr: CookieUtils.getCookie('HtzPusr') || '',
    aun: CookieUtils.getCookie('aun') || '',
    userId: user.id || AbuseService.getSsoOnAbusePage() || '',
    anonymousId: user.anonymousId || '',
    additionalInfo: serializedAdditionalInfo,
    actionType: action.actionCode,
  };

  return withTimeout(
    window.fetch(`${dsUrl}?${querystring.stringify(statData)}`, {
      method: 'GET',
      cache: false,
    })
  );
}

/**
 * This function is responsible for sending a request to the DS server on pageload
 * @export
 * @param {object} user a plain user object, as defined in @htz-user-utils
 * @returns a promise for the request made to the DS server, which resolves to a Response,
 * or rejected if a timeout (default: 5000ms) has been reached
 */
export function doStat(user) {
  dsUrl =
    dsUrl ||
    `${window.location.protocol}//ds.haaretz.co.il/${
      window.location.hostname === 'www.haaretz.co.il' ? 'ds.php' : 'dstest.php'
    }`;

  const href = window.location.href;

  const statData = {
    sso_id: user.id || AbuseService.getSsoOnAbusePage() || '',
    anonymous_id: user.anonymousId || '',
    ip: null,
    Pusr: CookieUtils.getCookie('HtzPusr'),
    Rusr: CookieUtils.getCookie('HtzRusr'),
    device_type: null,
    device_name: null,
    os: null,
    useragent: window.encodeURIComponent(window.navigator.userAgent),
    ad_block_state: window.localStorage.hasAdBlock || 'false',
    width: `${window.screen.availWidth}`,
    height: `${window.screen.availHeight}`,
    request_time: new Date(),
    url: window.document.URL,
    site: window.document.location.origin,
    domain: window.location.hostname,
    primary_section: null, // getDataFromElement('statutilsections', { split: { char: '/', place: 1, }, }) || null,
    secondary_section: null, // getDataFromElement('statutilsections', { split: { char: '/', place: 2, }, }) || '',
    article_id: null, // getDataFromElement('statutilcontentid') || '',
    writer_id: null, // getDataFromElement('statutilWriter', { aggregate: true, }) || '',
    openmode_back: null, // isOnArticlePage() ? getDataFromElement('statutilispremiumcontent') === 'false' ? 1 : 0 : null,
    openmode_front: null, // isOnArticlePage() ? (typeof openMode !== 'undefined' ? openMode : '') : null, // Defined in global scope.. :-(
    utm_medium: extractParameter('utm_medium', href),
    utm_source: extractParameter('utm_source', href),
    utm_content: extractParameter('utm_content', href),
    utm_campaign: extractParameter('utm_campaign', href),
    referrer_type: window.document.referrer,
    additional_info: null, // validateInputNullIfInvalid(additionalinfo),
  };

  return withTimeout(
    window.fetch(`${dsUrl}?${querystring.stringify(statData)}`, {
      method: 'GET',
      cache: false,
    })
  );
}
