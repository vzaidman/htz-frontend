/* global document window fetch */
import { Component, } from 'react';
import { CookieUtils, } from '@haaretz/htz-user-utils';

class AccessListByIp extends Component {
  componentDidMount() {
    try {
      this.runScript();
    }
    catch (e) {
      console.log(`access list by IP  script ${e}`);
    }
  }

  runScript = () => {
    const { getCookie, setCookie, } = CookieUtils;

    if ((!getCookie('acl') && !getCookie('HdzPusr')) || !getCookie('_htzwif')) {
      // eslint-disable-next-line no-mixed-operators
      const expireMs = Date.now() + 90 * 24 * 3600 * 10000; // 900 days
      const expire = new Date(expireMs);
      // init universty cookie with none
      setCookie('_htzwif', 'none', '/', 'haaretz.co.il', expire);

      const date = new Date();
      const isProxyServer = window.location.origin.includes('proxy');
      // eslint-disable-next-line no-mixed-operators
      date.setTime(date.getTime() + 60 * 60 * 1000);
      document.cookie = `acl=acl;expires=${date.toGMTString()};path=/`;
      // fetch(`//www.haaretz.co.il/ipAcl?isProxyServer=${isProxyServer}`, {
      fetch(
        `//${document.location.hostname}/ipAcl?isProxyServer=${isProxyServer}`,
        {
          method: 'GET',
          dataType: 'script',
          mode: 'cors',
        }
      )
        .then(() => console.log('AccessListByIp fetch success'))
        .catch(err => console.error('AccesListByIp error!'));
    }
  };

  render() {
    return null;
  }
}

export default AccessListByIp;
