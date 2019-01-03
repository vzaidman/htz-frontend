import { getReferrer, } from '../pages/queryutil/userDetailsOperations';

const regex = {
  login: /(login-dev)|(login)|(:3000)/, // restrict referring to this url
  site: /(https?:\/\/(.+?\.)?(themarker\.com|haaretz\.co\.il)(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/, // allow referring to this url
};

const getCacheReferrer = client => {
  try {
    return getReferrer(client);
  }
  catch (e) {
    return false;
  }
};

const addTimeStamp = (url) => {
  return url.includes('?') ? `${url}&lts=${Date.now()}` : `${url}?lts=${Date.now()}`;
}

const getReferrerUrl = (client, referrerUrl = getCacheReferrer(client)) =>
  (!regex.login.test(referrerUrl) && regex.site.test(referrerUrl) ? addTimeStamp(referrerUrl) : false);

export { getReferrerUrl, };
