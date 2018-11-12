import React from 'react';
// import PropTypes from 'prop-types';
import Head from 'next/head';
import { Query, } from '@haaretz/htz-components';
import gql from 'graphql-tag';

const GET_HOST_NAME = gql`
  query getHostName {
    hostname @client
  }
`;
const propTypes = {
};

const defaultProps = {};

function InitPixel() {
  return (
    <Query query={GET_HOST_NAME}>
      {({ data: { hostname, }, }) => {
        const pixelId = hostname.includes('themarker.com') ? '288453064669123' : '1465233127023021';
        return (
          <Head>
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', ${pixelId});
                        fbq('track', 'Lead');
                        fbq('track', 'PageView');
                      `,
              }}
            />
            <noscript
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
                        <img height="1" width="1" style="display:none"
                          src="https://www.facebook.com/tr?pixelId=${pixelId} &ev=Lead&noscript=1"
                        />
                      `,
              }}
            />
          </Head>
        );
      }}
    </Query>
  );
}

InitPixel.propTypes = propTypes;
InitPixel.defaultProps = defaultProps;

export default InitPixel;
