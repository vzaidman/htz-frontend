/* global window navigator location */
import { Component, } from 'react';
import PropTypes from 'prop-types';
import { appendScript, } from '../../utils/scriptTools';

function deviceUtil() {
  function getTimeStamp() {
    const today = new Date();
    let dd = today.getDate();
    let MM = today.getMonth() + 1; // January is 0!
    let hh = today.getHours();
    let mm = today.getMinutes();
    const ss = today.getSeconds();

    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (MM < 10) {
      MM = `0${MM}`;
    }
    if (hh < 10) {
      hh = `0${hh}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    const formatedToday = `${dd}/${MM}/${yyyy} ${hh}:${mm}:${ss}`;
    return formatedToday;
  }
  function getDeviceType() {
    if (!('ontouchstart' in window)) {
      return 'Desktop';
    }
    if (window.innerWidth > 700) {
      return 'Tablet';
    }
    if (location.pathname.match('app/')) {
      return 'App';
    }
    return 'Smartphone';
  }
  function getManufacture() {
    if (navigator.userAgent.match('Nexus')) {
      return 'Nexus';
    }
    if (navigator.userAgent.match('SM')) {
      return 'Samsung';
    }
    if (navigator.userAgent.match('iPhone|iPad')) {
      return 'Apple';
    }
    if (navigator.userAgent.match('LG-')) {
      return 'Lg';
    }
    if (navigator.userAgent.match('HTC_')) {
      return 'HTC';
    }
    if (navigator.userAgent.match('Windows')) {
      return 'Windows';
    }
    if (navigator.userAgent.match('NOKIA')) {
      return 'NOKIA';
    }
    return null;
  }
  function getOSVersion() {
    if (navigator.userAgent.match('Android \\d+')) {
      return navigator.userAgent.match('Android \\d+')[0];
    }
    if (navigator.userAgent.match('OS \\w+')) {
      return navigator.userAgent.match('OS \\w+')[0];
    }
    return navigator.platform || null;
  }
  return {
    OSVersion: getOSVersion,
    Manufacture: getManufacture,
    DeviceType: getDeviceType,
    getTimeStamp,
  };
}
class IdxNielsen extends Component {
  static propTypes = {
    shouldRender: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if (this.props.shouldRender) {
      console.warn('!!! hello i am here!');
      const DeviceUtil = deviceUtil();
      window.idx = {
        lat: null,
        long: null,
        xl8id: null,
        geo_timestamp: null,
        log_timestamp: DeviceUtil.getTimeStamp(),
        adv_id_type: null,
        device_type: DeviceUtil.DeviceType(),
        device_brand: DeviceUtil.Manufacture(),
        device_os: DeviceUtil.OSVersion(),
        device_model: null,
        age_range: null,
        birth_year: null,
        gender: null,
      };
      window.xl8_config = {
        p: 899,
        g: 1,
        dataObjects: [ 'articlePageContentGroup', 'idx', ],
        cssObjects: [
          {
            selector: 'meta',
            key: 'property',
            value: 'content',
          },
          {
            selector: 'meta',
            key: 'name',
            value: 'content',
          },
        ],
      };
      appendScript({
        id: 'idx_nielsen',
        src: 'https://cdn.exelator.com/build/static.min.js',
        isAsync: true,
        attributes: { type: 'text/javascript', },
      });
    }
    return null;
  }

  render() {
    return null;
  }
}

export default IdxNielsen;
