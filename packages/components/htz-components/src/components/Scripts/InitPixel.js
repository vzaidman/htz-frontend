import React, { Component, } from 'react';
// import PropTypes from 'prop-types';
import Head from 'next/head';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';

const GET_HOST_NAME = gql`
  query getHostName {
    hostname @client
  }
`;
const propTypes = {};

const defaultProps = {};

// init pixel should be rendered only once per application
// should not be a child of a component that gets unmounted
// usually should be in next.js App component
class InitPixel extends Component {
  shouldComponentUpdate() {
    return false;
  }

  facebookPixel = hostname => {
    // todo: check if no need for this pixelId
    // const pixelId = hostname.includes('themarker.com')
    //   ? '288453064669123'
    //   : '1465233127023021';

    // todo: update this if we use in other sites
    const facebookPixelId = hostname.includes('themarker.com') ? 'update this' : '801998859871552';
    return (
      <React.Fragment>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `  
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${facebookPixelId});
                fbq('track', 'PageView');
            `,
          }}
        />
        <noscript
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
                        <img height="1" width="1" style="display:none"
                          src="https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1"
                        />
                      `,
          }}
        />
      </React.Fragment>
    );
  };

  googlePixel = hostname => {
    // todo: update this if we use in other sites
    const googlePixelId = hostname.includes('themarker.com') ? 'update this' : 'AW-955543703';
    return (
      <React.Fragment>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-955543703" />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `  
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', ${googlePixelId});
            `,
          }}
        />
      </React.Fragment>
    );
  };

  chromePush = hostname => {
    // todo: update this if we use in other sites
    const applicationCode = hostname.includes('themarker.com') ? 'update this' : '3624D-2BB40';
    const safariWebsitePushID = hostname.includes('themarker.com')
      ? 'update this'
      : 'web.com.haaretz.webpush';
    const defaultNotificationTitle = hostname.includes('themarker.com') ? 'TheMarker' : 'הארץ';
    // todo: Url return Error 404. Change defaultNotificationImage if needed.
    const defaultNotificationImage = hostname.includes('themarker.com')
      ? 'update this'
      : 'https://yoursite.com/img/logo-medium.png';
    return (
      <React.Fragment>
        <script
          async
          type="text/javascript"
          src="//cdn.pushwoosh.com/webpush/v3/pushwoosh-web-notifications.js"
        />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `  
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
                  applicationCode: ${applicationCode}, // you application code from Pushwoosh Control Panel
                  safariWebsitePushID: ${safariWebsitePushID}, //  unique reverse-domain string, obtained in you Apple Developer Portal
                  defaultNotificationTitle: ${defaultNotificationTitle}, // sets a default title for push notifications
                  defaultNotificationImage: ${defaultNotificationImage}, // URL to custom custom notification image
                  autoSubscribe: true, // or false. If true, promts a user to subscribe for pushes upon SDK initialization
                  userId: ssoId,
                  tags: {
                      'UserType': userType
                  }
              }]);
            `,
          }}
        />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Query query={GET_HOST_NAME}>
        {({ data: { hostname, }, }) => (
          <Head>
            {this.facebookPixel(hostname)}
            {this.googlePixel(hostname)}
            {this.chromePush(hostname)}
          </Head>
        )}
      </Query>
    );
  }
}

InitPixel.propTypes = propTypes;
InitPixel.defaultProps = defaultProps;

export default InitPixel;
