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
  render() {
    return (
      <Query query={GET_HOST_NAME}>
        {({ data: { hostname, }, }) => {
          //   todo: update this if we use in other sites
          const pixelId = hostname.includes('themarker.com')
            ? '288453064669123'
            : '1465233127023021';
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
}

InitPixel.propTypes = propTypes;
InitPixel.defaultProps = defaultProps;

export default InitPixel;
