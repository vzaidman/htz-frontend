/* eslint-disable */
import React, { Component } from 'react';
import { appendScript } from '../../utils/scriptTools';

class ChromePush extends Component {
  componentDidMount() {
    appendScript({
      id: 'chromePush',
      src: '//cdn.pushwoosh.com/webpush/v3/pushwoosh-web-notifications.js',
      isAsync: true,
      attributes: { type: 'text/javascript' },
    });
    appendScript({
      id: 'chromePushHtml',
      innerHtml: this.getInnerHtml(),
      attributes: { type: 'text/javascript' },
    });
  }

  getInnerHtml = () => `
  function getCookie(){
    var cookieName = arguments[0];
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = (cookies[i]).trim();			
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, cookieName.length + 1) == (cookieName + '=')) {
          cookieValue = unescape(cookie.substring(cookieName.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  var Pushwoosh = Pushwoosh || [];
  var userCookie = getCookie("tmsso");
  var ssoiId;
  var userType = "anonymous";
  if (userCookie == undefined){
    ssoId =  null;
  } else {
     ssoId =  userCookie["userId"];
      if (getCookie("HtzPusr") == undefined){ 
        userType = "registered";
      } else {
        userType = "payer";
      }
  }
  
  Pushwoosh.push(['init', {
      logLevel: 'info', // possible values: error, info, debug
      applicationCode: '3624D-2BB40', // you application code from Pushwoosh Control Panel
      safariWebsitePushID: 'web.com.haaretz.webpush', //  unique reverse-domain string, obtained in you Apple Developer Portal
      defaultNotificationTitle: 'הארץ', // sets a default title for push notifications
      defaultNotificationImage: 'https://yoursite.com/img/logo-medium.png', // URL to custom custom notification image
      autoSubscribe: true, // or false. If true, promts a user to subscribe for pushes upon SDK initialization
      userId: ssoId,
      tags: {
          'UserType': userType
      }
  }]);
    `;

  render() {
    return null;
  }
}

export default ChromePush;
