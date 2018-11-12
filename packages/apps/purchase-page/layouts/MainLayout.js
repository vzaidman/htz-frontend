import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, } from '@haaretz/fela-utils';
import { createComponent, FelaComponent, } from 'react-fela';
import Head from 'next/head';
// import { UserInjector, appendScript, } from '@haaretz/htz-components';
import { UserInjector, BIRequest, GoogleAnalytics, Query, } from '@haaretz/htz-components';
import gql from 'graphql-tag';

import theme from '../theme';
import styleRenderer from '../components/styleRenderer/styleRenderer';
import PurchaseHeader from '../components/PurchaseHeader/PurchaseHeader';
import PurchasePageFooter from '../components/PurchasePageFooter/PurchasePageFooter'; // eslint-disable-line import/no-named-as-default
import UserBanner from '../components/UserBanner/UserBanner';
import Scripts from '../components/Scripts/Scripts';
import InitPixel from '../components/Scripts/InitPixel';

const GET_HOST_NAME = gql`
  query {
    hostname @client
    promotionsPageState @client {
      stage
    }
    user @client {
      type
    }
  }
`;

const propTypes = {
  /**
   * Children nodes
   */
  children: PropTypes.node,
  /**
   * should the footer render Illustrations
   */
  displayBackButton: PropTypes.bool,
  /**
   * should the MainLayout render the header component, used to allow pages to render without regular header
   */
  renderHeader: PropTypes.bool,
  /**
   * Is it the thankYou page.
   */
  isThankYou: PropTypes.bool,
  /**
   * Did the user pay.
   */
  userPaid: PropTypes.bool,
  /**
   * should the footer render Illustrations
   */
  footerHasIllustration: PropTypes.bool,
};

const defaultProps = {
  children: null,
  displayBackButton: true,
  renderHeader: true,
  isThankYou: false,
  userPaid: true,
  footerHasIllustration: true,
};

const wrapperStyle = () => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const StyledWrapper = createComponent(wrapperStyle);

const contentWrapperStyle = () => ({
  flexGrow: 1,
});

const StyledContentWrapper = createComponent(contentWrapperStyle);

function MainLayout({
  children,
  displayBackButton,
  renderHeader,
  isThankYou,
  userPaid,
  footerHasIllustration,
}) {
  return (
    <Query query={GET_HOST_NAME}>
      {({
        data: {
          hostname,
          user: { type, },
          promotionsPageState: { stage, },
        },
      }) => {
        const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];
        return (
          <Fragment>
            <InitPixel pixelId={host === 'themarker.com' ? '288453064669123' : '1465233127023021'} />
            <GoogleAnalytics withEC />
            <UserInjector />
            <StyleProvider renderer={styleRenderer} theme={theme(host)}>
              <FelaComponent
                render={({
                  theme: {
                    seo: {
                      [host]: { title, description, googleSiteVerification, },
                    },
                  },
                }) => (
                  <Fragment>
                    <Head>
                      <title>{title}</title>
                      <meta name="description" content={description} />
                      <meta name="google-site-verification" content={googleSiteVerification} />
                    </Head>
                    <div id="pageRoot">
                      <StyledWrapper>
                        {renderHeader && (
                          <Fragment>
                            <PurchaseHeader
                              host={host}
                              displayBackButton={displayBackButton}
                              stage={stage}
                            />
                            <UserBanner ignoreQueryParam={isThankYou} />
                          </Fragment>
                        )}
                        <StyledContentWrapper>{children}</StyledContentWrapper>
                        <PurchasePageFooter
                          host={host}
                          hasIllustration={footerHasIllustration}
                          stage={stage}
                        />
                      </StyledWrapper>
                    </div>
                    <div id="modalsRoot" />
                  </Fragment>
                )}
              />
            </StyleProvider>
            <BIRequest />
            <Scripts />
          </Fragment>
        );
      }}
    </Query>
  );
}

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
